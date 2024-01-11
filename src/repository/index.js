import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";
import CartsRepository from "./carts.repository.js";

import { productsManager } from "../DAL/dao/managers/productsManager.js";
import { cartsManager } from "../DAL/dao/managers/cartsManager.js";
import { usersManager } from "../DAL/dao/managers/usersManager.js";

export const usersService = new UsersRepository(usersManager);
export const productsService = new ProductsRepository(productsManager);
export const cartsService = new CartsRepository(cartsManager);