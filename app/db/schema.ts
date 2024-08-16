import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email"),
  password_hash: text("password_hash"),
});

const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

const beerTable = sqliteTable("beer", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  image: text("image"),
  type: text("type"),
  inStock: integer("in_stock", { mode: "boolean" }),
  quantity: integer("quantity"),
  order: integer("order").references(() => orderTable.id),
});

const orderTable = sqliteTable("order", {
  id: text("id").notNull().primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => userTable.id),
  orderDate: text("date").default(sql`(CURRENT_DATE)`),
  status: text("status"),
});

const cartTable = sqliteTable("cart", {
  id: text("id").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
});

const cartItemTable = sqliteTable("cartItem", {
  id: text("id").notNull().primaryKey(),
  cartId: integer("cart_id")
    .notNull()
    .references(() => cartTable.id),
  beerId: integer("beer_id")
    .notNull()
    .references(() => beerTable.id),
});

export { userTable, sessionTable, cartTable, cartItemTable, orderTable, beerTable };
