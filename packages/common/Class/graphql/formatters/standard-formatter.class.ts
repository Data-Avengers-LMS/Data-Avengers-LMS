import {
  IFormatterConfig,
  IGraphQLFormatter,
} from '../interfaces/gql.interface.js';

/**
 * Standard GraphQL formatter implementation
 * Single Responsibility: Handles standard GraphQL formatting
 */
export class StandardGraphQLFormatter implements IGraphQLFormatter {
  private config: IFormatterConfig;

  constructor(config: IFormatterConfig) {
    this.config = config;
  }

  public format(content: string, level: number): string {
    const lines = content.split('\n');
    const indent = this.getIndent(level);
    return lines
      .map((line) => (line.trim() ? `${indent}${line.trim()}` : line))
      .join('\n');
  }

  public getIndent(level: number): string {
    return this.config.indentChar.repeat(this.config.indentSize * level);
  }

  public getConfig(): IFormatterConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<IFormatterConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}
