import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    paymentMethod: 'sbp',
    agreeToTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateQRCode = async () => {
    // Simulate QR code generation for SBP payment
    const mockQRData = `SBP|${Date.now()}|${state.total}|KeyStore`;
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mockQRData)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Необходимо согласиться с условиями');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    if (formData.paymentMethod === 'sbp') {
      await generateQRCode();
      setShowPayment(true);
    }
    
    setIsProcessing(false);
  };

  const confirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success
    dispatch({ type: 'CLEAR_CART' });
    alert('Оплата прошла успешно! Ключи отправлены на ' + formData.email);
    window.location.href = '/';
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-microsoft-light py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <Icon name="ShoppingCart" size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-microsoft-dark mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину для оформления заказа</p>
          <Button onClick={() => window.location.href = '/'}>
            Вернуться к покупкам
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-microsoft-light py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-microsoft-dark">Оформление заказа</h1>
          <p className="text-gray-600">Заполните данные для получения ключей</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {!showPayment ? (
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Контактная информация</CardTitle>
                    <CardDescription>
                      Ключи будут отправлены на указанный email адрес
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Имя *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Иван"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Фамилия *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Иванов"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Способ оплаты</CardTitle>
                    <CardDescription>
                      Выберите удобный способ оплаты
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="sbp" id="sbp" />
                        <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Icon name="Smartphone" size={20} className="text-microsoft-blue" />
                            <div>
                              <div className="font-semibold">Система Быстрых Платежей</div>
                              <div className="text-sm text-gray-600">Мгновенное зачисление через СБП</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Icon name="CreditCard" size={20} className="text-microsoft-blue" />
                            <div>
                              <div className="font-semibold">Банковская карта</div>
                              <div className="text-sm text-gray-600">Visa, MasterCard, МИР</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="yoomoney" id="yoomoney" />
                        <Label htmlFor="yoomoney" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Icon name="Wallet" size={20} className="text-microsoft-blue" />
                            <div>
                              <div className="font-semibold">ЮMoney</div>
                              <div className="text-sm text-gray-600">Быстро и безопасно</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        Я согласен с{' '}
                        <a href="#" className="text-microsoft-blue underline">условиями использования</a>{' '}
                        и{' '}
                        <a href="#" className="text-microsoft-blue underline">политикой конфиденциальности</a>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  type="submit" 
                  className="w-full bg-microsoft-blue hover:bg-microsoft-blue/90"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      Перейти к оплате
                    </>
                  )}
                </Button>
              </form>
            ) : (
              /* Payment Screen */
              <Card>
                <CardHeader>
                  <CardTitle>Оплата через СБП</CardTitle>
                  <CardDescription>
                    Отсканируйте QR-код в приложении банка или перейдите по ссылке
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {qrCode && (
                    <div className="inline-block p-4 bg-white rounded-lg border">
                      <img src={qrCode} alt="QR код для оплаты" className="w-48 h-48 mx-auto" />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="font-semibold">Сумма к оплате: {state.total.toLocaleString()} ₽</p>
                    <p className="text-sm text-gray-600">
                      После оплаты нажмите кнопку "Подтвердить оплату"
                    </p>
                  </div>

                  <Alert>
                    <Icon name="Clock" size={16} />
                    <AlertDescription>
                      QR-код действителен в течение 15 минут
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={confirmPayment}
                      className="flex-1 bg-microsoft-success hover:bg-microsoft-success/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                          Проверяем...
                        </>
                      ) : (
                        <>
                          <Icon name="Check" size={16} className="mr-2" />
                          Подтвердить оплату
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPayment(false)}
                      className="flex-1"
                    >
                      Назад
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Товаров:</span>
                      <span>{state.itemCount}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span className="text-microsoft-blue">{state.total.toLocaleString()} ₽</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={14} className="text-microsoft-success" />
                      <span>Защищенная оплата</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Zap" size={14} className="text-microsoft-blue" />
                      <span>Мгновенная доставка</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="RefreshCw" size={14} className="text-microsoft-success" />
                      <span>Возврат 30 дней</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;