# preact-state-manager

A powerful and flexible state management library developed using RxJS, inspired by the Flux architecture. Ideal for managing complex state in Preact applications.

## Installation

Easily integrate `preact-state-manager` into your project:

```sh
npm install preact-state-manager
```

or

```sh
yarn add preact-state-manager
```

> **Tip:** This library can be used as a Preact hook for efficient state management.

## Getting Started with preact-state-manager

### Initializing the State Manager

Initialize the state manager to manage your application's state effectively.

#### counter-state-manager.ts

```javascript
import { rxStateManager } from 'preact-state-manager';

export const {
  updateState: updateCounterState,
  useStateManager: useCounterState,
} = rxStateManager({
  count: 0,
});

class CounterAction {
  changeCounter = (newCount) => {
    updateCounterState((state) => {
      state.count = newCount;
    });
  };
}

export const counterAction = new CounterAction();
```

**Key Feature:** When passing a function to the updater, the `state` argument can be mutated freely. Changes will be made immutable and become the next state once the producer ends.

### Using the Hook to Access and Update State

Learn how to use the hook to consume and update state in your Preact components.

#### App.tsx

```javascript
import { h } from 'preact';
import { counterAction, useCounterState } from './counter-state-manager';

export function App() {
  const { count } = useCounterState('count');
  
  return (
    <div class="card">
      <button onClick={() => counterAction.changeCounter(count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}
```

### Why Use preact-state-manager?

1. **Selective Rerendering:** Use `const { count } = useCounterState('count')` to rerender components only when specific state keys change, improving performance.
2. **Effortless State Updates:** Simplify state updates with `onClick={() => counterAction.changeCounter(count + 1)}` without the need for dispatchers.

### Accessing Current State

`useCounterState` hook allows you to access the current state of the counter:

```javascript
const { count } = useCounterState('count');
console.log(count);
```

## Advantages of Using preact-state-manager

- **Efficient State Management:** Manage your application’s state efficiently with RxJS and Preact.
- **Scalable and Maintainable:** Ideal for complex applications requiring a scalable and maintainable state management solution.
- **Improved Performance:** Optimize performance with selective rerendering and immutable state updates.

## License

This project is licensed under the MIT License.
