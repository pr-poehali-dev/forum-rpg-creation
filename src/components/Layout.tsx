import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/rules', label: 'Правила', icon: 'ScrollText' },
    { path: '/help', label: 'Помощь', icon: 'HelpCircle' },
    { path: '/news', label: 'Новости', icon: 'Newspaper' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsRegisterOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow">
                <Icon name="Sword" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold glow-text">RPG Форум</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 transition-colors hover:text-primary ${
                    location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Icon name="User" size={18} />
                    <span className="hidden sm:inline">Профиль</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center gap-2"
                  >
                    <Icon name="LogOut" size={18} />
                    <span className="hidden sm:inline">Выход</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Icon name="LogIn" size={18} />
                    <span className="hidden sm:inline">Вход</span>
                  </Button>
                  <Button
                    onClick={() => setIsRegisterOpen(true)}
                    className="flex items-center gap-2 glow"
                  >
                    <Icon name="UserPlus" size={18} />
                    <span className="hidden sm:inline">Регистрация</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border mt-20 bg-card/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-3 text-primary">RPG Форум</h3>
              <p className="text-sm text-muted-foreground">
                Портал для любителей ролевых игр
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Навигация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Связь</h3>
              <p className="text-sm text-muted-foreground">
                support@rpgforum.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 RPG Форум. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl glow-text">Вход в портал</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="login-username">Логин</Label>
              <Input id="login-username" placeholder="Введите логин" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Пароль</Label>
              <Input id="login-password" type="password" placeholder="Введите пароль" required />
            </div>
            <Button type="submit" className="w-full glow">
              Войти
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegisterOpen(true);
                }}
              >
                Зарегистрироваться
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl glow-text">Регистрация героя</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="register-username">Логин</Label>
              <Input id="register-username" placeholder="Выберите логин" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Пароль</Label>
              <Input id="register-password" type="password" placeholder="Создайте пароль" required />
            </div>
            <Button type="submit" className="w-full glow">
              Создать аккаунт
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setIsRegisterOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Войти
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
