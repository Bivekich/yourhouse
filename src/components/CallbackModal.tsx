'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal = ({ isOpen, onClose }: CallbackModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
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
    if (!validateName(name)) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    if (!validatePhone(phone)) return setError('Пожалуйста, укажите корректный российский номер телефона');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, material: 'Звонок' }),
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

  const closeModal = () => {
    setName('');
    setPhone('');
    setMessage('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Заказать звонок
        </h2>

        {!success ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
            <textarea
              placeholder="Ваше сообщение (необязательно)"
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
                Спасибо! Данные успешно отправлены.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallbackModal; 