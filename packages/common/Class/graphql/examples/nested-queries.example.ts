import type { AllowedGqlObj } from '@/types/base.zType.js';
import { GraphQLBuilderFactory } from '../factory/factory.class.js';

/**
 * Nested query examples
 */

const nestedUserData: AllowedGqlObj[] = [
  {
    name: 'user',
    fields: [
      'id',
      'name',
      'email',
      {
        name: 'profile',
        fields: [
          'avatar',
          'bio',
          {
            name: 'settings',
            fields: ['theme', 'language'],
          },
        ],
      },
      {
        name: 'posts',
        fields: ['title', 'content', 'createdAt'],
      },
    ],
  },
];

export function nestedFieldQuery(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder.setData(nestedUserData).buildFields();
}

export function nestedQueryOperation(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder
    .setData(nestedUserData)
    .asQuery('GetUserWithProfile')
    .setVariables({ id: 'String!' })
    .buildOperation();
}
