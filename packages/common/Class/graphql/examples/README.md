# GraphQL Builder Examples

This folder contains comprehensive examples demonstrating all features of the GraphQL Builder system.

## Available Examples

### 📝 Basic Usage (`basic-usage.example.ts`)

- Simple field building
- Basic operation creation
- Getting started examples

### 🔗 Nested Queries (`nested-queries.example.ts`)

- Complex nested field structures
- Multi-level object queries
- Relationship handling

### ✏️ Mutations (`mutations.example.ts`)

- Create operations
- Update operations
- Variable handling in mutations

### 📡 Subscriptions (`subscriptions.example.ts`)

- Real-time data subscriptions
- Event-based queries
- WebSocket integration patterns

### ⚡ Performance (`performance.example.ts`)

- Standard vs Fast builder comparison
- Performance benchmarking
- Optimization techniques

### 🎨 Custom Formatting (`custom-formatting.example.ts`)

- Custom indentation settings
- Different formatting styles
- Formatter configuration options

## Usage

```typescript
import { basicFieldBuilding } from './examples/basic-usage.example.js';
import { nestedFieldQuery } from './examples/nested-queries.example.js';

// Use any example function
const query = basicFieldBuilding();
console.log(query);
```

## Running Examples

Each example file exports functions that return GraphQL strings or perform demonstrations. Import and call them as needed in your application.
