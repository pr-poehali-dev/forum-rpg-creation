import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const news = [
  {
    id: 1,
    title: 'Открытие нового мира: Звездные войны',
    date: '28 октября 2025',
    category: 'Новые миры',
    content: 'Рады объявить об открытии долгожданного мира по вселенной Звездных войн! Играйте за джедаев, ситхов или простых контрабандистов в далекой-далекой галактике.',
    icon: 'Sparkles',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Обновление системы персонажей',
    date: '25 октября 2025',
    category: 'Обновления',
    content: 'Добавлена возможность создавать расширенные анкеты с фотогалереей и детальной историей персонажа. Теперь вы можете добавлять до 10 изображений!',
    icon: 'Settings',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Конкурс на лучшую историю месяца',
    date: '20 октября 2025',
    category: 'События',
    content: 'Участвуйте в конкурсе и выиграйте премиум-статус на 3 месяца! Присылайте свои лучшие посты до конца месяца. Победителей выберет жюри из опытных игроков.',
    icon: 'Trophy',
    color: 'bg-amber-500',
  },
  {
    id: 4,
    title: 'Новые возможности для мастеров',
    date: '15 октября 2025',
    category: 'Функционал',
    content: 'Мастера игр теперь могут создавать системные сообщения, использовать кастомные карты мира и управлять таймлайном событий.',
    icon: 'Wand2',
    color: 'bg-green-500',
  },
  {
    id: 5,
    title: 'Исправление ошибок и улучшения',
    date: '10 октября 2025',
    category: 'Патчи',
    content: 'Исправлена проблема с уведомлениями, улучшена производительность при загрузке тем, добавлена темная тема для мобильных устройств.',
    icon: 'Wrench',
    color: 'bg-red-500',
  },
];

export default function News() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glow-text">Новости портала</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Следите за обновлениями, событиями и новыми возможностями
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <Card key={item.id} className="hover:glow transition-all">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon name={item.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {item.date}
                        </span>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 glow bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={24} />
              Подписка на новости
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Будьте в курсе всех обновлений! Включите уведомления в настройках профиля.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="flex items-center gap-2 py-2 px-3">
                <Icon name="Mail" size={14} />
                Email рассылка
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 py-2 px-3">
                <Icon name="Bell" size={14} />
                Push-уведомления
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 py-2 px-3">
                <Icon name="MessageSquare" size={14} />
                В личных сообщениях
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
