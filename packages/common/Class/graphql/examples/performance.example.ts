import type { AllowedGqlObj } from '@/types/base.zType.js';
import { GraphQLBuilderFactory } from '../factory/factory.class.js';

/**
 * Performance comparison examples
 */

const testData: AllowedGqlObj[] = [
  {
    name: 'complexQuery',
    fields: [
      'id',
      'name',
      {
        name: 'nested',
        fields: ['field1', 'field2'],
      },
    ],
  },
];

export function standardBuilderPerformance(): void {
  const iterations = 1000;
  console.time('Standard Builder (with validation)');

  for (let i = 0; i < iterations; i += 1) {
    GraphQLBuilderFactory.createStandard().setData(testData).buildFields();
  }

  console.timeEnd('Standard Builder (with validation)');
}

export function fastBuilderPerformance(): void {
  const iterations = 1000;
  console.time('Fast Builder (no validation)');

  for (let i = 0; i < iterations; i += 1) {
    GraphQLBuilderFactory.createFast().setData(testData).buildFields();
  }

  console.timeEnd('Fast Builder (no validation)');
}

export function comparePerformance(): void {
  console.log('=== Performance Comparison ===');
  standardBuilderPerformance();
  fastBuilderPerformance();
}
