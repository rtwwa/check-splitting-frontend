import React from "react";

const FinalCheck = ({ positionsInfo }) => {
  let totalPrice = 0;

  return (
    <div>
      {totalPrice > 0 && (
        <h4 className="text-md font-semibold mb-2">Итого по позициям:</h4>
      )}
      <ul>
        {Object.entries(positionsInfo).map(([positionName, info]) => {
          const totalPriceForPosition =
            info.clients > 0 && info.payingClients > 0
              ? info.price * info.count * (info.payingClients / info.clients)
              : 0;

          totalPrice += totalPriceForPosition;

          if (info.clients > 0) {
            return (
              <li key={positionName} className="flex flex-col py-2 border-b">
                <div className="flex justify-between">
                  <span>{positionName}</span>
                  <span>{info.count} шт.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Участников: {info.clients}
                  </span>
                  <span className="text-sm text-gray-600">
                    Платят: {info.payingClients}
                  </span>
                </div>

                {totalPriceForPosition > 0 && (
                  <div className="flex justify-end mt-1">
                    <span className="font-semibold">
                      Итого:{" "}
                      {totalPriceForPosition.toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}
              </li>
            );
          }
        })}
        {totalPrice > 0 && (
          <>
            <div className="font-semibold text-xl">
              <span>
                К оплате:{" "}
                <span className="text-green-600">
                  {totalPrice.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "https://www.sberbank.com/sms/pbpn?requisiteNumber=your_num_here";
                }}
                className="hover:cursor-pointer hover:text-green-600 transition-colors duration-150"
              >
                Перевести через СБП
              </button>

              <button className="hover:cursor-pointer hover:text-green-600 transition-colors duration-150">
                Оплатить улыбкой
              </button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default FinalCheck;
