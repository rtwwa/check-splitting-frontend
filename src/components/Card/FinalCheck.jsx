import React from "react";

const FinalCheck = ({ check }) => {
  if (!check || check.length === 0) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
        Нет данных для отображения.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Итоговое распределение</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Позиция</th>
            <th className="p-2 border">Количество (n)</th>
            <th className="p-2 border">Выбрали (m)</th>
          </tr>
        </thead>
        <tbody>
          {check.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="p-2 border">{item.position}</td>
              <td className="p-2 border">{item.n}</td>
              <td className="p-2 border">{item.m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalCheck;
