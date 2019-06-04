const apiUrl = process.env.API_URL;

const endPoints = {
  customers: apiUrl + "customers",
  invoices: apiUrl + "invoices",
  users: apiUrl + "users",
  login: apiUrl + "login_check"
};

export default {
  endPoints
};
