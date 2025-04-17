import React, { useState, useEffect } from "react";
import fakeApi from "../api/fakeApi";
import CustomerManager from "../api/CustomerManager";
import Card from "./card/Card";
import FinalCheck from "./Card/FinalCheck";

const OrderAssignment = () => {
  const [products, setProducts] = useState([]);
  const [totalCustomersArray, setTotalCustomersArray] = useState([]);
  const [positionsInfo, setPositionsInfo] = useState([]);
  const [selectedCustomersPerPosition, setSelectedCustomersPerPosition] =
    useState([]);
  const [error, setError] = useState(null);

  const [customerManager] = useState(() => new CustomerManager());

  useEffect(() => {
    async function fetchData() {
      try {
        const initialOrderData = await fakeApi.getCheck(1);
        setProducts(initialOrderData.products);

        const initialPositionInfo = {};
        initialOrderData.products.forEach((product) => {
          initialPositionInfo[product.name] = {
            price: product.price,
            count: product.numberServings,
            clients: 0,
            payingClients: 0,
          };
        });

        const initialSelectedCustomersPerPosition = {};
        initialOrderData.products.forEach((product) => {
          initialSelectedCustomersPerPosition[product.name] = [];
        });

        setPositionsInfo(initialPositionInfo);

        console.log(initialPositionInfo);
      } catch (err) {
        setError("Не удалось инициализировать данные");
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const handleCustomerToggle = (productIdentifier, customerId) => {
    setSelectedCustomersPerPosition((prev) => {
      const currentState = prev[productIdentifier] || [];
      const isSelected = currentState.includes(customerId);

      let updatedState;
      if (isSelected) {
        updatedState = currentState.filter((id) => id !== customerId);
      } else {
        updatedState = [...currentState, customerId];
      }

      updatePositionInfoPayingCount(productIdentifier, updatedState.length);

      return {
        ...prev,
        [productIdentifier]: updatedState,
      };
    });
  };

  const handleAddCustomers = (toAdd) => {
    customerManager.addCustomers(toAdd);
    setTotalCustomersArray(customerManager.getCustomers());
  };

  const updatePositionInfoCount = (positionName, newCount) => {
    setPositionsInfo((prevPositionInfo) => {
      return {
        ...prevPositionInfo,
        [positionName]: {
          ...prevPositionInfo[positionName],
          clients: newCount,
        },
      };
    });
  };

  const updatePositionInfoPayingCount = (positionName, newPaying) => {
    setPositionsInfo((prevPositionInfo) => {
      return {
        ...prevPositionInfo,
        [positionName]: {
          ...prevPositionInfo[positionName],
          payingClients: newPaying,
        },
      };
    });
  };

  return (
    <div className="p-4 mx-auto w-fit max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Распределение позиций заказа
      </h1>
      {error && (
        <div className="my-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="flex flex-col">
        {products.map((product) => {
          return (
            <Card
              key={product.name}
              product={product}
              totalCustomersArray={totalCustomersArray}
              countOfClients={positionsInfo[product.name].clients}
              selectedCustomers={
                selectedCustomersPerPosition[product.name] || []
              }
              addCustomers={handleAddCustomers}
              onCustomerToggle={handleCustomerToggle}
              updatePositionInfoCount={updatePositionInfoCount}
            />
          );
        })}
      </div>
      <div className="mt-6 text-lg font-semibold">
        <FinalCheck positionsInfo={positionsInfo} />
      </div>
    </div>
  );
};

export default OrderAssignment;
