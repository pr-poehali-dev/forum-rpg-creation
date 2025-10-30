import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const rules = [
  {
    title: 'Уважение к игрокам',
    icon: 'Heart',
    items: [
      'Относитесь к другим участникам с уважением',
      'Не используйте оскорбления и грубые выражения',
      'Уважайте мнение и стиль игры других',
    ],
  },
  {
    title: 'Качество ролевой игры',
    icon: 'Scroll',
    items: [
      'Пишите посты минимум из 3-5 предложений',
      'Следите за грамотностью и пунктуацией',
      'Описывайте действия и мысли персонажа',
    ],
  },
  {
    title: 'Игровой процесс',
    icon: 'Gamepad2',
    items: [
      'Не контролируйте чужих персонажей без разрешения',
      'Следуйте логике мира и своего персонажа',
      'Согласовывайте значимые события с мастером',
    ],
  },
  {
    title: 'Запрещенный контент',
    icon: 'ShieldAlert',
    items: [
      'Запрещена пропаганда насилия и дискриминации',
      'Не публикуйте контент 18+ в открытых темах',
      'Не размещайте чужие материалы без разрешения',
    ],
  },
];

export default function Rules() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glow-text">Правила портала</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Соблюдайте эти правила для комфортной игры всех участников
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {rules.map((rule, index) => (
            <Card key={index} className="hover:glow transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name={rule.icon} size={20} className="text-primary-foreground" />
                  </div>
                  {rule.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {rule.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glow bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={24} />
              Нарушения и наказания
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Предупреждение</h3>
                <p className="text-sm text-muted-foreground">
                  За первое нарушение правил — устное предупреждение
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Icon name="AlertCircle" size={20} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Временный бан</h3>
                <p className="text-sm text-muted-foreground">
                  При повторных нарушениях — блокировка на 3-7 дней
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Icon name="XCircle" size={20} className="text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Перманентный бан</h3>
                <p className="text-sm text-muted-foreground">
                  За грубые нарушения — постоянная блокировка аккаунта
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
