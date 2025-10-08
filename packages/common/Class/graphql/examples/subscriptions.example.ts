import type { AllowedGqlObj } from '@/types/base.zType.js';
import { GraphQLBuilderFactory } from '../factory/factory.class.js';

/**
 * Subscription examples
 */

const userUpdatedData: AllowedGqlObj[] = [
  {
    name: 'userUpdated',
    fields: ['id', 'name', 'updatedAt'],
  },
];

const messageAddedData: AllowedGqlObj[] = [
  {
    name: 'messageAdded',
    fields: [
      'id',
      'content',
      'createdAt',
      {
        name: 'user',
        fields: ['id', 'name'],
      },
    ],
  },
];

export function userUpdatedSubscription(): string {
  const builder = GraphQLBuilderFactory.createForSubscriptions();
  return builder
    .setData(userUpdatedData)
    .setOperationName('UserUpdated')
    .setVariables({ userId: 'String!' })
    .buildOperation();
}

export function messageAddedSubscription(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder
    .setData(messageAddedData)
    .asSubscription('MessageAdded')
    .addVariable('roomId', 'String!')
    .buildOperation();
}
