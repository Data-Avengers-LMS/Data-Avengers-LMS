import { z } from 'zod';

declare const brand: unique symbol;

export type Brand<T, TBrand> = T & {
  [brand]: TBrand;
};

// Zod schema for valid event keys
const eventKeySchema = z
  .string()
  .regex(/^[^:]+:[^:]+$/, 'Event key must follow pattern "namespace:event"');

// Zod schema for socket events
export const socketEventSchema = z.record(eventKeySchema, z.any());

export type ISocketEvent = z.infer<typeof socketEventSchema>;

export type ValidatedSocketEvents<T> = Brand<T, 'ValidatedEvents'>;

// GraphQL Builder Types
export interface AllowedGqlObj {
  name: string;
  fields: Array<string | AllowedGqlObj>;
}
