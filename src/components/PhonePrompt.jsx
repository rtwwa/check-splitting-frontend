import React, { useState } from "react";
import axios from "axios";

const PhonePrompt = ({ onComplete }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!phone) {
      setError("Введите номер телефона");
      return;
    }

    try {
      await axios.post("https://localhost:8080/send-phone", { phone });
      onComplete?.("sent");
    } catch (err) {
      console.error("Ошибка при отправке номера:", err);
      setError("Не удалось отправить номер. Попробуйте позже.");
    }
  };

  const handleSkip = () => {
    onComplete?.("skipped");
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center mt-2">
      <p className="text-sm text-center text-gray-600">
        Хотите получить ссылку на СБП?
      </p>

      <input
        type="tel"
        placeholder="+7 (___) ___-__-__"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex gap-2 w-full">
        <button
          onClick={handleSend}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Отправить номер
        </button>

        <button
          onClick={handleSkip}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Пропустить
        </button>
      </div>
    </div>
  );
};

export default PhonePrompt;
