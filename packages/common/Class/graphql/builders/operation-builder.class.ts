import { IGraphQLOperationBuilder } from '../interfaces/gql.interface.js';

/**
 * Standard operation builder implementation
 * Single Responsibility: Builds GraphQL operation wrappers
 */
export class StandardOperationBuilder implements IGraphQLOperationBuilder {
  private readonly formatOptions: { trimResult: boolean } = {
    trimResult: true,
  };

  public buildOperation(
    fields: string,
    operationType: 'query' | 'mutation' | 'subscription',
    operationName?: string,
    variables?: Record<string, string>
  ): string {
    const variableDeclarations = variables
      ? Object.entries(variables)
          .map(([key, type]) => `$${key}: ${type}`)
          .join(', ')
      : '';

    const operationSignature = operationName
      ? `${operationType} ${operationName}`
      : operationType;

    const fullSignature =
      variableDeclarations.length > 0
        ? `${operationSignature}(${variableDeclarations})`
        : operationSignature;

    const result = `${fullSignature} {\n${fields}}`;
    return this.formatOptions.trimResult ? result.trim() : result;
  }
}
