import type { AllowedGqlObj } from '@/types/base.zType.js';
import { GraphQLBuilderFactory } from '../factory/factory.class.js';

/**
 * Basic usage examples for GraphQL Builder
 */

// Simple user query
const simpleUserData: AllowedGqlObj[] = [
  {
    name: 'user',
    fields: ['id', 'name', 'email'],
  },
];

export function basicFieldBuilding(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder.setData(simpleUserData).buildFields();
}

export function basicOperation(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder
    .setData(simpleUserData)
    .setOperationType('query')
    .setOperationName('GetUser')
    .buildOperation();
}
