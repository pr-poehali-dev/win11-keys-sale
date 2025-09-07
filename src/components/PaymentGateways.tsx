import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PaymentGatewaysProps {
  amount: number;
  onPaymentComplete: (paymentData: any) => void;
}

export const PaymentGateways = ({ amount, onPaymentComplete }: PaymentGatewaysProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'sbp',
      name: 'Система быстрых платежей',
      description: 'Моментальный перевод через СБП',
      icon: 'CreditCard',
      fee: 0,
      popular: true
    },
    {
      id: 'card',
      name: 'Банковская карта',
      description: 'Visa, MasterCard, МИР',
      icon: 'CreditCard',
      fee: 2.5,
      popular: false
    },
    {
      id: 'yoomoney',
      name: 'ЮMoney',
      description: 'Электронный кошелек',
      icon: 'Wallet',
      fee: 3,
      popular: false
    },
    {
      id: 'tinkoff',
      name: 'Тинькофф Платежи',
      description: 'Прямая интеграция с банком',
      icon: 'Building2',
      fee: 1.5,
      popular: false
    },
    {
      id: 'qiwi',
      name: 'QIWI Кошелек',
      description: 'Оплата через QIWI',
      icon: 'Smartphone',
      fee: 2.9,
      popular: false
    },
    {
      id: 'webmoney',
      name: 'WebMoney',
      description: 'Электронная валюта',
      icon: 'Globe',
      fee: 0.8,
      popular: false
    }
  ];

  const calculateTotal = (method: string) => {
    const paymentMethod = paymentMethods.find(m => m.id === method);
    const fee = paymentMethod ? (amount * paymentMethod.fee / 100) : 0;
    return amount + fee;
  };

  const handlePayment = async (methodId: string) => {
    setSelectedMethod(methodId);
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        method: methodId,
        amount: calculateTotal(methodId),
        status: 'success',
        transactionId: `TXN_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      
      if (methodId === 'card') {
        setPaymentDialogOpen(true);
        setIsProcessing(false);
        return;
      }
      
      if (methodId === 'sbp') {
        // Show SBP QR code simulation
        setPaymentDialogOpen(true);
        setIsProcessing(false);
        return;
      }
      
      onPaymentComplete(paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    // Simulate card payment processing
    setTimeout(() => {
      const paymentData = {
        method: 'card',
        amount: calculateTotal('card'),
        status: 'success',
        transactionId: `TXN_${Date.now()}`,
        timestamp: new Date().toISOString(),
        card: {
          lastFour: cardData.number.slice(-4),
          brand: 'VISA'
        }
      };
      
      onPaymentComplete(paymentData);
      setPaymentDialogOpen(false);
      setIsProcessing(false);
    }, 3000);
  };

  const handleSBPPayment = () => {
    // Simulate SBP confirmation
    setTimeout(() => {
      const paymentData = {
        method: 'sbp',
        amount: calculateTotal('sbp'),
        status: 'success',
        transactionId: `SBP_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      
      onPaymentComplete(paymentData);
      setPaymentDialogOpen(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-microsoft-dark mb-2">Выберите способ оплаты</h3>
        <p className="text-gray-600 text-sm">Все платежи защищены SSL-шифрованием</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer border-2 transition-all hover:shadow-md ${
              selectedMethod === method.id 
                ? 'border-microsoft-blue bg-microsoft-light' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={method.icon as any} size={24} className="text-microsoft-blue" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{method.name}</h4>
                      {method.popular && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Популярно
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {calculateTotal(method.id).toLocaleString()} ₽
                  </p>
                  {method.fee > 0 && (
                    <p className="text-xs text-gray-500">
                      +{method.fee}% комиссия
                    </p>
                  )}
                  {method.fee === 0 && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Без комиссии
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMethod && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold">К оплате: {calculateTotal(selectedMethod).toLocaleString()} ₽</p>
              {paymentMethods.find(m => m.id === selectedMethod)?.fee! > 0 && (
                <p className="text-sm text-gray-600">
                  Включая комиссию {paymentMethods.find(m => m.id === selectedMethod)?.fee}%
                </p>
              )}
            </div>
          </div>
          
          <Button 
            onClick={() => handlePayment(selectedMethod)}
            className="w-full bg-microsoft-blue hover:bg-microsoft-blue/90 text-lg py-6"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                Обработка платежа...
              </>
            ) : (
              <>
                <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                Оплатить {calculateTotal(selectedMethod).toLocaleString()} ₽
              </>
            )}
          </Button>
        </div>
      )}

      {/* Card Payment Dialog */}
      <Dialog open={paymentDialogOpen && selectedMethod === 'card'} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оплата банковской картой</DialogTitle>
            <DialogDescription>
              Введите данные вашей карты для завершения платежа
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Номер карты</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Срок действия</Label>
                <Input
                  id="expiry"
                  placeholder="ММ/ГГ"
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cardData.cvv}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                  maxLength={3}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Имя владельца</Label>
              <Input
                id="card-name"
                placeholder="IVAN IVANOV"
                value={cardData.name}
                onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <span>К оплате:</span>
              <span className="font-bold text-lg">{calculateTotal('card').toLocaleString()} ₽</span>
            </div>
            <Button 
              onClick={handleCardPayment}
              className="w-full bg-microsoft-blue hover:bg-microsoft-blue/90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Обработка платежа...
                </>
              ) : (
                'Оплатить картой'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* SBP Payment Dialog */}
      <Dialog open={paymentDialogOpen && selectedMethod === 'sbp'} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оплата через СБП</DialogTitle>
            <DialogDescription>
              Отсканируйте QR-код в мобильном приложении вашего банка
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 text-center">
            <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300">
              <div className="w-48 h-48 mx-auto bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-lg">Сумма: {calculateTotal('sbp').toLocaleString()} ₽</p>
              <p className="text-sm text-gray-600">
                Отсканируйте QR-код или откройте ссылку в приложении банка
              </p>
            </div>
            <Button 
              onClick={handleSBPPayment}
              variant="outline" 
              className="w-full"
            >
              <Icon name="Smartphone" className="mr-2 h-4 w-4" />
              Открыть в приложении банка
            </Button>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                После оплаты страница обновится автоматически
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};