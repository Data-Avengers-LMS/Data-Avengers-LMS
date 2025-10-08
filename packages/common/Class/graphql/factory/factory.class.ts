import {
  GraphQLBuilder,
  type IGraphQLBuilderConfig,
} from '../core/graphql-builder.class.js';
import { ZodGraphQLValidator } from '../validators/zod-validator.class.js';
import { NoOpGraphQLValidator } from '../validators/noop-validator.class.js';
import { StandardGraphQLFormatter } from '../formatters/standard-formatter.class.js';
import { StandardFieldBuilder } from '../builders/field-builder.class.js';
import { StandardOperationBuilder } from '../builders/operation-builder.class.js';
import { IFormatterConfig } from '../interfaces/gql.interface.js';

/**
 * Factory class for creating GraphQL Builder instances
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only creates and configures builder instances
 * - Open/Closed: Easy to extend with new creation methods
 * - Dependency Inversion: Returns abstractions, not concrete classes
 */
export class GraphQLBuilderFactory {
  private static createBase(
    validate: boolean,
    formatterConfig?: Partial<IFormatterConfig>,
    builderConfig?: Partial<IGraphQLBuilderConfig>
  ): GraphQLBuilder {
    const formatter = new StandardGraphQLFormatter({
      indentSize: 2,
      indentChar: ' ',
      ...formatterConfig,
    });

    const validator = validate
      ? new ZodGraphQLValidator(true)
      : new NoOpGraphQLValidator();

    const fieldBuilder = new StandardFieldBuilder(formatter);
    const operationBuilder = new StandardOperationBuilder();

    return new GraphQLBuilder(
      validator,
      formatter,
      fieldBuilder,
      operationBuilder,
      builderConfig
    );
  }

  /**
   * Create a standard GraphQL builder with Zod validation
   */
  public static createStandard(
    formatterConfig?: Partial<IFormatterConfig>,
    builderConfig?: Partial<IGraphQLBuilderConfig>
  ): GraphQLBuilder {
    return this.createBase(true, formatterConfig, builderConfig);
  }

  /**
   * Create a performance-optimized builder without validation
   */
  public static createFast(
    formatterConfig?: Partial<IFormatterConfig>,
    builderConfig?: Partial<IGraphQLBuilderConfig>
  ): GraphQLBuilder {
    return this.createBase(false, formatterConfig, builderConfig);
  }

  /**
   * Create a builder with custom indentation
   */
  public static createWithCustomIndent(
    indentSize: number,
    indentChar: string = ' ',
    validate: boolean = true,
    builderConfig?: Partial<IGraphQLBuilderConfig>
  ): GraphQLBuilder {
    return this.createBase(validate, { indentSize, indentChar }, builderConfig);
  }

  /**
   * Create a builder for mutations by default
   */
  public static createForMutations(
    formatterConfig?: Partial<IFormatterConfig>
  ): GraphQLBuilder {
    return this.createStandard(formatterConfig, {
      defaultOperationType: 'mutation',
    });
  }

  /**
   * Create a builder for subscriptions by default
   */
  public static createForSubscriptions(
    formatterConfig?: Partial<IFormatterConfig>
  ): GraphQLBuilder {
    return this.createStandard(formatterConfig, {
      defaultOperationType: 'subscription',
    });
  }
}
