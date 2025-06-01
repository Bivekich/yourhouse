import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    if (!(digits.startsWith('7') || digits.startsWith('8'))) return false;
    if (/^(7|8)0{10}$/.test(digits)) return false;
    return true;
  };

  const validateName = (value: string) => {
    return /^[А-Яа-яA-Za-zЁё\-]{2,}$/.test(value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateName(name)) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    if (!validatePhone(phone)) return setError('Пожалуйста, укажите корректный российский номер телефона');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, material: 'Контакты', area: '-', finish: '-', finance: '-', message }),
      });
      if (res.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection as="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Наши контакты
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeInSection as="div" delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Телефон
                  </h3>
                  <a
                    href="tel:+79672123132"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    +7 (967) 212-31-32
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:sksdstroy@yandex.ru"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    sksdstroy@yandex.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Адрес
                  </h3>
                  <p className="text-gray-600">
                    Чувашская республика, г. Чебоксары,<br />
                    ул. Пирогова, 1 корп. 3, 428034
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Реквизиты
              </h3>
              <p className="text-gray-600">
                ИП Степанов Денис Сергеевич<br />
                ИНН 212306083987
              </p>
            </div>
          </FadeInSection>

          <FadeInSection as="div" className="bg-gray-50 p-6 rounded-lg" delay={0.4}>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Отправить сообщение
            </h3>
            {!success ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Ваш телефон"
                    value={phone}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setPhone(val);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Ваше сообщение"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                {error && (
                  <div className="bg-red-500 text-white text-center py-3 px-4 rounded-lg flex items-center justify-center min-h-[48px] md:min-h-[40px] md:text-base text-sm whitespace-pre-line">
                    <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                    <span className="block w-full break-words">{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60"
                >
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                <div className="bg-green-100 rounded-2xl p-4 mb-6 flex items-center shadow-lg w-full">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
                  <span className="text-green-700 text-lg font-semibold leading-snug text-left">
                    Спасибо! Ваше сообщение успешно отправлено.
                  </span>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 