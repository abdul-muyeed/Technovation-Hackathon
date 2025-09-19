import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { userAddresses, users } from './users';

export const wasteType = pgTable('waste_type', {
  id: serial('id').primaryKey(),
  type: varchar({ length: 50 }).notNull().unique(),
});

export const wasteCategories = pgTable('waste_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  type: varchar({ length: 50 }).notNull(), // e.g., 'plastic', 'metal', 'paper'
  description: text('description'),
  pointsPerKg: integer('points_per_kg').notNull(),
  pricePerKg: decimal('price_per_kg', { precision: 8, scale: 2 }),
  imageUrl: text('image_url'),
  sortingInstructions: text('sorting_instructions'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pickupRequests = pgTable('pickup_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestNumber: serial('request_number').notNull().unique(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  collectorId: uuid('collector_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  addressId: uuid('address_id')
    .references(() => userAddresses.id)
    .notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, accepted, in_progress, completed, cancelled
  scheduledDate: timestamp('scheduled_date').notNull(),
  scheduledTimeSlot: varchar('scheduled_time_slot', { length: 20 }).notNull(), // e.g., "09:00-11:00"
  estimatedWeight: decimal('estimated_weight', { precision: 8, scale: 2 }),
  actualWeight: decimal('actual_weight', { precision: 8, scale: 2 }),
  totalPoints: integer('total_points').default(0),
  totalValue: decimal('total_value', { precision: 10, scale: 2 }).default(
    '0.00',
  ),
  specialInstructions: text('special_instructions'),
  images: jsonb('images'), // Array of image URLs
  collectorNotes: text('collector_notes'),
  completedAt: timestamp('completed_at'),
  cancelledAt: timestamp('cancelled_at'),
  rating: integer('rating'), // 1-5 rating by user
  feedback: text('feedback'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Waste items within pickup requests
export const pickupRequestItems = pgTable('pickup_request_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  pickupRequestId: uuid('pickup_request_id')
    .references(() => pickupRequests.id, { onDelete: 'cascade' })
    .notNull(),
  wasteCategoryId: uuid('waste_category_id')
    .references(() => wasteCategories.id)
    .notNull(),
  estimatedQuantity: decimal('estimated_quantity', {
    precision: 8,
    scale: 2,
  }).notNull(),
  actualQuantity: decimal('actual_quantity', { precision: 8, scale: 2 }),
  pointsEarned: integer('points_earned').default(0),
  value: decimal('value', { precision: 8, scale: 2 }).default('0.00'),
  images: jsonb('images'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


