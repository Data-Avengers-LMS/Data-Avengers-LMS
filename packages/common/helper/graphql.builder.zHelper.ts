import { GraphQLBuilderFactory } from '@/class/factory/factory.class.js';
import { IFormatterConfig } from '@/class/interfaces/gql.interface.js';
import { AllowedGqlObj } from '@/types/base.zType.js';

// Backward compatibility functions using the new class-based approach
export const buildGraphQLQuery = (
  data: AllowedGqlObj[],
  config?: Partial<IFormatterConfig>
): string =>
  GraphQLBuilderFactory.createStandard(config).setData(data).buildFields();

export const buildGraphQLOperation = (
  data: AllowedGqlObj[],
  operationType: 'query' | 'mutation' | 'subscription' = 'query',
  operationName?: string,
  variables?: Record<string, string>
): string =>
  GraphQLBuilderFactory.createStandard()
    .setData(data)
    .setOperationType(operationType)
    .setOperationName(operationName || '')
    .setVariables(variables || {})
    .buildOperation();

export const buildGraphQLQueryFast = (data: AllowedGqlObj[]): string =>
  GraphQLBuilderFactory.createFast().setData(data).buildFields();
