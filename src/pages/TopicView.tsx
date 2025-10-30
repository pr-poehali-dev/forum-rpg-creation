import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Topic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastPost: string;
  isPinned?: boolean;
}

interface Comment {
  id: number;
  topicId: number;
  author: string;
  content: string;
  createdAt: string;
}

const TOPICS_API = 'https://functions.poehali.dev/328c3058-ab64-4ab9-8b8f-877651fd3d3a';
const COMMENTS_API = 'https://functions.poehali.dev/0bc8a12a-714d-4da4-a69e-45194b563fbf';

export default function TopicView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTopic();
    loadComments();
  }, [id]);

  const loadTopic = async () => {
    try {
      const response = await fetch(TOPICS_API);
      const data = await response.json();
      const foundTopic = data.topics.find((t: Topic) => t.id === Number(id));
      setTopic(foundTopic || null);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить тему',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await fetch(`${COMMENTS_API}?topicId=${id}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    try {
      const response = await fetch(COMMENTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: Number(id),
          author: authorName,
          content: newComment,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Комментарий добавлен!',
        });
        setNewComment('');
        loadComments();
        loadTopic();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить комментарий',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('Удалить комментарий?')) return;

    try {
      const response = await fetch(`${COMMENTS_API}?id=${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Комментарий удален',
        });
        loadComments();
        loadTopic();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить комментарий',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Загрузка...</p>
        </div>
      </Layout>
    );
  }

  if (!topic) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">Тема не найдена</p>
            <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад к темам
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {topic.isPinned && <Icon name="Pin" size={16} className="text-accent" />}
                  <Badge variant="outline">{topic.category}</Badge>
                </div>
                <CardTitle className="text-3xl mb-3">{topic.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{topic.author[0]}</AvatarFallback>
                    </Avatar>
                    {topic.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={16} />
                    {topic.replies} ответов
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={16} />
                    {topic.views} просмотров
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon name="MessagesSquare" size={24} />
            Комментарии ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Пока нет комментариев. Будьте первым!</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3 flex-1">
                        <Avatar>
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleString('ru-RU')}
                            </span>
                          </div>
                          <p className="text-foreground leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MessageSquarePlus" size={24} />
              Добавить комментарий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddComment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Ваше имя</Label>
                <Input
                  id="author"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий</Label>
                <Textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Напишите ваш комментарий..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="glow">
                Отправить
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
