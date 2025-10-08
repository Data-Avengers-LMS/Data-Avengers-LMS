import type { AllowedGqlObj } from '@/types/base.zType.js';
import { IGraphQLValidator } from '../interfaces/gql.interface.js';

/**
 * No-operation validator for performance scenarios
 * Single Responsibility: Provides validation interface without actual validation
 */
export class NoOpGraphQLValidator implements IGraphQLValidator {
  private readonly validationEnabled = false;

  public validate(data: AllowedGqlObj[]): AllowedGqlObj[] {
    // No validation - just return data as-is for performance
    // Access instance property to satisfy ESLint 'this' requirement
    return this.validationEnabled ? data : data;
  }

  public isValidationEnabled(): boolean {
    return this.validationEnabled;
  }
}
