'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CatalogRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CatalogRequestModal = ({ isOpen, onClose }: CatalogRequestModalProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

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
    const nameValid = validateName(name);
    const phoneValid = validatePhone(phone);
    if (!phoneValid) return setError('Пожалуйста, укажите корректный российский номер телефона');
    if (!nameValid) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, material: 'Каталог', area: '-', finish: '-', finance: '-' }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setPhone('');
    setName('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8 md:p-10 flex flex-col items-center">
          <div className="w-full flex justify-center mb-6">
            <Image src="/images/katalog.png" alt="Каталог проектов" width={320} height={120} className="object-contain rounded-lg shadow-md" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Укажите контакты</h2>
          <p className="text-gray-500 text-center mb-8">И мы отправим каталог проектов на WhatsApp</p>

          {!success ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={e => {
                  let val = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setPhone(val);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold mt-2 disabled:opacity-60"
              >
                {loading ? 'Отправка...' : 'Хочу проект'}
              </button>
              {error && (
                <div className="bg-red-500 text-white text-center py-3 px-4 rounded-lg flex items-center justify-center min-h-[48px] md:min-h-[40px] md:text-base text-sm whitespace-pre-line mt-2">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                  <span className="block w-full break-words">{error}</span>
                </div>
              )}
            </form>
          ) : (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              <div className="bg-green-100 rounded-2xl p-6 mb-8 flex items-center shadow-lg w-full">
                <CheckCircle className="w-10 h-10 text-green-600 mr-4 flex-shrink-0" />
                <span className="text-green-700 text-lg md:text-xl font-semibold leading-snug text-left">
                  Спасибо! Данные успешно отправлены.
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-blue-800 text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors text-lg font-semibold shadow-md"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogRequestModal; 