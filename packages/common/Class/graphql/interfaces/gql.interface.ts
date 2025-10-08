import type { AllowedGqlObj } from '@/types/base.zType.js';

/**
 * Interface for field building strategies
 * Single Responsibility: Only handles field construction
 */
export interface IGraphQLFieldBuilder {
  buildFields(data: AllowedGqlObj[], level: number): string;
}

/**
 * Interface for operation building strategies
 * Single Responsibility: Only handles operation wrapper construction
 */
export interface IGraphQLOperationBuilder {
  buildOperation(
    fields: string,
    operationType: 'query' | 'mutation' | 'subscription',
    operationName?: string,
    variables?: Record<string, string>
  ): string;
}

/**
 * Configuration interface for formatting
 */
export interface IFormatterConfig {
  indentSize: number;
  indentChar: string;
}

/**
 * Interface for formatting strategies
 * Single Responsibility: Only handles formatting concerns
 */
export interface IGraphQLFormatter {
  format(content: string, level: number): string;
  getIndent(level: number): string;
  getConfig(): IFormatterConfig;
}

/**
 * Interface for validation strategies
 * Single Responsibility: Only handles validation concerns
 */
export interface IGraphQLValidator {
  validate(data: AllowedGqlObj[]): AllowedGqlObj[];
  isValidationEnabled(): boolean;
}
