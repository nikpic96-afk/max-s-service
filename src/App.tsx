import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Settings, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Upload, 
  Send, 
  Sparkles, 
  AlertCircle, 
  HelpCircle,
  Menu,
  X,
  Package,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { PRODUCTS, ProductItem } from './data/products.ts';

export default function App() {
  // Navigation & UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'parts' | 'food' | 'warehouse'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Modal state
  const [modalType, setModalType] = useState<'engineer' | 'parts' | 'quote' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Smart Diagnostics Assistant state
  const [diagType, setDiagType] = useState<'food' | 'warehouse'>('food');
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Symptoms data for smart diagnosis
  const foodSymptoms = [
    {
      title: 'Печь не набирает заданную температуру',
      cause: 'Выход из строя ТЭНа, обрыв термопары или залипание контактора.',
      action: 'Необходима замена ТЭНа или проверка силовой цепи. ТЭНы и контакторы в наличии на складе в Краснодаре.',
      partRecommendation: 'Тэны, Контакторы'
    },
    {
      title: 'Тестомес сильно вибрирует или шумит редуктор',
      cause: 'Износ опорных подшипников, ослабление приводной цепи или выработка манжеты.',
      action: 'Срочная замена подшипников и уплотнений во избежание заклинивания чаши и поломки двигателя.',
      partRecommendation: 'Подшипники, Манжеты, Смазка цепей'
    },
    {
      title: 'Мясорубка «мнет» мясо, перегревается горловина',
      cause: 'Затупление или выработка комплекта ножей и решеток.',
      action: 'Замена режущего инструмента на оригинальный комплект ножей и решеток соответствующего диаметра.',
      partRecommendation: 'Ножи для мясорубок, Решетки для мясорубок'
    },
    {
      title: 'Пар выходит из-под двери пароконвектомата',
      cause: 'Износ или термическая деформация силиконового жаропрочного уплотнителя.',
      action: 'Замена контурного уплотнителя двери и регулировка прижима замка.',
      partRecommendation: 'Жаропрочные стекла для печей, Уплотнители'
    }
  ];

  const warehouseSymptoms = [
    {
      title: 'Электропогрузчик/штабелер медленно поднимает мачту',
      cause: 'Низкий уровень гидравлического масла, износ манжет гидроцилиндра или насоса.',
      action: 'Диагностика гидросистемы, замена сальников/манжет, долив сертифицированной жидкости.',
      partRecommendation: 'Манжеты, Сальники, Смазка консистентная'
    },
    {
      title: 'Техника не держит заряд или выключается под нагрузкой',
      cause: 'Сульфатация элементов тяговой АКБ, падение плотности электролита.',
      action: 'Замер остаточной емкости банок, десульфатация, замена неисправных элементов или долив дистиллята.',
      partRecommendation: 'Вода дистиллированная 5л'
    },
    {
      title: 'Появился люфт или стук в ходовых колесах',
      cause: 'Разрушение ступичного подшипника или износ полиуретанового бандажа колеса.',
      action: 'Срочная замена колеса или подшипника для исключения повреждения поворотного кулака.',
      partRecommendation: 'Подшипники, Колесо Mecanum'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setModalType(null);
      setSelectedProduct(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Bar with Emergency & Service Contacts */}
      <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Аварийная служба 24/7 по Краснодару и ЮФО
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              г. Краснодар, ул. Васнецова, 39
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href="mailto:rewers2005@mail.ru" 
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              rewers2005@mail.ru
            </a>
            <a 
              href="tel:+79180442481" 
              className="flex items-center gap-1.5 text-white font-bold hover:text-amber-400 transition-colors bg-slate-800 py-1 px-3 rounded-full"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              +7 (918) 044-24-81
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                МАКСИС <span className="text-xs bg-slate-900 text-amber-400 px-2 py-0.5 rounded font-mono font-semibold">SERVICE</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Сервис пищевого и складского оборудования</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#services" className="hover:text-amber-600 transition-colors">Услуги и ТО</a>
            <a href="#diagnostics" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Онлайн-диагностика
            </a>
            <a href="#catalog" className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
              <span>Запчасти и ЗИП</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">74 шт.</span>
            </a>
            <a href="#parts-request" className="hover:text-amber-600 transition-colors">Подбор по шильдику</a>
            <a href="#faq" className="hover:text-amber-600 transition-colors">Вопросы</a>
            <a href="#contacts" className="hover:text-amber-600 transition-colors">Контакты</a>
          </nav>

          {/* Call-to-action button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setModalType('engineer')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 text-sm"
            >
              <Wrench className="w-4 h-4" />
              Вызвать инженера
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-amber-600"
            >
              Услуги и ремонт
            </a>
            <a 
              href="#diagnostics" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-amber-600"
            >
              Онлайн-диагностика
            </a>
            <a 
              href="#catalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-amber-600"
            >
              Каталог запчастей (74 позиции)
            </a>
            <a 
              href="#parts-request" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-amber-600"
            >
              Подбор запчасти по шильдику
            </a>
            <a 
              href="#contacts" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-amber-600"
            >
              Контакты и схема проезда
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalType('engineer');
                }}
                className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl shadow text-center"
              >
                Вызвать инженера
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24">
          {/* Subtle background industrial pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Официальный сервис и поставка комплектующих в Краснодаре
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Ремонт и обслуживание <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                    пищевого и складского
                  </span> оборудования
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Оперативный выезд сервисных инженеров за 60 минут. Плановое ТО по регламентам заводов-изготовителей. 
                  Собственный склад оригинальных запчастей и проверенных аналогов (Abat, Rational, Mecanum).
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                    <div className="text-amber-400 font-black text-xl">от 60 мин</div>
                    <div className="text-xs text-slate-400 mt-0.5">Срочный выезд по Краснодару и краю</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                    <div className="text-amber-400 font-black text-xl">до 12 мес</div>
                    <div className="text-xs text-slate-400 mt-0.5">Официальная гарантия на работы и ЗИП</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl col-span-2 sm:col-span-1">
                    <div className="text-amber-400 font-black text-xl">НДС 20%</div>
                    <div className="text-xs text-slate-400 mt-0.5">Работа с юрлицами по договору и ЭДО</div>
                  </div>
                </div>

                {/* Hero Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setModalType('engineer')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base"
                  >
                    <Wrench className="w-5 h-5" />
                    Заказать срочный ремонт
                  </button>
                  <a
                    href="#parts-request"
                    className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3.5 rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 text-base"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    Подобрать запчасть по шильдику
                  </a>
                </div>
              </div>

              {/* Hero Right: Quick Status Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      Дежурный инженер на связи
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Онлайн
                    </span>
                  </div>

                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Мобильные сервисные бригады</strong>
                        <span className="text-slate-400 text-xs">Укомплектованы диагностическим оборудованием и ходовым ЗИП</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Ремонт на объекте клиента</strong>
                        <span className="text-slate-400 text-xs">85% поломок устраняются в день обращения без вывоза в цех</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Срочный поиск заказных позиций</strong>
                        <span className="text-slate-400 text-xs">Прямые поставки от заводов России, Китая и Европы</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Прямая горячая линия:</span>
                      <a href="tel:+79180442481" className="text-lg font-bold text-amber-400 hover:underline">
                        +7 (918) 044-24-81
                      </a>
                    </div>
                    <button
                      onClick={() => setModalType('engineer')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg font-medium border border-slate-700 transition"
                    >
                      Заказать звонок
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Smart Diagnostics Assistant */}
        <section id="diagnostics" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Интерактивный помощник
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Экспресс-диагностика поломки онлайн
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Выберите категорию оборудования и симптом неисправности, чтобы узнать вероятную причину и рекомендуемый способ устранения.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
              {/* Category tabs */}
              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={() => {
                    setDiagType('food');
                    setSelectedSymptom(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    diagType === 'food'
                      ? 'bg-slate-900 text-white shadow'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Пищевое оборудование (печи, тестомесы)
                </button>
                <button
                  onClick={() => {
                    setDiagType('warehouse');
                    setSelectedSymptom(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    diagType === 'warehouse'
                      ? 'bg-slate-900 text-white shadow'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Складская техника (погрузчики, платформы)
                </button>
              </div>

              {/* Symptoms options */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wide block">
                  Выберите характер неисправности:
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(diagType === 'food' ? foodSymptoms : warehouseSymptoms).map((sym, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSymptom(sym.title)}
                      className={`text-left p-4 rounded-xl border text-sm transition-all ${
                        selectedSymptom === sym.title
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${selectedSymptom === sym.title ? 'text-amber-600' : 'text-slate-400'}`} />
                        <span>{sym.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diagnosis Output */}
              {selectedSymptom && (
                <div className="mt-6 pt-6 border-t border-slate-200 bg-white rounded-xl p-5 border shadow-sm">
                  {(() => {
                    const currentList = diagType === 'food' ? foodSymptoms : warehouseSymptoms;
                    const item = currentList.find((s) => s.title === selectedSymptom);
                    if (!item) return null;
                    return (
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Вероятная причина:</div>
                          <p className="text-slate-800 text-sm mt-1 font-medium">{item.cause}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Рекомендация инженера:</div>
                          <p className="text-slate-700 text-sm mt-1">{item.action}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-50 text-amber-900 px-3.5 py-2 rounded-lg text-xs font-medium border border-amber-200">
                          <Package className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Требуемые запчасти: <strong>{item.partRecommendation}</strong></span>
                        </div>
                        <div className="pt-2 flex flex-wrap gap-3">
                          <button
                            onClick={() => setModalType('engineer')}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition"
                          >
                            Вызвать мастера на устранение этой поломки
                          </button>
                          <a
                            href="#catalog"
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition"
                          >
                            Посмотреть запчасти в каталоге
                          </a>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section id="services" className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Наши направления</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Комплексное сервисное обслуживание оборудования
              </h2>
              <p className="text-slate-600 mt-2 text-base">
                Предоставляем разовые ремонтные работы и долгосрочное абонентское сопровождение по договору.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service Card 1: Food Equipment */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Пищевое и пекарское оборудование
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ремонт и наладка любого теплового, электромеханического и хлебопекарного оборудования.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Ротационные, подовые и конвекционные печи
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Тестомесы, миксеры, тестораскатки
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Мясорубки, куттеры, слайсеры
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Расстоечные камеры и охладители воды
                    </li>
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setModalType('engineer')}
                    className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 rounded-xl text-sm transition"
                  >
                    Заказать обслуживание пекарен
                  </button>
                </div>
              </div>

              {/* Service Card 2: Warehouse Equipment */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Складская техника и подъемники
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Диагностика, капитальный ремонт гидроузлов, электроники, контроллеров и механики.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Вилочные электропогрузчики (OLM, OLH, OLE)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Гидравлические тележки (рохли) и штабелеры
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Платформы Mecanum и ножничные подъемники
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Замена колес, роликов и обслуживание АКБ
                    </li>
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setModalType('engineer')}
                    className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 rounded-xl text-sm transition"
                  >
                    Заказать ТО погрузчиков
                  </button>
                </div>
              </div>

              {/* Service Card 3: Logistics & Rental */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Аренда техники и грузоперевозки
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Предоставление складской техники в краткосрочную и долгосрочную аренду, а также спецтранспорт.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Аренда самоходных электрических платформ
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Транспортировка тяжелого оборудования с гидробортом
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Перевозка оборудования по Краснодарскому краю и РФ
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Подменный фонд техники на время сложного ремонта
                    </li>
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setModalType('quote')}
                    className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 rounded-xl text-sm transition"
                  >
                    Запросить расчет аренды / доставки
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Catalog Section (74 Items) */}
        <section id="catalog" className="py-16 sm:py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Каталог наличия</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Запасные части, расходники и техника
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Актуальная номенклатура на складе сервисного центра (всего {PRODUCTS.length} позиций)
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по названию или детали..."
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
              <button
                onClick={() => { setActiveCategory('all'); setVisibleCount(12); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Все позиции ({PRODUCTS.length})
              </button>
              <button
                onClick={() => { setActiveCategory('parts'); setVisibleCount(12); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === 'parts'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Запчасти и расходники ({PRODUCTS.filter(p => p.category === 'parts').length})
              </button>
              <button
                onClick={() => { setActiveCategory('food'); setVisibleCount(12); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === 'food'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Пищевое оборудование ({PRODUCTS.filter(p => p.category === 'food').length})
              </button>
              <button
                onClick={() => { setActiveCategory('warehouse'); setVisibleCount(12); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === 'warehouse'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Складская техника ({PRODUCTS.filter(p => p.category === 'warehouse').length})
              </button>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800">Позиция не найдена в текущем списке</h4>
                <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
                  Возможно, нужная вам деталь еще не внесена в каталог. Отправьте нам фото шильдика — найдем по базам поставщиков за 15 минут.
                </p>
                <a
                  href="#parts-request"
                  className="mt-4 inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm"
                >
                  Запросить подбор по фото
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.slice(0, visibleCount).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="h-48 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                        {item.image ? (
                          <img
                            src={item.image.startsWith('/') ? '.' + item.image : item.image}
                            alt={item.title}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // fallback if image fails
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Package className="w-12 h-12 text-slate-300" />
                        )}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                          {item.categoryName}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">
                        <div className="text-[11px] font-semibold text-amber-700 bg-amber-50 inline-block px-2 py-0.5 rounded mb-2">
                          {item.badge}
                        </div>
                        <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Button */}
                    <div className="p-4 sm:p-5 pt-0">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setModalType('quote');
                        }}
                        className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-medium py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>Запросить цену и наличие</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load more button */}
            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl text-sm transition"
                >
                  Показать еще позиции ({filteredProducts.length - visibleCount} осталось)
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Dedicated High-Converting Form: "Подбор запчасти по шильдику" */}
        <section id="parts-request" className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                  <Upload className="w-3.5 h-3.5" />
                  Экспресс-подбор деталей
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Не знаете точный артикул детали?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-2">
                  Прикрепите фото шильдика (заводской таблички) оборудования или самой сломанной детали. 
                  Инженер сервиса найдет номер по каталогу и свяжется с вами в течение 15 минут.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Марка оборудования (бренд)
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Abat, Rational, Mecanum..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Модель и год выпуска
                    </label>
                    <input
                      type="text"
                      placeholder="Например: ПЭМ-2, OLM-20-20, 2019 г."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Серийный номер (если есть)
                    </label>
                    <input
                      type="text"
                      placeholder="Серийный номер с таблички"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Какая деталь требуется
                    </label>
                    <input
                      type="text"
                      placeholder="ТЭН, подшипник, редуктор, манжета..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Upload simulation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Фотография шильдика или детали
                  </label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-900/50">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs text-slate-300 block">
                      Нажмите для выбора фото или перетащите файл (JPG, PNG)
                    </span>
                    <span className="text-[10px] text-slate-500">До 15 МБ</span>
                  </div>
                </div>

                {/* Contact details */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Ваш номер телефона *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      Контактное лицо / Компания
                    </label>
                    <input
                      type="text"
                      placeholder="Имя или название организации"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-xl shadow-lg transition text-base flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Отправить запрос на подбор инженеру
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Конфиденциальность гарантируется.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Corporate & Contract Advantages */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Корпоративным клиентам</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Регулярное ТО снижает риск аварийных остановок на 80%
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Мы заключаем официальные сервисные договоры с хлебозаводами, сетевыми пекарнями, распределительными центрами и складами. Закрепляем персонального инженера, поддерживаем персональный неснижаемый остаток критических запчастей под ваш парк техники.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-slate-900 text-sm">Фиксированная стоимость нормо-часа</strong>
                      <p className="text-slate-500 text-xs">Цены на ТО и запчасти фиксируются в договоре без скрытых наценок</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-slate-900 text-sm">Приоритетный выезд 24/7</strong>
                      <p className="text-slate-500 text-xs">При аварии на пищевом производстве бригада выезжает вне очереди</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-slate-900 text-sm">Работа по безналичному расчету с НДС</strong>
                      <p className="text-slate-500 text-xs">Полный пакет закрывающих документов, акты дефектовки, обмен через Диадок/СБИС</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setModalType('quote')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition"
                  >
                    Запросить типовой договор ТО
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                    Регламент аварийного реагирования:
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Прием заявки и предварительная консультация</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Диспетчер определяет характер неисправности и комплектует выездной автомобиль нужным ЗИП.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Выезд инженера и дефектовка</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Инструментальная диагностика узлов, составление дефектовочной ведомости на месте.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Устранение поломки и пусконаладка</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Замена изношенных деталей, регулировка зазоров, пробный пуск под рабочей нагрузкой.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Выдача гарантийного акта</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Предоставление гарантийного талона и рекомендаций по дальнейшей эксплуатации.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section (Rich for SEO & GEO) */}
        <section id="faq" className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Частые вопросы</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Вопросы и ответы о ремонте и запчастях
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'Как быстро выезжает сервисный инженер после звонка?',
                  a: 'По Краснодару среднее время прибытия дежурного инженера составляет от 60 до 120 минут. Для экстренных случаев на пищевых производствах действует выделенная аварийная линия 24/7. По Краснодарскому краю и ЮФО выезд согласуется индивидуально.'
                },
                {
                  q: 'Оборудование каких брендов вы ремонтируете?',
                  a: 'Мы обслуживаем весь спектр оборудования: отечественные марки (Abat / Чувашторгтехника, Восход, Торгмаш), европейские (Rational, Unox, Fimar, Robot Coupe, Bongard), а также складскую технику ведущих китайских и мировых производителей (Mecanum, Noblelift, Heli, Jungheinrich, Linde, EP Equipment).'
                },
                {
                  q: 'Как заказать деталь, если на ней нет номера или стерлась бирка?',
                  a: 'Воспользуйтесь нашей формой «Подбор по шильдику» или пришлите фото общего вида оборудования и сломанной детали в WhatsApp/Telegram. Наши инженеры работают по официальным сервисным взрыв-схемам (деталировкам) заводов и идентифицируют узел по году и серии машины.'
                },
                {
                  q: 'Какая гарантия предоставляется на выполненные работы и запчасти?',
                  a: 'На все виды ремонтных и монтажных работ предоставляется гарантия от 3 до 12 месяцев. На поставляемые запасные части действует заводская гарантия производителя.'
                },
                {
                  q: 'Работаете ли вы с НДС и оформляете ли договор?',
                  a: 'Да, компания «Максис» работает по безналичному расчету с НДС 20%. Мы оформляем договоры разового обслуживания, договоры регулярного ТО, предоставляем полные акты дефектовки и счета-фактуры. Возможен документооборот через ЭДО.'
                }
              ].map((faq, idx) => (
                <div 
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-600' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 sm:p-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section id="contacts" className="py-16 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Контакты сервиса</span>
                <h2 className="text-3xl font-black tracking-tight">
                  Компания «Максис»
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Центральный сервисный центр, ремонтный цех и склад запасных частей в Краснодаре. 
                  Принимаем технику в цеховой ремонт или направляем выездные бригады на ваше предприятие.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-white text-sm">Адрес сервиса и склада:</div>
                      <div className="text-slate-300 text-sm">Россия, г. Краснодар, ул. Васнецова, д. 39</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-white text-sm">Круглосуточная диспетчерская:</div>
                      <a href="tel:+79180442481" className="text-amber-400 font-bold text-lg hover:underline">
                        +7 (918) 044-24-81
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-white text-sm">Отдел снабжения и заявок:</div>
                      <a href="mailto:rewers2005@mail.ru" className="text-slate-300 text-sm hover:underline">
                        rewers2005@mail.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-white text-sm">Режим работы:</div>
                      <div className="text-slate-300 text-xs">Пн-Пт: 08:00 – 18:00 | Сб-Вс: 09:00 – 16:00</div>
                      <div className="text-amber-400 text-xs mt-0.5">Аварийная выездная служба работает 24/7 без выходных</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="https://max-s.ru/llms.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Спецификация для нейросетей (llms.txt)
                  </a>
                </div>
              </div>

              {/* Map/Contact Card */}
              <div className="lg:col-span-7">
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Направить заявку на обслуживание</h3>
                    <p className="text-slate-400 text-xs mb-6">
                      Оставьте ваш номер, и дежурный инженер свяжется с вами для уточнения деталей поломки.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Ваше имя / Компания"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Опишите оборудование и поломку (например: пароконвектомат Abat, не включается нагрев)..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      ></textarea>

                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Связаться с инженером прямо сейчас
                      </button>
                    </form>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                    <div>© 2026 Компания «Максис» (max-s.ru). Все права защищены.</div>
                    <div className="flex gap-4">
                      <span>г. Краснодар</span>
                      <span>ИНН / ОГРН по запросу</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Universal Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => {
                setModalType(null);
                setSelectedProduct(null);
              }}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Заявка успешно принята!</h3>
                <p className="text-slate-600 text-sm">
                  Дежурный инженер сервисного центра свяжется с вами по указанному телефону в течение нескольких минут.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
                    {modalType === 'engineer' ? 'Аварийный выезд' : 'Запрос информации'}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {modalType === 'engineer' && 'Вызов сервисного инженера'}
                    {modalType === 'parts' && 'Запрос на подбор запасной части'}
                    {modalType === 'quote' && (selectedProduct ? `Запрос: ${selectedProduct.title}` : 'Запрос коммерческого предложения')}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    {modalType === 'engineer' 
                      ? 'Оставьте контакты для срочной отправки дежурной бригады по Краснодару и краю.'
                      : 'Уточним точную цену, срок поставки и наличие на складе.'}
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Ваше имя или организация *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Иван / ООО Пекарня №1"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Номер телефона *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                    />
                  </div>

                  {modalType === 'engineer' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Адрес объекта и тип поломки
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Адрес (г. Краснодар, ул. ...) и кратко суть неисправности"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                      ></textarea>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl shadow transition text-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Подтвердить отправку
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
