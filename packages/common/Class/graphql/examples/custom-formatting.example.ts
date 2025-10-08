import type { AllowedGqlObj } from '@/types/base.zType.js';
import { GraphQLBuilderFactory } from '../factory/factory.class.js';

/**
 * Custom formatting examples
 */

const sampleData: AllowedGqlObj[] = [
  {
    name: 'user',
    fields: [
      'id',
      'name',
      {
        name: 'profile',
        fields: ['avatar', 'bio'],
      },
    ],
  },
];

export function standardFormatting(): string {
  const builder = GraphQLBuilderFactory.createStandard();
  return builder.setData(sampleData).buildFields();
}

export function customIndentFormatting(): string {
  const builder = GraphQLBuilderFactory.createWithCustomIndent(4, ' ');
  return builder.setData(sampleData).buildFields();
}

export function tabIndentFormatting(): string {
  const builder = GraphQLBuilderFactory.createWithCustomIndent(1, '\t');
  return builder.setData(sampleData).buildFields();
}

export function customFormatterConfig(): string {
  const builder = GraphQLBuilderFactory.createStandard({
    indentSize: 3,
    indentChar: ' ',
  });
  return builder.setData(sampleData).buildFields();
}
