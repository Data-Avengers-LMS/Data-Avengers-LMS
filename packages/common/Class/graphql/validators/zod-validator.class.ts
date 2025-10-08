import { z } from 'zod';
import type { AllowedGqlObj } from '@/types/base.zType.js';
import { IGraphQLValidator } from '../interfaces/gql.interface.js';

/**
 * Zod schema for GraphQL object validation
 */
export const AllowedGraphqlSchemaData: z.ZodType<AllowedGqlObj> = z.object({
  name: z.string(),
  fields: z.array(
    z.union([z.string(), z.lazy(() => AllowedGraphqlSchemaData)])
  ),
});

/**
 * Zod-based validation implementation
 * Single Responsibility: Validates GraphQL data using Zod schemas
 */
export class ZodGraphQLValidator implements IGraphQLValidator {
  private enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  public validate(data: AllowedGqlObj[]): AllowedGqlObj[] {
    if (!this.enabled) {
      return data;
    }
    return z.array(AllowedGraphqlSchemaData).parse(data);
  }

  public isValidationEnabled(): boolean {
    return this.enabled;
  }

  public setValidationEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}
