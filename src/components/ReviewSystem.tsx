import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productId: number;
}

interface ReviewSystemProps {
  productId?: number;
  showForm?: boolean;
}

export const ReviewSystem = ({ productId, showForm = true }: ReviewSystemProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock reviews data
    const mockReviews: Review[] = [
      {
        id: '1',
        userName: 'Александр К.',
        rating: 5,
        comment: 'Отличный сервис! Ключ пришел моментально, активация прошла без проблем. Windows 11 Pro работает стабильно. Рекомендую!',
        date: '2024-09-05',
        verified: true,
        productId: 2
      },
      {
        id: '2',
        userName: 'Мария С.',
        rating: 5,
        comment: 'Очень довольна покупкой. Оплатила через СБП, ключ получила в течение 3 минут. Все честно, как и обещали. Техподдержка отвечает быстро.',
        date: '2024-09-04',
        verified: true,
        productId: 2
      },
      {
        id: '3',
        userName: 'Игорь В.',
        rating: 4,
        comment: 'Хороший магазин, но хотелось бы больше способов оплаты. В остальном все отлично - быстро, надежно, качественно.',
        date: '2024-09-03',
        verified: false,
        productId: 1
      },
      {
        id: '4',
        userName: 'Екатерина Л.',
        rating: 5,
        comment: 'Покупала Windows 11 Home для нового ноутбука. Все прошло гладко, ключ рабочий. Цена приятно удивила - намного дешевле официального магазина.',
        date: '2024-09-02',
        verified: true,
        productId: 1
      },
      {
        id: '5',
        userName: 'Дмитрий П.',
        rating: 5,
        comment: 'Professional версия для рабочей станции. Активировалось с первого раза. Получил все заявленные функции. Отличное соотношение цена-качество.',
        date: '2024-09-01',
        verified: true,
        productId: 3
      },
      {
        id: '6',
        userName: 'Анна М.',
        rating: 4,
        comment: 'Немного сомневалась в начале, но все оказалось честно. Ключ работает, Windows обновляется. Единственное - хотелось бы инструкцию подробнее.',
        date: '2024-08-30',
        verified: true,
        productId: 2
      }
    ];

    const filteredReviews = productId 
      ? mockReviews.filter(r => r.productId === productId)
      : mockReviews;
    
    setReviews(filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [productId]);

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      counts[review.rating as keyof typeof counts]++;
    });
    return counts;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userName: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        verified: false,
        productId: productId || 1
      };

      setReviews(prev => [review, ...prev]);
      setNewReview({ name: '', rating: 5, comment: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onClick?.(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = getAverageRating();
  const ratingCounts = getRatingCounts();

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={24} />
                <span>Отзывы покупателей</span>
              </CardTitle>
              <CardDescription>
                {reviews.length} отзыва • Средняя оценка {averageRating.toFixed(1)}
              </CardDescription>
            </div>
            {showForm && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-microsoft-blue hover:bg-microsoft-blue/90">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Оставить отзыв
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Оставить отзыв</DialogTitle>
                    <DialogDescription>
                      Поделитесь своим мнением о покупке
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={newReview.name}
                        onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Оценка</Label>
                      {renderStars(newReview.rating, true, (rating) => 
                        setNewReview(prev => ({ ...prev, rating }))
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment">Комментарий</Label>
                      <Textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Расскажите о своем опыте использования..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-microsoft-blue hover:bg-microsoft-blue/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        'Отправить отзыв'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating Bars */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}</span>
                  <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${reviews.length > 0 ? (ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-microsoft-dark mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating))}
              <p className="text-sm text-gray-600 mt-2">
                Основано на {reviews.length} отзывах
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-microsoft-blue text-white">
                    {review.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-microsoft-dark">
                        {review.userName}
                      </h4>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Icon name="Check" size={10} className="mr-1" />
                          Проверено
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Пока нет отзывов
            </h3>
            <p className="text-gray-500">
              Станьте первым, кто оставит отзыв об этом продукте
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};