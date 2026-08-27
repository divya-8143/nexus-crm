import { CustomFieldDefinition } from '@nexus/shared';
import { ValidationError } from '../../core/errors/AppError';

export class CustomFieldValidationEngine {
  public static validate(
    definitions: CustomFieldDefinition[],
    values: Record<string, any>
  ): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    for (const def of definitions) {
      const val = values[def.name];

      // Check required
      if (def.isRequired && (val === undefined || val === null || val === '')) {
        errors[def.name] = `${def.label} is mandatory`;
        continue;
      }

      if (val === undefined || val === null || val === '') continue;

      // Type-specific checks
      switch (def.fieldType) {
        case 'NUMBER':
          if (typeof val !== 'number' && isNaN(Number(val))) {
            errors[def.name] = `${def.label} must be a valid number`;
          }
          break;
        case 'BOOLEAN':
          if (typeof val !== 'boolean') {
            errors[def.name] = `${def.label} must be true or false`;
          }
          break;
        case 'DATE':
          if (isNaN(Date.parse(val))) {
            errors[def.name] = `${def.label} must be a valid date format (ISO 8601)`;
          }
          break;
        case 'SELECT':
          if (def.options && !def.options.includes(val)) {
            errors[def.name] = `${def.label} must be one of: ${def.options.join(', ')}`;
          }
          break;
        case 'MULTI_SELECT':
          if (!Array.isArray(val)) {
            errors[def.name] = `${def.label} must be an array of selected values`;
          } else if (def.options) {
            const invalid = val.filter((item) => !def.options!.includes(item));
            if (invalid.length > 0) {
              errors[def.name] = `Invalid selection options: ${invalid.join(', ')}`;
            }
          }
          break;
        case 'TEXT':
        default:
          if (typeof val !== 'string') {
            errors[def.name] = `${def.label} must be text`;
          }
          break;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
