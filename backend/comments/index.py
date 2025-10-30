import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления комментариями к темам форума
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict с комментариями или статусом операции
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
        params = event.get('queryStringParameters', {})
        topic_id = params.get('topicId')
        
        cur.execute(
            'SELECT id, topic_id, author, content, created_at FROM comments WHERE topic_id = %s ORDER BY created_at ASC',
            (topic_id,)
        )
        rows = cur.fetchall()
        
        comments = []
        for row in rows:
            comments.append({
                'id': row[0],
                'topicId': row[1],
                'author': row[2],
                'content': row[3],
                'createdAt': row[4].isoformat() if row[4] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'comments': comments}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        topic_id = body_data.get('topicId')
        author = body_data.get('author')
        content = body_data.get('content')
        
        cur.execute(
            'INSERT INTO comments (topic_id, author, content) VALUES (%s, %s, %s) RETURNING id',
            (topic_id, author, content)
        )
        comment_id = cur.fetchone()[0]
        
        cur.execute(
            'UPDATE topics SET replies = replies + 1, last_post = %s WHERE id = %s',
            ('Только что', topic_id)
        )
        
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'id': comment_id, 'message': 'Комментарий добавлен'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        comment_id = params.get('id')
        
        cur.execute('SELECT topic_id FROM comments WHERE id = %s', (comment_id,))
        result = cur.fetchone()
        
        if result:
            topic_id = result[0]
            cur.execute('DELETE FROM comments WHERE id = %s', (comment_id,))
            cur.execute('UPDATE topics SET replies = GREATEST(replies - 1, 0) WHERE id = %s', (topic_id,))
            conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Комментарий удален'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
