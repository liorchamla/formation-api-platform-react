import axios from "axios";
import Cache from "./cache";
import { CUSTOMERS_API } from "../config";

async function findAll() {
  const cachedCustomers = await Cache.get("customers");

  if (cachedCustomers) return cachedCustomers;

  return axios.get(CUSTOMERS_API).then(response => {
    const customers = response.data["hydra:member"];
    Cache.set("customers", customers);
    return customers;
  });
}

async function find(id) {
  const cachedCustomer = await Cache.get("customers." + id);

  if (cachedCustomer) return cachedCustomer;

  return axios.get(CUSTOMERS_API + "/" + id).then(response => {
    const customer = response.data;

    Cache.set("customers." + id, customer);

    return customer;
  });
}

function deleteCustomer(id) {
  return axios.delete(CUSTOMERS_API + "/" + id).then(async response => {
    const cachedCustomers = await Cache.get("customers");

    if (cachedCustomers) {
      Cache.set("customers", cachedCustomers.filter(c => c.id !== id));
    }

    return response;
  });
}

function update(id, customer) {
  return axios.put(CUSTOMERS_API + "/" + id, customer).then(async response => {
    const cachedCustomers = await Cache.get("customers");
    const cachedCustomer = await Cache.get("customers." + id);

    if (cachedCustomer) {
      Cache.set("customers." + id, response.data);
    }

    if (cachedCustomers) {
      const index = cachedCustomers.findIndex(c => c.id === +id);
      cachedCustomers[index] = response.data;
    }

    return response;
  });
}

function create(customer) {
  return axios.post(CUSTOMERS_API, customer).then(async response => {
    const cachedCustomers = await Cache.get("customers");

    if (cachedCustomers) {
      Cache.set("customers", [...cachedCustomers, response.data]);
    }

    return response;
  });
}

export default {
  findAll,
  find,
  create,
  update,
  delete: deleteCustomer
};
