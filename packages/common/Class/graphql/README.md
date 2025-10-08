# GraphQL Builder - SOLID Architecture

This document provides comprehensive examples for using the new class-based GraphQL builder that follows SOLID principles.

## Quick Start

```typescript
import {
  GraphQLBuilderFactory,
  buildGraphQLQuery,
} from '@/common/helper/graphql.builder.zHelper';

// Simple usage with backward compatibility
const query = buildGraphQLQuery([
  {
    name: 'user',
    fields: ['id', 'name', 'email'],
  },
]);
```

## Class-Based Usage

### 1. Basic Field Building

```typescript
import { GraphQLBuilderFactory } from '@/common/Class/graphql';

const builder = GraphQLBuilderFactory.createStandard();

const query = builder
  .setData([
    {
      name: 'user',
      fields: [
        'id',
        'name',
        'email',
        {
          name: 'profile',
          fields: ['avatar', 'bio'],
        },
      ],
    },
  ])
  .buildFields();

console.log(query);
// Output:
// user {
//   id
//   name
//   email
//   profile {
//     avatar
//     bio
//   }
// }
```

### 2. Complete GraphQL Operations

```typescript
const operationQuery = builder
  .setData([
    {
      name: 'getUser',
      fields: ['id', 'name', 'email'],
    },
  ])
  .setOperationType('query')
  .setOperationName('GetUserDetails')
  .setVariables({ id: 'String!' })
  .buildOperation();

console.log(operationQuery);
// Output:
// query GetUserDetails($id: String!) {
//   getUser {
//     id
//     name
//     email
//   }
// }
```

### 3. Custom Configuration

```typescript
const customBuilder = GraphQLBuilderFactory.createStandard({
  indentSize: 4,
  indentChar: ' ',
});

const formattedQuery = customBuilder
  .setData([{ name: 'user', fields: ['id'] }])
  .buildFields();
```

### 4. Fast Performance Mode

```typescript
// For scenarios where validation is not needed
const fastBuilder = GraphQLBuilderFactory.createFast();

const quickQuery = fastBuilder
  .setData([{ name: 'user', fields: ['id'] }])
  .buildFields();
```

## Architecture Overview

### SOLID Principles Applied

1. **Single Responsibility Principle (SRP)**
   - `IGraphQLValidator`: Only handles validation
   - `IGraphQLFormatter`: Only handles formatting
   - `IGraphQLFieldBuilder`: Only builds field strings
   - `IGraphQLOperationBuilder`: Only wraps operations

2. **Open/Closed Principle (OCP)**
   - New validators can be added by implementing `IGraphQLValidator`
   - New formatters can be added by implementing `IGraphQLFormatter`
   - Core builder logic remains unchanged

3. **Liskov Substitution Principle (LSP)**
   - Any validator implementing `IGraphQLValidator` can replace another
   - Any formatter implementing `IGraphQLFormatter` can replace another

4. **Interface Segregation Principle (ISP)**
   - Separate interfaces for validation, formatting, and building
   - No class is forced to depend on unused methods

5. **Dependency Inversion Principle (DIP)**
   - `GraphQLBuilder` depends on abstractions, not concrete classes
   - Dependencies are injected through constructor

### Bridge Pattern Implementation

The architecture uses the Bridge pattern to separate abstraction from implementation:

```typescript
// Abstraction
class GraphQLBuilder {
  constructor(
    private validator: IGraphQLValidator,
    private formatter: IGraphQLFormatter,
    private fieldBuilder: IGraphQLFieldBuilder,
    private operationBuilder: IGraphQLOperationBuilder
  ) {}
}

// Implementations can be swapped independently
const builder = new GraphQLBuilder(
  new ZodGraphQLValidator(), // Can be replaced with NoOpGraphQLValidator
  new StandardGraphQLFormatter(), // Can be replaced with custom formatter
  new StandardFieldBuilder(), // Can be replaced with custom builder
  new StandardOperationBuilder() // Can be replaced with custom builder
);
```

## Factory Methods

### createStandard()

- Full validation with Zod
- Standard formatting (2-space indentation)
- Complete error handling

### createFast()

- No validation (NoOp validator)
- Standard formatting
- Maximum performance for trusted data

### createCustom()

```typescript
const customBuilder = GraphQLBuilderFactory.createCustom({
  validator: new ZodGraphQLValidator(),
  formatter: new StandardGraphQLFormatter({ indentSize: 4 }),
  fieldBuilder: new StandardFieldBuilder(formatter),
  operationBuilder: new StandardOperationBuilder(),
});
```

## Error Handling

The system provides comprehensive error handling:

```typescript
try {
  const query = builder
    .setData([{ name: 'user', fields: ['invalid-field'] }])
    .buildFields();
} catch (error) {
  if (error instanceof ZodError) {
    console.error('Validation error:', error.errors);
  }
}
```

## Performance Considerations

- Use `createFast()` for trusted data where validation overhead is not needed
- Use `createStandard()` for user input or untrusted data
- The Bridge pattern allows runtime switching between implementations

## Migration Guide

### From Old Helper Function

```typescript
// Old way
import { buildGraphQLQuery } from '@/helper/old-graphql-helper';
const query = buildGraphQLQuery(data);

// New way (backward compatible)
import { buildGraphQLQuery } from '@/helper/graphql.builder.zHelper';
const query = buildGraphQLQuery(data);

// New class-based way
import { GraphQLBuilderFactory } from '@/helper/graphql.builder.zHelper';
const query = GraphQLBuilderFactory.createStandard()
  .setData(data)
  .buildFields();
```

## Extending the System

### Custom Validator

```typescript
class CustomValidator implements IGraphQLValidator {
  validate(data: AllowedGqlObj[]): boolean {
    // Custom validation logic
    return true;
  }

  isValidationEnabled(): boolean {
    return true;
  }
}
```

### Custom Formatter

```typescript
class TabFormatter implements IGraphQLFormatter {
  format(content: string, level: number): string {
    return '\t'.repeat(level) + content;
  }

  getConfig(): IFormatterConfig {
    return { indentSize: 1, indentChar: '\t' };
  }
}
```

This architecture provides flexibility, maintainability, and follows industry best practices for complex GraphQL query building scenarios.
