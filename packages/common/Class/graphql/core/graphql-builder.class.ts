import { AllowedGqlObj } from '@/types/base.zType.js';
import {
  IFormatterConfig,
  IGraphQLFieldBuilder,
  IGraphQLFormatter,
  IGraphQLOperationBuilder,
  IGraphQLValidator,
} from '../interfaces/gql.interface.js';

/**
 * Configuration interface for the GraphQL Builder
 */
export interface IGraphQLBuilderConfig {
  defaultOperationType: 'query' | 'mutation' | 'subscription';
}

/**
 * Main GraphQL Builder class using Bridge Pattern
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only orchestrates the building process
 * - Open/Closed: Can extend with new validators, formatters, builders without modification
 * - Liskov Substitution: All implementations are interchangeable
 * - Interface Segregation: Multiple focused interfaces instead of one large interface
 * - Dependency Inversion: Depends on abstractions, not concretions
 */
export class GraphQLBuilder {
  private validator: IGraphQLValidator;

  private formatter: IGraphQLFormatter;

  private fieldBuilder: IGraphQLFieldBuilder;

  private operationBuilder: IGraphQLOperationBuilder;

  private config: IGraphQLBuilderConfig;

  private currentData: AllowedGqlObj[] = [];

  private currentVariables: Record<string, string> = {};

  private currentOperationName?: string;

  private currentOperationType: 'query' | 'mutation' | 'subscription';

  constructor(
    validator: IGraphQLValidator,
    formatter: IGraphQLFormatter,
    fieldBuilder: IGraphQLFieldBuilder,
    operationBuilder: IGraphQLOperationBuilder,
    config?: Partial<IGraphQLBuilderConfig>
  ) {
    this.validator = validator;
    this.formatter = formatter;
    this.fieldBuilder = fieldBuilder;
    this.operationBuilder = operationBuilder;
    this.config = {
      defaultOperationType: 'query',
      ...config,
    };
    this.currentOperationType = this.config.defaultOperationType;
  }

  /**
   * Set the data to be processed
   */
  public setData(data: AllowedGqlObj[]): this {
    this.currentData = data;
    return this;
  }

  /**
   * Add additional data to existing data
   */
  public addData(data: AllowedGqlObj[]): this {
    this.currentData.push(...data);
    return this;
  }

  /**
   * Set operation type
   */
  public setOperationType(type: 'query' | 'mutation' | 'subscription'): this {
    this.currentOperationType = type;
    return this;
  }

  /**
   * Set operation name
   */
  public setOperationName(name: string): this {
    this.currentOperationName = name;
    return this;
  }

  /**
   * Set variables for the operation
   */
  public setVariables(variables: Record<string, string>): this {
    this.currentVariables = variables;
    return this;
  }

  /**
   * Add a single variable
   */
  public addVariable(name: string, type: string): this {
    this.currentVariables[name] = type;
    return this;
  }

  /**
   * Build GraphQL fields only
   */
  public buildFields(): string {
    const validatedData = this.validator.validate(this.currentData);
    return this.fieldBuilder.buildFields(validatedData, 0);
  }

  /**
   * Build complete GraphQL operation
   */
  public buildOperation(): string {
    const fields = this.buildFields();
    return this.operationBuilder.buildOperation(
      fields,
      this.currentOperationType,
      this.currentOperationName,
      this.currentVariables
    );
  }

  /**
   * Fluent API methods
   */
  public asQuery(name?: string): this {
    this.currentOperationType = 'query';
    if (name) this.currentOperationName = name;
    return this;
  }

  public asMutation(name?: string): this {
    this.currentOperationType = 'mutation';
    if (name) this.currentOperationName = name;
    return this;
  }

  public asSubscription(name?: string): this {
    this.currentOperationType = 'subscription';
    if (name) this.currentOperationName = name;
    return this;
  }

  /**
   * Reset builder state
   */
  public reset(): this {
    this.currentData = [];
    this.currentVariables = {};
    this.currentOperationName = undefined;
    this.currentOperationType = this.config.defaultOperationType;
    return this;
  }

  /**
   * Replace components (Bridge Pattern flexibility)
   */
  public setValidator(validator: IGraphQLValidator): this {
    this.validator = validator;
    return this;
  }

  public setFormatter(formatter: IGraphQLFormatter): this {
    this.formatter = formatter;
    return this;
  }

  public setFieldBuilder(fieldBuilder: IGraphQLFieldBuilder): this {
    this.fieldBuilder = fieldBuilder;
    return this;
  }

  public setOperationBuilder(operationBuilder: IGraphQLOperationBuilder): this {
    this.operationBuilder = operationBuilder;
    return this;
  }

  /**
   * Get current configuration
   */
  public getFormatterConfig(): IFormatterConfig {
    return this.formatter.getConfig();
  }

  /**
   * Check if validation is enabled
   */
  public isValidationEnabled(): boolean {
    return this.validator.isValidationEnabled();
  }
}
