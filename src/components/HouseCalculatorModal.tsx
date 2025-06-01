'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const materials = [
  { label: 'Кирпич/керамический блок', value: 'brick', img: '/images/keramic.jpg' },
  { label: 'Газобетон', value: 'aerated', img: '/images/gazobet.png' },
  { label: 'Керамзитобетон', value: 'claydite', img: '/images/keramiz.jpg' },
];

const areas = [
  '80-100 кв.м.',
  '100-150 кв.м.',
  '150-200 кв.м.',
  'более 200 кв.м.',
];

const finishes = [
  'Без отделки',
  'Черновая отделка (стяжка, штукатурка и тд)',
  'Чистовая отделка (обои, ламинат и тд)',
];

const finances = [
  'Наличные',
  'Сельская ипотека',
  'Ипотека, кредит',
  'Свой вариант',
];

interface HouseCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HouseCalculatorModal = ({ isOpen, onClose }: HouseCalculatorModalProps) => {
  const [step, setStep] = useState(1);
  const [material, setMaterial] = useState('');
  const [area, setArea] = useState('');
  const [finish, setFinish] = useState('');
  const [finance, setFinance] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    setError('');
    if (step === 1 && !material) return setError('Выберите материал');
    if (step === 2 && !area) return setError('Выберите площадь');
    if (step === 3 && !finish) return setError('Выберите вариант отделки');
    if (step === 4 && !finance) return setError('Выберите источник финансирования');
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep((s) => s - 1);
  };

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
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, material, area, finish, finance }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка отправки. Попробуйте позже.');
    }
  };

  const closeModal = () => {
    setStep(1);
    setMaterial('');
    setArea('');
    setFinish('');
    setFinance('');
    setPhone('');
    setName('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Закрыть калькулятор"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <span className="text-gray-500 text-xs sm:text-sm">Для расчета стоимости выберите один из вариантов</span>
            <span className="text-gray-500 text-xs sm:text-sm">{step}/5</span>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded mb-6 sm:mb-8">
            <div className="h-1 bg-blue-600 rounded transition-all" style={{ width: `${(step-1)*25}%` }} />
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Из какого материала хотите построить дом?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {materials.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMaterial(m.value)}
                    className={`group border-2 rounded-xl p-3 sm:p-4 flex flex-col items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 relative ${
                      material === m.value ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
                      <Image 
                        src={m.img} 
                        alt={m.label} 
                        fill 
                        className="object-contain rounded-lg"
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 96px"
                      />
                    </div>
                    <span className="text-base sm:text-lg font-medium text-gray-800 text-center">{m.label}</span>
                    {material === m.value && (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 absolute top-2 right-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Какая площадь дома?</h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {areas.map((a) => (
                  <label key={a} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="area"
                      value={a}
                      checked={area === a}
                      onChange={() => setArea(a)}
                      className="accent-blue-600 w-4 h-4 sm:w-5 sm:h-5 mr-3"
                    />
                    <span className="text-base sm:text-lg text-gray-800">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Вариант отделки</h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {finishes.map((f) => (
                  <label key={f} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="finish"
                      value={f}
                      checked={finish === f}
                      onChange={() => setFinish(f)}
                      className="accent-blue-600 w-4 h-4 sm:w-5 sm:h-5 mr-3"
                    />
                    <span className="text-base sm:text-lg text-gray-800">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Источник финансирования</h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {finances.map((f) => (
                  <label key={f} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="finance"
                      value={f}
                      checked={finance === f}
                      onChange={() => setFinance(f)}
                      className="accent-blue-600 w-4 h-4 sm:w-5 sm:h-5 mr-3"
                    />
                    <span className="text-base sm:text-lg text-gray-800">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && !success && (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Заполните поля ниже и мы сообщим вам стоимость дома!</h2>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-base sm:text-lg"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={e => {
                  let val = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setPhone(val);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-base sm:text-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold"
              >
                Рассчитать стоимость
              </button>
            </form>
          )}

          {success && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 animate-fadeIn">
              <div className="bg-green-100 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex items-center shadow-lg w-full max-w-xl mx-auto">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-green-700 text-base sm:text-lg md:text-xl font-semibold leading-snug text-left">
                  Благодарим за обращение в нашу компанию!<br className='hidden md:block' /> В течение 15 минут мы свяжемся с вами!
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold shadow-md"
              >
                Закрыть
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 sm:mt-6 bg-red-500 text-white text-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center min-h-[40px] sm:min-h-[48px] text-sm sm:text-base whitespace-pre-line">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
              <span className="block w-full break-words">{error}</span>
            </div>
          )}

          <div className="flex justify-between mt-6 sm:mt-8">
            {step > 1 && step < 5 && (
              <button
                onClick={handlePrev}
                className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 rounded-full hover:bg-gray-300 transition-colors text-sm sm:text-base font-medium"
              >
                ← Назад
              </button>
            )}
            {step < 5 && (
              <button
                onClick={handleNext}
                className="ml-auto bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
              >
                Далее →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCalculatorModal; 