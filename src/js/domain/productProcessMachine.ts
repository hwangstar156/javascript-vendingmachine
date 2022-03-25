import {
  ProductDomain,
  Update,
  Add,
  Delete,
  GetProducts,
} from "../interface/product.interface";
import { ERROR_MESSAGE, VENDING_MACHINE_NUMBER } from "../constant";

class ProductProcessMachine implements ProductDomain {
  products = [];

  add: Add = (newProduct) => {
    this.checkDuplicatedName(newProduct.name);
    this.checkNameLength(newProduct.name);
    this.checkValidPrice(newProduct.price);
    this.checkValidCount(newProduct.count);

    this.products.push(newProduct);
  };

  getProducts: GetProducts = () => {
    return this.products;
  };

  update: Update = (idx, name, price, count) => {
    this.checkDuplicatedName(name, idx);

    name && this.checkNameLength(name);
    price && this.checkValidPrice(price);
    count && this.checkValidCount(count);

    this.updateStatus(idx, name, "name");
    this.updateStatus(idx, price, "price");
    this.updateStatus(idx, count, "count");
  };

  delete: Delete = (idx) => {
    this.products.splice(idx, 1);
  };

  updateStatus = (idx: number, status: number | string, key: string) => {
    this.products[idx][`${key}`] = status;
  };

  checkDuplicatedName = (newName: string, idx: number = -1): void => {
    if (
      this.products.some(({ name }, index) => {
        return name === newName && (idx === -1 || index !== idx);
      })
    ) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NAME);
    }
  };

  checkNameLength = (name: string): void => {
    if (name.length > VENDING_MACHINE_NUMBER.MAXIMUM_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.MAXIMUM_NAME_LENGTH);
    }
  };

  checkValidPrice = (price: number): void => {
    if (
      price < VENDING_MACHINE_NUMBER.MINIMUM_PRICE ||
      price > VENDING_MACHINE_NUMBER.MAXIMUM_PRICE ||
      price % VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0
    ) {
      throw new Error(ERROR_MESSAGE.VALID_PRICE);
    }
  };

  checkValidCount = (count: number): void => {
    if (!count || count <= VENDING_MACHINE_NUMBER.MINIMUM_COUNT) {
      throw new Error(ERROR_MESSAGE.MINIMUM_COUNT);
    }

    if (count > VENDING_MACHINE_NUMBER.MAXIMUM_COUNT) {
      throw new Error(ERROR_MESSAGE.MAXIMUM_COUNT);
    }
  };
}

export default ProductProcessMachine;