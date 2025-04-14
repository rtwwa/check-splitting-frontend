import React, { useState } from "react";
import CustomerProfile from "./CustomerProfile";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

const Card = ({
  product,
  availableCustomers,
  assignedCustomerIds,
  onCustomerToggle,
  addPlaceholderCustomers,
}) => {
  // n => userCount m => assignedCustomersIds.lenght
  const [userCount, setUserCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualInput, setManualInput] = useState(1);

  const selectedTextStyle = userCount === 0 ? { color: "green" } : {};

  const [clicked, setClicked] = useState({ plus: false, minus: false });

  const handleClick = (type) => {
    if (type === "minus" && manualInput > 1) {
      setManualInput(manualInput - 1);
      setClicked({ ...clicked, minus: true });
      setTimeout(() => setClicked({ ...clicked, minus: false }), 200);
    }
    if (type === "plus") {
      setManualInput(manualInput + 1);
      setClicked({ ...clicked, plus: true });
      setTimeout(() => setClicked({ ...clicked, plus: false }), 200);
    }
  };

  const pricePerPerson =
    assignedCustomerIds.length > 0
      ? product.price *
        product.numberServings *
        (assignedCustomerIds.length / userCount)
      : product.price * product.numberServings;

  const handleSave = () => {
    const num = parseInt(manualInput, 10);

    if ((!isNaN(num) && num < 1) || num > 128) return;

    if (availableCustomers.length < num) {
      const toAdd = num - availableCustomers.length;
      addPlaceholderCustomers(availableCustomers, toAdd);
    }

    setUserCount(num);
    setIsModalOpen(false);
  };

  return (
    // Отрисовка самой карточки
    <div
      className="max-w-xl my-1 p-4 rounded-md border-gray-200 border-2 flex flex-col gap-3"
      onClick={() => {
        if (!isModalOpen && userCount === 0) {
          setIsModalOpen(true);
        }
      }}
    >
      <div
        className="flex justify-between items-center"
        style={selectedTextStyle}
      >
        <h3 className="font-semibold flex gap-1">
          {product.name}
          <span
            onClick={() => {
              if (userCount > 0) setIsModalOpen(true);
            }}
          >
            {userCount > 0 && (
              <MdOutlineEdit className="hover:cursor-pointer text-md" />
            )}
          </span>
        </h3>
        <h3 className="text-lg font-medium">
          {product.numberServings > 1 ? `${product.numberServings} x ` : ""}
          {product.price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h3>
      </div>

      {/* Раздел выбора клиента */}
      {userCount > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Кто заказывал:</p>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {availableCustomers.slice(0, userCount).map((customer) => (
              <CustomerProfile
                key={customer.id}
                customer={customer}
                isSelected={assignedCustomerIds.includes(customer.id)}
                onClick={() => onCustomerToggle(product.name, customer.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Модалка */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Сколько человек участвуют?
            </h2>
            <div className="flex justify-center gap-6">
              <div
                className={`text-4xl text-green-600 cursor-pointer transition-transform ${
                  clicked.minus ? "animate-click-scale" : ""
                }`}
                onClick={() => handleClick("minus")}
              >
                -
              </div>
              <input
                type="number"
                autoFocus
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="w-[50%] text-2xl text-center border-b-2 border-gray-400 focus:outline-none mb-6"
              />
              <div
                className={`text-4xl text-green-600 cursor-pointer transition-transform ${
                  clicked.plus ? "animate-click-scale" : ""
                }`}
                onClick={() => handleClick("plus")}
              >
                +
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Отображение цены на человека */}
      {assignedCustomerIds.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
          <IoPricetagsOutline />
          <span>
            Вы заплатите:{" "}
            {pricePerPerson.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      )}

      {/* Отображение общей суммы по позиции, если больше кол-во больше одного */}
      {product.numberServings > 1 && (
        <p className="text-sm text-right font-medium" style={selectedTextStyle}>
          Итого:{" "}
          {product.total.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </p>
      )}
    </div>
  );
};

export default Card;
