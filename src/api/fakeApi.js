const fakeApi = {
  getCheck: (id) => {
    const checks = [
      {
        id: 1,
        numberClients: 2,
        total_account: 4070,
        products: [
          {
            name: "Pizza Margherita",
            numberServings: 2,
            price: 450,
            total: 900,
          },
          {
            name: "Caesar Salad",
            numberServings: 1,
            price: 380,
            total: 380,
          },
          {
            name: "Spaghetti Bolognese",
            numberServings: 1,
            price: 520,
            total: 520,
          },
          {
            name: "Tiramisu",
            numberServings: 2,
            price: 300,
            total: 600,
          },
          {
            name: "Coca-Cola",
            numberServings: 3,
            price: 120,
            total: 360,
          },
          {
            name: "Espresso",
            numberServings: 2,
            price: 150,
            total: 300,
          },
          {
            name: "Garlic Bread",
            numberServings: 4,
            price: 160,
            total: 640,
          },
          {
            name: "Minestrone Soup",
            numberServings: 1,
            price: 450,
            total: 450,
          },
        ],
      },
      { id: 2, name: "Check 2" },
      { id: 3, name: "Check 3" },
    ];

    const check = checks.find((check) => check.id === id);
    if (!check) {
      throw new Error(`Check with id ${id} not found`);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(check);
      }, 100);
    });
  },
  generatePlaceholderCustomers: (count) => {
    const customers = [];
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        customers.push({
          id: `cust${i}`,
          name: `Клиент ${i}`,
          avatar: `https://dummyimage.com/64x64/000/fff&text=$`,
        });
      }
    }
    return customers;
  },
};

export default fakeApi;

// fakeApi.getCheck(1).then((check) => console.log(check));
