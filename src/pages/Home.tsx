import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Topic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastPost: string;
  category: string;
  isPinned?: boolean;
}

const API_URL = 'https://functions.poehali.dev/328c3058-ab64-4ab9-8b8f-877651fd3d3a';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTopics(data.topics || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить темы',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, category }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Тема создана!',
        });
        setIsCreateOpen(false);
        loadTopics();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать тему',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTopic = async (topicId: number) => {
    if (!confirm('Удалить эту тему?')) return;

    try {
      const response = await fetch(`${API_URL}?id=${topicId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Тема удалена',
        });
        loadTopics();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить тему',
        variant: 'destructive',
      });
    }
  };

  const filteredTopics = selectedCategory
    ? topics.filter((t) => t.category === selectedCategory)
    : topics;

  return (
    <Layout>
      <div className="relative">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: 'url(https://cdn.poehali.dev/projects/c301071b-ceed-4aab-852c-8980330a8796/files/e5e93315-d0af-481f-b9cd-11eb4b98419c.jpg)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 glow-text">Добро пожаловать в семью</h1>
            <p className="text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Ты попал на сайт нашей семьи, здесь ты сможешь найти все что тебе нужно. Оставайся с нами, тут интересно
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">

        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="MessageSquare" size={24} />
              Активные темы
              {selectedCategory && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategory}
                </Badge>
              )}
            </h2>
            <div className="flex gap-2">
              {selectedCategory && (
                <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
                  Сбросить фильтр
                </Button>
              )}
              <Button onClick={() => setIsCreateOpen(true)} className="glow flex items-center gap-2">
                <Icon name="Plus" size={18} />
                Создать тему
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : filteredTopics.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">Пока нет тем. Создайте первую!</p>
              <Button onClick={() => setIsCreateOpen(true)} className="glow">
                Создать тему
              </Button>
            </Card>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {filteredTopics.map((topic) => (
                <Card key={topic.id} className="hover:glow transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          {topic.isPinned && (
                            <Icon name="Pin" size={16} className="text-accent" />
                          )}
                          <Badge variant="outline">{topic.category}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {topic.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            {topic.author}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="text-right text-sm text-muted-foreground space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon name="MessageCircle" size={16} />
                            {topic.replies}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Eye" size={16} />
                            {topic.views}
                          </div>
                          <div className="text-xs">{topic.lastPost}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTopic(topic.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="animate-glow-pulse bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} />
              Статистика портала
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1,234</div>
                <div className="text-sm text-muted-foreground">Игроков</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">{topics.length}</div>
                <div className="text-sm text-muted-foreground">Активных тем</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">89</div>
                <div className="text-sm text-muted-foreground">Миров</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">45,678</div>
                <div className="text-sm text-muted-foreground">Сообщений</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl glow-text">Создать новую тему</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTopic} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название темы</Label>
              <Input id="title" name="title" placeholder="Введите название" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Ваше имя</Label>
              <Input id="author" name="author" placeholder="Введите ваше имя" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input id="category" name="category" placeholder="Например: Фэнтези" required />
            </div>
            <Button type="submit" className="w-full glow">
              Создать тему
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
