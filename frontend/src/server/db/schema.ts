// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

// export const createTable = pgTableCreator((name) => `dunder-mifflin-x-salah-yudin_${name}`);

export const products = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  price: integer("price").notNull(),
  description: varchar("description", { length: 1024 }),
  image: varchar("image", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerkId").notNull(),
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const userAddress = pgTable("userAddress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("userId").notNull(),
  address: varchar("adress", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  district: varchar("district", { length: 256 }).notNull(),
  telephone: varchar("telephone", { length: 256 }).notNull(),
  postalCode: varchar("postalCode", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const cartItems = pgTable("cartItem", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("userId").notNull(),
  productId: uuid("productId::uuid").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const shoppingSessions = pgTable("shoppingSession", {
  id: varchar("id").primaryKey(),
  userId: varchar("userId").notNull().unique(),
  total: varchar("total").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const comments = pgTable("comment", {
  id: uuid("id:uuid").primaryKey().defaultRandom(),
  userId: varchar("userId").notNull(),
  author: varchar("userName", { length: 256 }).notNull(),
  productId: uuid("productId::uuid").notNull(),
  header: varchar("header", { length: 256 }).notNull(),
  content: varchar("content", { length: 512 }).notNull(),
  star: varchar("star", { length: 10 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const orders = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("userId").notNull(),
  orderNumber: varchar("orderNumber", { length: 256 }).notNull().unique(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  totalAmount: integer("totalAmount").notNull(),
  shippingAddress: varchar("shippingAddress", { length: 512 }).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 100 }).notNull(),
  trackingNumber: varchar("trackingNumber", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const orderItems = pgTable("orderItem", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("orderId").notNull(),
  productId: uuid("productId").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  products: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
}));

export const userCommentRelations = relations(comments, ({ one }) => ({
  users: one(users, {
    fields: [comments.userId],
    references: [users.clerkId],
  }),
}));

export const productRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
}));

export const cartItemProductRelations = relations(cartItems, ({ one }) => ({
  products: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  cartItems: many(cartItems),
  comments: many(comments),
  shoppingSessions: one(shoppingSessions, {
    fields: [users.clerkId],
    references: [shoppingSessions.userId],
  }),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  users: one(users, {
    fields: [cartItems.userId],
    references: [users.clerkId],
  }),
}));

export const shoppingSessionRelations = relations(shoppingSessions, ({ one }) => ({
  users: one(users, {
    fields: [shoppingSessions.userId],
    references: [users.clerkId],
  }),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.clerkId],
  }),
  orderItems: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));