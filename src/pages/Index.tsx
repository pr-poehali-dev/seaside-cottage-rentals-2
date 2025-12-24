import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { format, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [bookings, setBookings] = useState<{[key: string]: {dateFrom?: Date, dateTo?: Date}}>({
    house1: {},
    house2: {},
    house3: {},
    house4: {}
  });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const setHouseDate = (houseId: string, type: 'dateFrom' | 'dateTo', date: Date | undefined) => {
    setBookings(prev => ({
      ...prev,
      [houseId]: {
        ...prev[houseId],
        [type]: date
      }
    }));
  };

  const houses = [
    {
      id: 'house1',
      title: 'Домик №1 Стандарт',
      price: 3500,
      guests: 4,
      rooms: 3,
      image: 'https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/bb0e6ca7-5315-4026-be13-6112d9c4a993.jpg',
      features: ['Кондиционер', 'Wi-Fi', 'Кухня', 'Терраса']
    },
    {
      id: 'house2',
      title: 'Домик №2 Комфорт',
      price: 4500,
      guests: 6,
      rooms: 3,
      image: 'https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/bb0e6ca7-5315-4026-be13-6112d9c4a993.jpg',
      features: ['Кондиционер', 'Wi-Fi', 'Кухня', 'Терраса', 'Вид на море']
    },
    {
      id: 'house3',
      title: 'Домик №3 Комфорт',
      price: 4500,
      guests: 6,
      rooms: 3,
      image: 'https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/bb0e6ca7-5315-4026-be13-6112d9c4a993.jpg',
      features: ['Кондиционер', 'Wi-Fi', 'Кухня', 'Терраса', 'Вид на море']
    },
    {
      id: 'house4',
      title: 'Домик №4 Люкс',
      price: 6000,
      guests: 8,
      rooms: 3,
      image: 'https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/bb0e6ca7-5315-4026-be13-6112d9c4a993.jpg',
      features: ['Кондиционер', 'Wi-Fi', 'Премиум кухня', 'Большая терраса', 'Вид на море', 'Джакузи']
    }
  ];

  const services = [
    { icon: 'Waves', title: 'До моря 500м', description: 'Пешая прогулка до пляжа' },
    { icon: 'Droplets', title: 'Бассейн', description: 'Открытый бассейн на территории' },
    { icon: 'Coffee', title: 'Беседка-кафе', description: 'Летнее кафе с зоной отдыха' },
    { icon: 'Baby', title: 'Детская площадка', description: 'Безопасная зона для детей' },
    { icon: 'Car', title: 'Парковка', description: 'Бесплатная охраняемая парковка' },
    { icon: 'Wifi', title: 'Wi-Fi', description: 'Высокоскоростной интернет' }
  ];

  const reviews = [
    { name: 'Анна М.', rating: 5, text: 'Прекрасный отдых! Домики уютные, территория ухоженная. Бассейн - супер для детей. Обязательно вернемся!' },
    { name: 'Дмитрий К.', rating: 5, text: 'Отличное соотношение цены и качества. До моря близко, всё что нужно есть на территории.' },
    { name: 'Елена В.', rating: 5, text: 'Тихое спокойное место для семейного отдыха. Хозяева очень приветливые и отзывчивые.' }
  ];

  const specialOffers = [
    { 
      period: 'Май - Июнь', 
      discount: '20%', 
      description: 'Раннее бронирование',
      color: 'bg-green-500'
    },
    { 
      period: 'Июль - Август', 
      discount: '10%', 
      description: 'При проживании от 14 дней',
      color: 'bg-orange-500'
    },
    { 
      period: 'Сентябрь', 
      discount: '25%', 
      description: 'Бархатный сезон',
      color: 'bg-purple-500'
    }
  ];

  const calculateTotal = (houseId: string, price: number) => {
    const booking = bookings[houseId];
    if (!booking.dateFrom || !booking.dateTo) return 0;
    const days = differenceInDays(booking.dateTo, booking.dateFrom);
    return days > 0 ? days * price : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Home" className="text-primary" size={28} />
              <span className="text-2xl font-bold text-primary">Морской Берег</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'houses', 'gallery', 'services', 'booking', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`hover:text-primary transition-colors ${
                    activeSection === section ? 'text-primary font-semibold' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'houses' && 'О домиках'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'services' && 'Услуги'}
                  {section === 'booking' && 'Бронирование'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-accent text-white">Крым • Черное море • Витино</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Уютные домики у моря
              </h1>
              <p className="text-xl text-gray-600">
                4 трехкомнатных домика для вашего идеального отдыха в 500 метрах от моря. 
                Бассейн, кафе и детская площадка на территории.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('booking')} className="text-lg">
                  Забронировать
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('houses')}>
                  Подробнее
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/bb0e6ca7-5315-4026-be13-6112d9c4a993.jpg"
                alt="Домик у моря"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" size={32} />
                  <div>
                    <p className="font-semibold text-lg">500 метров</p>
                    <p className="text-gray-600">до моря</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="houses" className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши домики</h2>
            <p className="text-xl text-gray-600">4 домика на выбор для вашего отдыха</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house) => (
              <Card key={house.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={house.image} alt={house.title} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl">{house.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        {house.guests} чел
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Home" size={16} />
                        {house.rooms} комн.
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {house.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{feature}</Badge>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-2xl font-bold text-primary">{house.price}₽</p>
                      <p className="text-sm text-gray-600">за сутки</p>
                    </div>
                    <Button onClick={() => scrollToSection('booking')} className="w-full">
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Галерея</h2>
            <p className="text-xl text-gray-600">Посмотрите на нашу территорию и домики</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/21e93386-aff5-4e68-ab01-7de85eeb7d17.jpg"
                alt="Бассейн"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="font-semibold">Бассейн</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/0b5f6a11-cc78-4760-b3f6-03ef5addd690/files/4032a7ae-4a03-4735-b02d-053f917c0408.jpg"
                alt="Беседка-кафе"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="font-semibold">Беседка-кафе</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Услуги и удобства</h2>
            <p className="text-xl text-gray-600">Всё для комфортного отдыха</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-accent to-orange-500 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Специальные предложения</h2>
            <p className="text-xl opacity-90">Экономьте на бронировании в разные сезоны</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {specialOffers.map((offer, idx) => (
              <Card key={idx} className="bg-white text-gray-900 hover:scale-105 transition-transform">
                <CardHeader>
                  <div className={`${offer.color} text-white text-5xl font-bold py-4 rounded-t-lg -mx-6 -mt-6 mb-4 text-center`}>
                    -{offer.discount}
                  </div>
                  <CardTitle className="text-2xl text-center">{offer.period}</CardTitle>
                  <CardDescription className="text-center text-lg">{offer.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Бронирование</h2>
            <p className="text-xl text-gray-600">Выберите домик и даты вашего отдыха</p>
          </div>
          
          <Tabs defaultValue="house1" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {houses.map((house) => (
                <TabsTrigger key={house.id} value={house.id} className="text-sm md:text-base">
                  {house.title.split(' ')[1]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {houses.map((house) => (
              <TabsContent key={house.id} value={house.id}>
                <Card className="p-6 md:p-8">
                  <div className="flex items-start gap-6 mb-8 pb-6 border-b">
                    <img src={house.image} alt={house.title} className="w-32 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{house.title}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Icon name="Users" size={18} />
                          {house.guests} человек
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <Icon name="Home" size={18} />
                          {house.rooms} комнаты
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-primary">{house.price}₽</span>
                        <span className="text-gray-600">/ сутки</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className="block text-sm font-semibold mb-3">Дата заезда</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left h-12">
                            <Icon name="CalendarDays" className="mr-2" size={18} />
                            {bookings[house.id]?.dateFrom ? format(bookings[house.id].dateFrom!, 'PP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookings[house.id]?.dateFrom}
                            onSelect={(date) => setHouseDate(house.id, 'dateFrom', date)}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-3">Дата выезда</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left h-12">
                            <Icon name="CalendarDays" className="mr-2" size={18} />
                            {bookings[house.id]?.dateTo ? format(bookings[house.id].dateTo!, 'PP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookings[house.id]?.dateTo}
                            onSelect={(date) => setHouseDate(house.id, 'dateTo', date)}
                            disabled={(date) => date < (bookings[house.id]?.dateFrom || new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {bookings[house.id]?.dateFrom && bookings[house.id]?.dateTo && (
                    <div className="p-6 bg-sky-50 rounded-lg animate-fade-in">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Количество ночей:</span>
                        <span className="text-2xl font-bold">
                          {differenceInDays(bookings[house.id].dateTo!, bookings[house.id].dateFrom!)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-6 text-xl">
                        <span className="font-medium">Итоговая стоимость:</span>
                        <span className="text-3xl font-bold text-primary">
                          {calculateTotal(house.id, house.price).toLocaleString()}₽
                        </span>
                      </div>
                      <Button size="lg" className="w-full text-lg">
                        <Icon name="Check" className="mr-2" size={20} />
                        Забронировать {house.title}
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="reviews" className="py-16 px-4 bg-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы гостей</h2>
            <p className="text-xl text-gray-600">Что говорят наши гости</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={18} />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-base">{review.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-gray-600">Свяжитесь с нами любым удобным способом</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <CardTitle>Телефон</CardTitle>
                    <CardDescription className="text-lg">+7 (978) 123-45-67</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <CardTitle>Email</CardTitle>
                    <CardDescription className="text-lg">info@sea-coast.ru</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <div>
                    <CardTitle>Адрес</CardTitle>
                    <CardDescription className="text-lg">
                      Республика Крым, Сакский район, село Витино, улица Пальмовая, 777
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Home" size={32} />
            <span className="text-2xl font-bold">Морской Берег</span>
          </div>
          <p className="text-gray-400 mb-2">
            Трехкомнатные домики посуточно у моря в Крыму
          </p>
          <p className="text-gray-500 mb-6">
            село Витино, улица Пальмовая, 777
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Phone" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="Mail" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Icon name="MessageCircle" size={24} />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 Морской Берег. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
