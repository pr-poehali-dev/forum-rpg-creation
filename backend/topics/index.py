import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления темами форума (получение, создание, удаление)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict с темами или статусом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute('SELECT id, title, author, category, replies, views, last_post, is_pinned, created_at FROM topics ORDER BY is_pinned DESC, created_at DESC')
        rows = cur.fetchall()
        
        topics = []
        for row in rows:
            topics.append({
                'id': row[0],
                'title': row[1],
                'author': row[2],
                'category': row[3],
                'replies': row[4],
                'views': row[5],
                'lastPost': row[6],
                'isPinned': row[7],
                'createdAt': row[8].isoformat() if row[8] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'topics': topics}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        title = body_data.get('title')
        author = body_data.get('author')
        category = body_data.get('category', 'Общее')
        
        cur.execute(
            "INSERT INTO topics (title, author, category, replies, views, last_post) VALUES (%s, %s, %s, 0, 0, 'Только что') RETURNING id",
            (title, author, category)
        )
        topic_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': topic_id, 'message': 'Тема создана'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        topic_id = params.get('id')
        
        cur.execute('DELETE FROM topics WHERE id = %s', (topic_id,))
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Тема удалена'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
