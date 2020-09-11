import generateCustomers from "./customers";
import generateCategories from "./categories";
import generateProducts from "./products";
import generateCommands from "./commands";
import generateInvoices from "./invoices";
import generateReviews from "./reviews";
import finalize from "./finalize";

export default (options = { serializeDate: true }) => {
  const db = {};
  db.customers = generateCustomers(db, options);
  db.categories = generateCategories();
  db.products = generateProducts(db);
  db.commands = generateCommands(db, options);
  db.invoices = generateInvoices(db);
  db.reviews = generateReviews(db, options);
  finalize(db);

  return db;
};
