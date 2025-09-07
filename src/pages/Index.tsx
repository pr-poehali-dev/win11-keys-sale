import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Cart } from '@/components/Cart';
import { useCart, Product } from '@/contexts/CartContext';

const Index = () => {
  const { dispatch } = useCart();

  const products: Product[] = [
    {
      id: 1,
      title: "Windows 11 Home",
      description: "Для домашнего использования",
      price: 4990,
      originalPrice: 7990,
      features: ["Безлимитная лицензия", "Цифровая доставка", "Техподдержка 24/7"],
      popular: false
    },
    {
      id: 2,
      title: "Windows 11 Pro",
      description: "Для бизнеса и профессионалов",
      price: 7990,
      originalPrice: 12990,
      features: ["Расширенная безопасность", "Управление доменом", "BitLocker", "Hyper-V"],
      popular: true
    },
    {
      id: 3,
      title: "Windows 11 Pro for Workstations",
      description: "Для рабочих станций",
      price: 12990,
      originalPrice: 18990,
      features: ["До 6ТБ RAM", "До 4 процессоров", "ReFS файловая система"],
      popular: false
    }
  ];

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const paymentMethods = [
    { name: "СБП", icon: "CreditCard", description: "Мгновенное зачисление" },
    { name: "Банковская карта", icon: "CreditCard", description: "Visa, MasterCard, МИР" },
    { name: "ЮMoney", icon: "Wallet", description: "Быстро и безопасно" },
    { name: "QIWI", icon: "Smartphone", description: "Оплата через кошелек" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-microsoft-light">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-microsoft-blue rounded flex items-center justify-center">
              <Icon name="Windows" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-microsoft-dark">KeyStore</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#products" className="text-microsoft-dark hover:text-microsoft-blue transition-colors">Продукты</a>
            <a href="#payment" className="text-microsoft-dark hover:text-microsoft-blue transition-colors">Оплата</a>
            <a href="#support" className="text-microsoft-dark hover:text-microsoft-blue transition-colors">Поддержка</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Cart />
            <Button className="bg-microsoft-blue hover:bg-microsoft-blue/90">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/img/69e8a347-8d04-4e2e-8090-4a6407ade4b1.jpg" 
              alt="Windows 11 Keys" 
              className="w-24 h-24 mx-auto mb-6 rounded-full"
            />
          </div>
          <h1 className="text-5xl font-bold text-microsoft-dark mb-6">
            Лицензионные ключи <span className="text-microsoft-blue">Windows 11</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Официальные цифровые лицензии Microsoft с мгновенной доставкой и пожизненной гарантией
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Icon name="Shield" size={16} className="text-microsoft-success" />
              <span className="text-sm">100% Легально</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Icon name="Zap" size={16} className="text-microsoft-blue" />
              <span className="text-sm">Мгновенная доставка</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Icon name="Headphones" size={16} className="text-microsoft-dark" />
              <span className="text-sm">Техподдержка 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-microsoft-dark mb-12">
            Выберите подходящую лицензию
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className={`relative ${product.popular ? 'border-microsoft-blue shadow-xl scale-105' : ''}`}>
                {product.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-microsoft-blue">
                    Популярный выбор
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-microsoft-dark">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-microsoft-blue">{product.price.toLocaleString()} ₽</span>
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-microsoft-success" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => addToCart(product)}
                    className={`w-full ${product.popular ? 'bg-microsoft-blue hover:bg-microsoft-blue/90' : ''}`}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section id="payment" className="py-20 px-4 bg-microsoft-light">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-microsoft-dark mb-12">
            Способы оплаты и доставки
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {paymentMethods.map((method) => (
              <Card key={method.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Icon name={method.icon as any} size={32} className="mx-auto mb-4 text-microsoft-blue" />
                  <h3 className="font-semibold text-microsoft-dark mb-2">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-microsoft-dark mb-4 text-center">
                  Как происходит доставка ключей
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-microsoft-blue rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Оплачиваете заказ</h4>
                      <p className="text-gray-600">Выберите удобный способ оплаты через СБП или карту</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-microsoft-blue rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Получаете ключ мгновенно</h4>
                      <p className="text-gray-600">Лицензионный ключ приходит на email в течение 1-3 минут</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-microsoft-blue rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Активируете Windows</h4>
                      <p className="text-gray-600">Следуете инструкции для активации системы</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-microsoft-dark mb-12">
            Гарантии и безопасность
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-microsoft-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-microsoft-blue" />
              </div>
              <h3 className="text-xl font-semibold text-microsoft-dark mb-4">Пожизненная гарантия</h3>
              <p className="text-gray-600">Все ключи работают пожизненно. Если возникнут проблемы — заменим бесплатно</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-microsoft-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="RefreshCw" size={32} className="text-microsoft-success" />
              </div>
              <h3 className="text-xl font-semibold text-microsoft-dark mb-4">Возврат 30 дней</h3>
              <p className="text-gray-600">Не подошел ключ? Вернем деньги в течение 30 дней без лишних вопросов</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-microsoft-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-microsoft-dark" />
              </div>
              <h3 className="text-xl font-semibold text-microsoft-dark mb-4">Официальные лицензии</h3>
              <p className="text-gray-600">Все ключи получены легально от официальных партнеров Microsoft</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="support" className="py-20 px-4 bg-microsoft-light">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-microsoft-dark mb-12">
            Часто задаваемые вопросы
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Как долго действует лицензия Windows 11?</AccordionTrigger>
              <AccordionContent>
                Лицензия Windows 11 действует пожизненно на одном компьютере. После активации система будет получать все обновления безопасности и функциональные обновления от Microsoft.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Можно ли использовать ключ на нескольких компьютерах?</AccordionTrigger>
              <AccordionContent>
                Один ключ активирует Windows только на одном компьютере. Для нескольких устройств необходимо приобрести соответствующее количество лицензий.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Что делать, если ключ не активируется?</AccordionTrigger>
              <AccordionContent>
                Обратитесь в техподдержку через любой удобный способ. Мы проверим ключ и при необходимости предоставим замену в течение 24 часов.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Как оплатить через СБП?</AccordionTrigger>
              <AccordionContent>
                При оформлении заказа выберите способ оплаты "СБП", отсканируйте QR-код или перейдите по ссылке из мобильного приложения банка. Оплата происходит мгновенно.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-microsoft-dark mb-8">
            Остались вопросы? Свяжитесь с нами!
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={20} className="text-microsoft-blue" />
              <span>support@keystore.ru</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={20} className="text-microsoft-blue" />
              <span>+7 (800) 123-45-67</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={20} className="text-microsoft-blue" />
              <span>Telegram: @keystore_support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-microsoft-dark text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-microsoft-blue rounded flex items-center justify-center">
                <Icon name="Windows" size={16} className="text-white" />
              </div>
              <span className="font-bold">KeyStore</span>
            </div>
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>© 2024 KeyStore. Все права защищены.</p>
              <p className="mt-1">Официальный партнер Microsoft в России</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;