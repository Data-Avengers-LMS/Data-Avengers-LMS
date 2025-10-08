import type { AllowedGqlObj } from '@/types/base.zType.js';
import { GraphQLBuilderFactory } from '../factory/factory.class.js';

/**
 * Mutation examples
 */

const createUserData: AllowedGqlObj[] = [
  {
    name: 'createUser',
    fields: ['id', 'name', 'email', 'createdAt'],
  },
];

const updateUserData: AllowedGqlObj[] = [
  {
    name: 'updateUser',
    fields: ['id', 'name', 'updatedAt'],
  },
];

export function createUserMutation(): string {
  const builder = GraphQLBuilderFactory.createForMutations();
  return builder
    .setData(createUserData)
    .setOperationName('CreateUser')
    .setVariables({
      name: 'String!',
      email: 'String!',
    })
    .buildOperation();
}

export function updateUserMutation(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder
    .setData(updateUserData)
    .asMutation('UpdateUser')
    .addVariable('id', 'String!')
    .addVariable('name', 'String')
    .buildOperation();
}
