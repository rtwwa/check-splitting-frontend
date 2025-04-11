import React, { useState } from "react";

const Camera = () => {
  const [photo, setPhoto] = useState(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-xl w-full max-w-md mx-auto">
      <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl w-full h-48 hover:border-blue-500 transition">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
        />
        <span className="text-gray-500">Сделайте фото чека</span>
      </label>

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
