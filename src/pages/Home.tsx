import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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

const categories = [
  { name: 'Фэнтези', icon: 'Sparkles', color: 'bg-purple-500' },
  { name: 'Научная фантастика', icon: 'Rocket', color: 'bg-blue-500' },
  { name: 'Постапокалипсис', icon: 'Skull', color: 'bg-red-500' },
  { name: 'Средневековье', icon: 'Castle', color: 'bg-amber-500' },
  { name: 'Современность', icon: 'Building2', color: 'bg-green-500' },
];

const topics: Topic[] = [
  {
    id: 1,
    title: 'Темная башня: Поиск артефакта древних',
    author: 'DarkMage',
    replies: 156,
    views: 1234,
    lastPost: '5 мин назад',
    category: 'Фэнтези',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Звездный флот: Первый контакт',
    author: 'CaptainNova',
    replies: 89,
    views: 892,
    lastPost: '1 час назад',
    category: 'Научная фантастика',
  },
  {
    id: 3,
    title: 'Последнее укрытие человечества',
    author: 'Survivor',
    replies: 234,
    views: 2156,
    lastPost: '3 часа назад',
    category: 'Постапокалипсис',
    isPinned: true,
  },
  {
    id: 4,
    title: 'Королевский турнир: Битва за корону',
    author: 'KnightErrant',
    replies: 67,
    views: 543,
    lastPost: 'Вчера',
    category: 'Средневековье',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTopics = selectedCategory
    ? topics.filter((t) => t.category === selectedCategory)
    : topics;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glow-text">Добро пожаловать в семью</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ты попал на сайт нашей семьи, здесь ты сможешь найти все что тебе нужно. Оставайся с нами, тут интересно
          </p>
        </div>

        <div className="mb-8">
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
            {selectedCategory && (
              <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
                Сбросить фильтр
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <Card key={topic.id} className="hover:glow transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
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
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Card className="glow bg-card/50">
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
                <div className="text-3xl font-bold text-accent mb-1">567</div>
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
    </Layout>
  );
}