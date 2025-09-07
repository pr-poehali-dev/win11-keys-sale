import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Navigate } from 'react-router-dom';

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  product: string;
  amount: number;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  key?: string;
}

interface ProductKey {
  id: string;
  productId: number;
  key: string;
  isUsed: boolean;
  orderId?: string;
  createdAt: string;
}

const Admin = () => {
  const { state } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [keys, setKeys] = useState<ProductKey[]>([]);
  const [newKey, setNewKey] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string>('1');

  // Redirect if not admin
  if (!state.isAuthenticated || state.user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    // Mock data for demonstration
    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        customerName: 'Иван Петров',
        email: 'ivan@example.com',
        phone: '+7 900 123-45-67',
        product: 'Windows 11 Pro',
        amount: 7990,
        status: 'paid',
        paymentMethod: 'СБП',
        createdAt: '2024-09-08T10:30:00Z',
        key: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'
      },
      {
        id: 'ORD-002',
        customerName: 'Мария Сидорова',
        email: 'maria@example.com',
        phone: '+7 900 987-65-43',
        product: 'Windows 11 Home',
        amount: 4990,
        status: 'pending',
        paymentMethod: 'Банковская карта',
        createdAt: '2024-09-08T11:15:00Z'
      },
      {
        id: 'ORD-003',
        customerName: 'Алексей Козлов',
        email: 'alex@example.com',
        phone: '+7 900 555-44-33',
        product: 'Windows 11 Pro for Workstations',
        amount: 12990,
        status: 'delivered',
        paymentMethod: 'ЮMoney',
        createdAt: '2024-09-07T16:45:00Z',
        key: 'YYYYY-YYYYY-YYYYY-YYYYY-YYYYY'
      }
    ];

    const mockKeys: ProductKey[] = [
      { id: '1', productId: 1, key: 'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE', isUsed: false, createdAt: '2024-09-08T09:00:00Z' },
      { id: '2', productId: 1, key: 'FFFFF-GGGGG-HHHHH-IIIII-JJJJJ', isUsed: false, createdAt: '2024-09-08T09:00:00Z' },
      { id: '3', productId: 2, key: 'KKKKK-LLLLL-MMMMM-NNNNN-OOOOO', isUsed: true, orderId: 'ORD-001', createdAt: '2024-09-07T12:00:00Z' },
      { id: '4', productId: 2, key: 'PPPPP-QQQQQ-RRRRR-SSSSS-TTTTT', isUsed: false, createdAt: '2024-09-08T09:00:00Z' },
      { id: '5', productId: 3, key: 'UUUUU-VVVVV-WWWWW-XXXXX-YYYYY', isUsed: true, orderId: 'ORD-003', createdAt: '2024-09-07T14:00:00Z' },
    ];

    setOrders(mockOrders);
    setKeys(mockKeys);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      pending: 'Ожидает',
      paid: 'Оплачен',
      delivered: 'Доставлен',
      cancelled: 'Отменен'
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const getProductName = (productId: number) => {
    const products = {
      1: 'Windows 11 Home',
      2: 'Windows 11 Pro',
      3: 'Windows 11 Pro for Workstations'
    };
    return products[productId as keyof typeof products] || 'Unknown';
  };

  const addKey = () => {
    if (!newKey.trim()) return;

    const key: ProductKey = {
      id: Date.now().toString(),
      productId: parseInt(selectedProduct),
      key: newKey.trim(),
      isUsed: false,
      createdAt: new Date().toISOString()
    };

    setKeys(prev => [...prev, key]);
    setNewKey('');
  };

  const deleteKey = (keyId: string) => {
    setKeys(prev => prev.filter(k => k.id !== keyId));
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
  };

  const assignKeyToOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Find product ID based on product name
    const productMap: { [key: string]: number } = {
      'Windows 11 Home': 1,
      'Windows 11 Pro': 2,
      'Windows 11 Pro for Workstations': 3
    };
    
    const productId = productMap[order.product];
    const availableKey = keys.find(k => k.productId === productId && !k.isUsed);
    
    if (availableKey) {
      setKeys(prev => prev.map(k => 
        k.id === availableKey.id 
          ? { ...k, isUsed: true, orderId } 
          : k
      ));
      
      setOrders(prev => prev.map(o => 
        o.id === orderId 
          ? { ...o, key: availableKey.key, status: 'delivered' }
          : o
      ));
    }
  };

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    availableKeys: keys.filter(k => !k.isUsed).length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-microsoft-dark mb-2">Панель администратора</h1>
          <p className="text-gray-600">Управление заказами и ключами активации</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="ShoppingCart" size={24} className="text-microsoft-blue" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  <p className="text-sm text-gray-600">Всего заказов</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={24} className="text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} ₽</p>
                  <p className="text-sm text-gray-600">Общая выручка</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={24} className="text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  <p className="text-sm text-gray-600">Ожидают</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Key" size={24} className="text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.availableKeys}</p>
                  <p className="text-sm text-gray-600">Доступно ключей</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="keys">Ключи активации</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление заказами</CardTitle>
                <CardDescription>
                  Просмотр и управление всеми заказами клиентов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID заказа</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Продукт</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-sm text-gray-600">{order.email}</p>
                            <p className="text-sm text-gray-600">{order.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.amount.toLocaleString()} ₽</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {order.status === 'paid' && !order.key && (
                              <Button
                                size="sm"
                                onClick={() => assignKeyToOrder(order.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Icon name="Key" size={14} className="mr-1" />
                                Выдать ключ
                              </Button>
                            )}
                            {order.key && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Icon name="Eye" size={14} className="mr-1" />
                                    Ключ
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Ключ активации</DialogTitle>
                                    <DialogDescription>
                                      Ключ для заказа {order.id}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="p-4 bg-gray-100 rounded-lg">
                                    <code className="text-lg font-mono">{order.key}</code>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Ожидает</SelectItem>
                                <SelectItem value="paid">Оплачен</SelectItem>
                                <SelectItem value="delivered">Доставлен</SelectItem>
                                <SelectItem value="cancelled">Отменен</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новые ключи</CardTitle>
                <CardDescription>
                  Добавьте ключи активации для продажи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Продукт</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Windows 11 Home</SelectItem>
                        <SelectItem value="2">Windows 11 Pro</SelectItem>
                        <SelectItem value="3">Windows 11 Pro for Workstations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="key">Ключ активации</Label>
                    <Input
                      id="key"
                      placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button onClick={addKey} className="bg-microsoft-blue hover:bg-microsoft-blue/90">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Все ключи активации</CardTitle>
                <CardDescription>
                  Управление существующими ключами активации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Продукт</TableHead>
                      <TableHead>Ключ</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Заказ</TableHead>
                      <TableHead>Дата добавления</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell>{getProductName(key.productId)}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {key.key}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge className={key.isUsed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                            {key.isUsed ? 'Использован' : 'Доступен'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {key.orderId ? (
                            <Button variant="link" size="sm" className="p-0">
                              {key.orderId}
                            </Button>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(key.createdAt).toLocaleDateString('ru-RU')}
                        </TableCell>
                        <TableCell>
                          {!key.isUsed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteKey(key.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;