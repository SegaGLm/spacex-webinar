import { type FormEvent, useState } from 'react';
import { Rocket, Users, TrendingUp, Satellite, Brain, Server, ChevronRight, Calendar, Globe } from 'lucide-react';
import mindMoneyLogo from '../assets/logo.jpg';

const personalDataPolicyUrl = './assets/Politika-v-otnoshenii-obrabotki-pd.docx';

const leadsWebhookUrl =
  'https://script.google.com/macros/s/AKfycbz7QM7DhrccQApFwPjBpqE3imPUGFCyDIdhoaL6_f4jo3QqItMwSapUAs7s1v_u8Vic/exec';

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  };
}

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') || '').trim(),
      page: window.location.href,
      ...getUtmParams(),
    };

    try {
      await fetch(leadsWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      form.reset();
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/85 shadow-sm shadow-sky-900/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img
              src={mindMoneyLogo}
              alt="Mind Money"
              className="h-9 w-auto max-w-[220px] object-contain sm:h-11 sm:max-w-[280px]"
            />
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#program" className="transition-colors hover:text-blue-700">Программа</a>
            <a href="#speaker" className="transition-colors hover:text-blue-700">Спикер</a>
            <a href="#ecosystem" className="transition-colors hover:text-blue-700">Экосистема</a>
            <a href="#register" className="transition-colors hover:text-blue-700">Регистрация</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-100 via-white to-blue-100">
        <div className="space-stars" aria-hidden="true" />
        <div className="space-stars space-stars-delayed" aria-hidden="true" />
        <div className="absolute right-[-120px] top-24 hidden h-[430px] w-[430px] rounded-full border border-white/70 bg-blue-500/10 blur-0 md:block" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-4">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 shadow-sm">Бесплатно</span>
              <span className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-blue-700 shadow-sm">
                <Calendar className="h-4 w-4" />
                12 мая
              </span>
              <span className="flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sky-700 shadow-sm">
                <Globe className="h-4 w-4" />
                Онлайн
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-semibold tracking-tight text-blue-950 md:text-7xl">
              Вебинар:<br /> SpaceX Pre-IPO
            </h1>

            <p className="mb-4 text-xl text-blue-900/75 md:text-2xl">
              SpaceX Pre-IPO: частный доступ к одной из самых ожидаемых сделок года
            </p>

            <p className="mb-4 text-2xl text-slate-900 md:text-3xl">
              Вход в SpaceX до публичного размещения: цена, объём, структура, риски.
            </p>

            <p className="mb-8 max-w-4xl text-lg leading-relaxed text-slate-700">
              Закрытый вебинар для опытных инвесторов о том, как устроено участие в Pre-IPO SpaceX и почему ранний вход может быть интереснее ожидания классического IPO.
            </p>

            <p className="mb-10 max-w-4xl text-slate-700">
              На вебинаре покажем, сколько на самом деле зарабатывает SpaceX, разберём скрытую экономику её подразделений и объясним механику внебиржевых (Pre-IPO) сделок: как устроен доступ к технологическим гигантам до их выхода на биржу.
            </p>

            <a href="#register" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-8 py-4 text-lg text-white shadow-lg shadow-blue-700/20 transition-colors hover:bg-blue-800">
              Записаться на вебинар
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>

          <div className="relative hidden min-h-[420px] lg:block" aria-hidden="true">
            <div className="orbit orbit-large">
              <Rocket className="orbit-object h-9 w-9 text-blue-700" />
            </div>
            <div className="orbit orbit-small">
              <Satellite className="orbit-object h-8 w-8 text-sky-700" />
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-2xl shadow-blue-900/15 ring-1 ring-blue-100">
              <Rocket className="h-20 w-20 text-blue-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-4xl font-semibold text-blue-950">О чём расскажем на вебинаре</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm transition-colors hover:border-blue-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Rocket className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Экосистема Маска и синергия компаний</h3>
              <p className="text-slate-600">SpaceX, Starlink, xAI, X - как они работают как единая инфраструктура и в чем ее фундаментальная ценность.</p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm transition-colors hover:border-blue-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Satellite className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Скрытый потенциал Starlink</h3>
              <p className="text-slate-600">$11,4 млрд выручки и $4,4 млрд операционной прибыли в 2025 году. Разберём, почему спутниковая связь - главный драйвер оценки SpaceX перед IPO.</p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm transition-colors hover:border-blue-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
                <Server className="h-6 w-6 text-cyan-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Космические дата-центры - новая эра инфраструктуры</h3>
              <p className="text-slate-600">Как орбитальные вычисления могут стать стратегическим преимуществом SpaceX перед AI-конкурентами.</p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm transition-colors hover:border-blue-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                <TrendingUp className="h-6 w-6 text-indigo-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Глубокий анализ рисков</h3>
              <p className="text-slate-600">Структурные, регуляторные, технологические и рыночные риски — без прикрас.</p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-blue-50 p-6 shadow-sm transition-colors hover:border-blue-200 md:col-span-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Brain className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Механика Pre-IPO рынка</h3>
              <p className="text-slate-600">Как работают сделки через SPV, что такое аллокация, lock-up и чем внебиржевой рынок отличается от классического IPO.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Section */}
      <section id="speaker" className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-4xl font-semibold text-blue-950">О спикере вебинара</h2>

          <div className="flex flex-col items-center gap-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-900/5 md:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-700/20">
              <Users className="h-16 w-16" />
            </div>

            <div>
              <h3 className="mb-4 text-3xl font-semibold text-slate-900">Игорь Юров</h3>
              <p className="mb-4 text-slate-700">
                Профессиональный трейдер и инвестор с 10-летним стажем. С 2014 года специализируется на фондовом рынке США, уделяя особое внимание высокотехнологичным компаниям из индекса Nasdaq.
              </p>
              <p className="text-slate-600">
                На вебинаре Игорь объяснит, как профессиональные участники рынка оценивают SpaceX до IPO и на какие фундаментальные факторы стоит обратить внимание при анализе подобных активов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-6 text-4xl font-semibold text-blue-950">Экосистема Маска</h2>
          <p className="mb-12 max-w-3xl text-slate-600">
            Видение Маска выходит далеко за рамки отдельных индустрий. Его глобальная цель — мультипланетарное будущее человечества. Каждый элемент экосистемы служит топливом для другого.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Rocket className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">SpaceX — Транспорт</h3>
              <p className="mb-4 text-slate-700">Доминирующая сила в коммерческих запусках. Снижение стоимости доставки грузов на орбиту в десятки раз.</p>
              <div className="mb-2 text-sm text-slate-500">165 орбитальных запусков в 2025 году - около 85% всех американских запусков</div>
              <div className="text-2xl font-semibold text-blue-700">Оценка: $1,75 трлн+</div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-sky-50 to-white p-8 shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
                <Satellite className="h-8 w-8 text-sky-700" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">Starlink — Связь</h3>
              <p className="mb-4 text-slate-700">Глобальная спутниковая сеть. Главный драйвер выручки SpaceX и потенциальный кандидат на самостоятельное IPO.</p>
              <div className="mb-2 space-y-1 text-sm text-slate-500">
                <div>Выручка 2025: $11,4 млрд</div>
                <div>Операционная прибыль: $4,4 млрд</div>
                <div>Пользователей: 10 млн+</div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-cyan-50 to-white p-8 shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                <Brain className="h-8 w-8 text-cyan-700" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">xAI — Искусственный интеллект</h3>
              <p className="mb-4 text-slate-700">После поглощения xAI компанией SpaceX — разработка передового ИИ стала частью единой инфраструктурной истории.</p>
              <div className="mb-2 text-sm text-slate-500">Интеграция: X, Tesla, Starlink</div>
              <div className="text-2xl font-semibold text-cyan-700">Оценка на момент сделки: $250 млрд</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-xl shadow-blue-900/5">
            <h2 className="mb-6 text-4xl font-semibold text-blue-950">Кто такой Илон Маск и что он хочет сделать</h2>
            <p className="mb-4 text-lg leading-relaxed text-slate-700">
              Видение Маска выходит далеко за рамки отдельных индустрий. Его глобальная цель - мультипланетарное будущее человечества. Для её достижения он выстраивает взаимосвязанную экосистему проектов, где каждый элемент служит топливом для другого.
            </p>
            <p className="leading-relaxed text-slate-600">
              Starlink обеспечивает глобальную связь, xAI разрабатывает интеллект для управления сложными системами, а Starship становится транспортной артерией этой новой реальности. Именно эта синергия и масштаб амбиций создают фундамент для его потенциального статуса первого в истории триллионера.
            </p>
          </div>
        </div>
      </section>

      {/* Space Data Centers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-4xl font-semibold text-blue-950">Зачем дата-центры запускать в космос</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Сегодня главный потолок для развития ИИ на Земле - это дефицит энергии и ресурсов. Дата-центры забирают колоссальные объемы электричества и воды.
              </p>
              <p className="leading-relaxed text-slate-600">
                Размещение серверов в космосе позволяет полностью снять энергетическую и экологическую нагрузку с земной инфраструктуры. А при снижении стоимости вывода грузов до $200 за килограмм, орбитальные вычисления сравняются по себестоимости с наземными.
              </p>
            </div>

            <div className="flex items-center rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-700 to-sky-500 p-8 text-white shadow-xl shadow-blue-700/15">
              <div className="w-full text-center">
                <Server className="mx-auto mb-4 h-24 w-24 text-white" />
                <p className="text-xl">
                  Тот, кто первым выведет ИИ-инфраструктуру на орбиту, получит независимость от земных ограничений и выиграет глобальную технологическую гонку.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IPO Preparation */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-4xl font-semibold text-blue-950">SpaceX готовится к IPO — Механика рынка</h2>

          <div className="mb-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-900/5">
            <p className="mb-4 text-lg text-slate-700">
              По сообщениям Reuters, SpaceX конфиденциально подала документы на IPO и может выйти на публичный рынок летом 2026 года.
            </p>

            <p className="mb-6 text-slate-600">
              Мы разберем, почему период до официального публичного объявления исторически привлекает повышенное внимание крупного капитала.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="mb-1 text-sm text-slate-500">Обсуждаемая оценка</div>
                <div className="text-2xl font-semibold text-blue-700">~$1,75 трлн</div>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="mb-1 text-sm text-slate-500">Объём размещения</div>
                <div className="text-2xl font-semibold text-sky-700">$50–75 млрд</div>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="mb-1 text-sm text-slate-500">Выручка 2025</div>
                <div className="text-2xl font-semibold text-indigo-700">$18,7 млрд</div>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="mb-1 text-sm text-slate-500">TAM по S-1</div>
                <div className="text-2xl font-semibold text-cyan-700">$28,5 трлн</div>
              </div>
            </div>
          </div>

          <h3 className="mb-6 text-2xl font-semibold text-slate-900">Как меняется рынок перед крупным листингом:</h3>

          <div className="space-y-4">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h4 className="mb-2 text-xl font-semibold text-blue-700">Динамика цен</h4>
              <p className="text-slate-600">Как ожидания публичной оценки влияют на стоимость акций на вторичном частном рынке.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h4 className="mb-2 text-xl font-semibold text-sky-700">Доступность объёмов</h4>
              <p className="text-slate-600">Почему крупные фонды и инсайдеры меняют свои стратегии владения перед выходом на биржу.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h4 className="mb-2 text-xl font-semibold text-cyan-700">Аллокация на IPO</h4>
              <p className="text-slate-600">Как распределяются акции в крупных размещениях и почему спрос часто кратно превышает предложение.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-sky-600 to-blue-500 py-20 text-white">
        <div className="space-stars" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="mb-6 text-center text-4xl font-semibold">Регистрация на вебинар</h2>
          <p className="mb-10 text-center text-blue-50">
            Оставьте данные, чтобы получить ссылку на трансляцию, а также аналитические материалы и презентацию к вебинару.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/30 bg-white p-8 text-slate-900 shadow-2xl shadow-blue-950/20">
            <div className="hidden" aria-hidden="true">
              <label>
                Не заполняйте это поле
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-700">Имя</label>
              <input
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-700">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-700">Телефон</label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <label className="flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-relaxed text-slate-700">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-blue-300 accent-blue-700"
              />
              <span>
                Я даю согласие на{' '}
                <a
                  href={personalDataPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
                >
                  обработку персональных данных
                </a>{' '}
                в соответствии с политикой конфиденциальности
              </span>
            </label>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 text-lg text-white shadow-lg shadow-blue-700/20 transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {formStatus === 'submitting' ? 'Отправляем...' : 'Зарегистрироваться'}
              <ChevronRight className="h-5 w-5" />
            </button>

            {formStatus === 'success' && (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-700">
                Спасибо, заявка отправлена. Мы свяжемся с вами перед вебинаром.
              </p>
            )}

            {formStatus === 'error' && (
              <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 text-center text-sm leading-relaxed text-slate-600">
            <p className="mb-2 font-semibold text-slate-900">© 2026 SpaceX Pre-IPO Webinar. Все права защищены.</p>
            <p>ООО "ЮРИДИЧЕСКАЯ ФИРМА "ХАНДОШКО И ПАРТНЕРЫ"</p>
            <p>ИНН: 7840122656 | КПП: 784001001 | ОГРН 1257800113636</p>
            <p>Юридический адрес: 191014, Российская Федерация, г. Санкт-Петербург, Басков пер., д. 12, лит. И, помещение 1-Н, часть от части помещений № 301</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
