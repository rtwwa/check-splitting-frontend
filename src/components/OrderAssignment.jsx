import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import fakeApi from "../api/fakeApi";
import FinalCheck from "./Card/FinalCheck";

const initialOrderData = await fakeApi.getCheck(1);

const generatePlaceholderCustomers = (count) => {
  const customers = [];
  if (count < 1) {
    return customers;
  }

  customers.push({
    id: `cust${0}`,
    name: `Вы`,
    avatar: `https://i.pravatar.cc/40?u=cust${0}`,
  });

  if (count > 1) {
    for (let i = 1; i < count; i++) {
      customers.push({
        id: `cust${i}`,
        name: `Клиент ${i + 1}`,
        avatar: `https://i.pravatar.cc/40?u=cust${i}`,
      });
    }
  }
  return customers;
};

const OrderAssignment = () => {
  const [products, setProducts] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const customers = generatePlaceholderCustomers(
        initialOrderData.numberClients
      );
      setAvailableCustomers(customers);

      setProducts(initialOrderData.products);

      const initialAssignments = {};
      initialOrderData.products.forEach((product) => {
        initialAssignments[product.name] = [];
      });
      setAssignments(initialAssignments);
    } catch (err) {
      setError("Не удалось инициализировать данные");
      console.error(err);
    }
  }, []); // Пустой массив зависимостей - выполняется один раз при монтировании

  const handleCustomerToggle = (productIdentifier, customerId) => {
    setAssignments((prevAssignments) => {
      const currentAssigned = prevAssignments[productIdentifier] || [];
      const isAssigned = currentAssigned.includes(customerId);

      let updatedAssigned;
      if (isAssigned) {
        updatedAssigned = currentAssigned.filter((id) => id !== customerId);
      } else {
        updatedAssigned = [...currentAssigned, customerId];
      }

      return {
        ...prevAssignments,
        [productIdentifier]: updatedAssigned,
      };
    });
  };

  const addCustomers = (customers, count) => {
    const initialId = customers.length;
    const newCustomers = [...customers];

    for (let i = 0; i < count; i++) {
      const id = initialId + i;
      newCustomers.push({
        id: `cust${id}`,
        name: `Клиент ${id + 1}`,
        avatar: `https://i.pravatar.cc/40?u=cust${id}`,
      });
    }

    console.log(newCustomers);

    setAvailableCustomers(newCustomers);
  };

  const finalCheckData = products.map((idx, product) => ({
    position: product.name,
    n: availableCustomers.length,
    m: assignments[product.name]?.length || 0,
  }));

  return (
    <div className="p-4 mx-auto w-fit max-w-2xl">
      {" "}
      {/* Ограничим ширину для лучшего вида */}
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
              availableCustomers={availableCustomers}
              assignedCustomerIds={assignments[product.name] || []}
              addPlaceholderCustomers={addCustomers}
              onCustomerToggle={handleCustomerToggle}
            />
          );
        })}
      </div>
      <div className="mt-6 text-lg font-semibold">
        <FinalCheck check={finalCheckData} />
      </div>
      <h3 className="mt-6 text-lg font-semibold">
        Текущее распределение (для отладки):
      </h3>
      <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-x-auto">
        {JSON.stringify(assignments, null, 2)}
      </pre>
    </div>
  );
};

export default OrderAssignment;
