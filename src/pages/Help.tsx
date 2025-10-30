import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const faq = [
  {
    question: 'Как начать играть?',
    answer: 'Зарегистрируйтесь, создайте персонажа и выберите интересующий вас мир. Прочитайте описание мира и найдите открытую тему для вступления или создайте свою.',
  },
  {
    question: 'Что такое РП (ролевая игра)?',
    answer: 'Ролевая игра — это совместное творчество, где вы описываете действия и мысли своего персонажа в вымышленном мире. Каждый игрок управляет своим героем и взаимодействует с другими.',
  },
  {
    question: 'Как создать своего персонажа?',
    answer: 'Перейдите в раздел выбранного мира и создайте анкету персонажа. Опишите его внешность, характер, историю и способности. Дождитесь одобрения администрации.',
  },
  {
    question: 'Можно ли играть за нескольких персонажей?',
    answer: 'Да, вы можете создать несколько персонажей в разных мирах или в одном мире, если правила это позволяют.',
  },
  {
    question: 'Что делать, если возник конфликт с игроком?',
    answer: 'Попробуйте решить конфликт в личных сообщениях. Если это не помогло, обратитесь к модератору или администратору мира.',
  },
  {
    question: 'Как стать мастером игры?',
    answer: 'Наберитесь опыта как игрок, затем подайте заявку на создание своего мира. Администрация рассмотрит вашу заявку и поможет с запуском.',
  },
];

const guides = [
  {
    title: 'Гайд для новичков',
    description: 'Первые шаги в мире ролевых игр',
    icon: 'BookOpen',
  },
  {
    title: 'Создание персонажа',
    description: 'Как придумать интересного героя',
    icon: 'Users',
  },
  {
    title: 'Писательское мастерство',
    description: 'Советы по написанию постов',
    icon: 'Feather',
  },
  {
    title: 'Игровые миры',
    description: 'Обзор доступных вселенных',
    icon: 'Globe',
  },
];

export default function Help() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glow-text">Помощь</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Найдите ответы на свои вопросы или свяжитесь с поддержкой
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:glow transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-3">
                  <Icon name={guide.icon} size={24} className="text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="HelpCircle" size={24} />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="glow bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MessageCircle" size={24} />
              Нужна дополнительная помощь?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Не нашли ответ на свой вопрос? Наша команда поддержки готова помочь!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex items-center gap-2 glow">
                <Icon name="Mail" size={18} />
                Написать в поддержку
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Icon name="MessageSquare" size={18} />
                Открыть чат
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
