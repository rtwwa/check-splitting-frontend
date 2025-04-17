class CustomerManager {
  constructor() {
    this.customers = [];
    this.avatarSize = 40;
    this.nextId = 0;
  }

  generateCustomer() {
    console.log(this.nextId);

    const customer = {
      id: `cust${this.nextId}`,
      name: this.nextId === 0 ? `Вы` : `Клиент ${this.nextId + 1}`,
      avatar: `https://i.pravatar.cc/${this.avatarSize}?u=cust${this.nextId}`,
    };
    this.nextId++;
    return customer;
  }

  addCustomers(count) {
    if (typeof count !== "number" || count < 1) {
      throw new Error("Недопустимое значение count");
    }

    for (let i = 0; i < count; i++) {
      this.customers.push(this.generateCustomer());
    }
  }

  removeCustomers(count) {
    if (typeof count !== "number" || count < 1) {
      throw new Error("Недопустимое значение count");
    }

    this.customers = this.customers.slice(0, -count);
  }

  getCustomers() {
    return this.customers;
  }
}

export default CustomerManager;
