import React, { useState } from "react";

const Camera = () => {
  const [photo, setPhoto] = useState(null);

  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-xl w-full max-w-md mx-auto text-gray-500">
      <label
        className="
      cursor-pointer flex flex-col
      items-center justify-center
      border-2 border-dashed 
      border-gray-300 rounded-xl 
      w-full h-48 transition duration-300
      hover:border-blue-500
      hover:text-blue-500"
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleInput}
          className="hidden"
        />
        <span>Сделайте фото чека</span>
      </label>

      <div>
        <button
          tabIndex={0}
          type="button"
          className="hover:text-blue-500 duration-300 transition-colors cursor-pointer"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <span>Или загрузите фото с устройства</span>
        </button>
      </div>

      {photo && (
        <img
          src={photo}
          alt="Captured"
          className="w-full h-48 object-cover rounded-xl border"
        />
      )}
    </div>
  );
};

export default Camera;
