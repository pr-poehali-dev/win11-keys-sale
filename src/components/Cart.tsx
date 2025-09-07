import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

export const Cart = () => {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const proceedToCheckout = () => {
    setIsOpen(false);
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {state.itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Корзина покупок</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="ShoppingCart" size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Корзина пуста</p>
              <p className="text-sm text-gray-400 mt-2">Добавьте товары для оформления заказа</p>
            </div>
          ) : (
            <>
              {state.items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-microsoft-blue">
                        {item.price.toLocaleString()} ₽
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Товаров в корзине:</span>
                  <span>{state.itemCount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span className="text-microsoft-blue">{state.total.toLocaleString()} ₽</span>
                </div>
              </div>
              
              <Button 
                onClick={proceedToCheckout}
                className="w-full bg-microsoft-blue hover:bg-microsoft-blue/90"
                size="lg"
              >
                <Icon name="CreditCard" size={16} className="mr-2" />
                Оформить заказ
              </Button>
              
              <Button
                variant="outline"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full"
              >
                Очистить корзину
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};