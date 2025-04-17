import axios from "axios";
import React, { useEffect, useState } from "react";
import PhonePrompt from "./PhonePrompt";

const Camera = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (photo) => {
    if (!photo) return;

    const formData = new FormData();

    try {
      setUploading(true);
      // formData.append("photo", photo);

      // const res = await axios.post("https://localhost:8080/get-image", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     const percent = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total
      //     );
      //     setMessage(`Загрузка: ${percent}%`);
      //   },
      // });

      setMessage("Файл успешно загружен!");
      setSuccess(true);
      setShowPhonePrompt(true);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      setMessage("Ошибка при загрузке файла");
      setSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (photo) {
      handleUpload(photo);
    }
  }, [photo]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-xl w-full max-w-md mx-auto text-gray-500">
      <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl w-full h-48 transition duration-300 hover:border-blue-500 hover:text-blue-500">
        {preview ? (
          <img
            src={preview}
            alt="Captured"
            className="w-full h-48 object-cover rounded-xl border"
          />
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleInput}
              className="hidden"
            />
            <span>Сделайте фото чека</span>
          </>
        )}
      </label>

      {!preview && (
        <button
          type="button"
          className="hover:text-blue-500 duration-300 transition-colors cursor-pointer"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <span>Или загрузите фото с устройства</span>
        </button>
      )}

      {message && (
        <p
          className={`text-sm text-center ${
            success ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {showPhonePrompt && <PhonePrompt onSuccess={() => {}} />}
    </div>
  );
};

export default Camera;
