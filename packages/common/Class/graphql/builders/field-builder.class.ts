import type { AllowedGqlObj } from '@/types/base.zType.js';
import {
  IGraphQLFieldBuilder,
  IGraphQLFormatter,
} from '../interfaces/gql.interface.js';

/**
 * Standard field builder implementation
 * Single Responsibility: Builds GraphQL fields recursively
 */
export class StandardFieldBuilder implements IGraphQLFieldBuilder {
  private formatter: IGraphQLFormatter;

  constructor(formatter: IGraphQLFormatter) {
    this.formatter = formatter;
  }

  public buildFields(data: AllowedGqlObj[], level: number): string {
    const indent = this.formatter.getIndent(level);

    return data
      .map((item) => {
        let itemResult = `${indent}${item.name} {\n`;

        const fieldResults = item.fields.map((field) => {
          if (typeof field === 'string') {
            return `${this.formatter.getIndent(level + 1)}${field}\n`;
          }
          return this.buildFields([field], level + 1);
        });

        itemResult += fieldResults.join('');
        itemResult += `${indent}}\n`;
        return itemResult;
      })
      .join('');
  }
}
