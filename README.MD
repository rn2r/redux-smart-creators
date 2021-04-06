<div align="center">
<h1>
redux-smart-creators
<br>

<a href="https://github.com/ostashkin/redux-smart-creators/actions/workflows/release.yml">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/ostashkin/redux-smart-creators/release">
</a>

<a href='https://coveralls.io/github/ostashkin/redux-smart-creators?branch=master'>
<img src='https://coveralls.io/repos/github/ostashkin/redux-smart-creators/badge.svg?branch=master' alt='Coverage Status' />
</a>

<a href="https://bundlephobia.com/result?p=redux-smart-creators">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/redux-smart-creators.svg?color=4Fc921">
</a>

</h1>

<p>Strongly typed tools for fast and declarative Redux development</p>

</div>

## Documentation

**Examples**

`work in progress`

**Getting Started**
- [Installation](#installation)
- [Action creators](#action-creators)
  - [Basic action creators](#basic-action-creators)
  - [Asynchronous action creators](#asynchronous-action-creators)
  - [Retrieving the action type](#retrieving-the-action-type)
  - [Creators pack](#creators-pack)
- [Reducers](#reducers)
  - [Creating basic reducer](#creating-basic-reducer)
  - [Reducer's action handlers](#reducers-action-handlers)

**Usage with Typescript**
- [Typing action creators](#typing-action-creators)
- [Typing reducers](#typing-reducers)

# Getting Started

## Installation

```bash
# with npm
npm install redux-smart-creators
# with yarn
yarn add redux-smart-creators
```

## Action creators
There are two types of action creators:
- **Basic action creators** return an object with an action type, and a payload (if a payload is specified)
- **Asynchronous action creators** return an object with multiple basic action creators, each of which is characteristically responsible for a specific step of the asynchronous action.

### Basic action creators
To create a basic action, use the `getCreator` function
```typescript
import { getCreator } from 'redux-smart-creators'
```

#### Basic action creators without payload
Let's imagine that we have storage for a basic counter: `{ count: 0 }`.
Let's make an action creator to increment the counter by 1.
This creator does not require a payload and has a 'incrementByOne' type.
```typescript
const incrementByOne = getCreator('incrementByOne');

/** equal to:
 * const incrementByOne = () => ({ 
 *   type: 'incrementByOne' 
 * }) 
 */

store.dispatch(incrementByOne()) // dispatched { type: 'incrementByOne' }
```

#### Basic action creators with payload
In some cases, we need to increment the counter by a given value.
To do this, we need an action creator that will accept the payload.
To create it, use the `load` method
```typescript
const incrementByValue = getCreator('incrementByValue').load()

/** equal to:
 * const incrementByValue = (value) => ({ 
 *   type: 'incrementByValue',
 *   payload: value
 * })
 */

store.dispatch(incrementByValue(10)) // dispatched { type: 'incrementByValue', payload: 10 }
```

#### Using more complex payloads
Now we need to increase the counter by the specified number several times.
To do this, we use the `load` method along with a function that will calculate the value to add.
```typescript
const calculateValue = (value, times) => value * times;
const incrementManyTimes = getCreator('incrementManyTimes').load(calculateValue)

/** equal to:
 * const incrementManyTimes = (value, times) => ({ 
 *    type: 'incrementManyTimes', 
 *    payload: value * times
 *  })
 */

store.dispatch(incrementManyTimes(10, 2)) // dispatched { type: 'incrementManyTimes', payload: 20 }

// You also can use inline functions:
const decrementManyTimes = getCreator('decrementManyTimes').load((value, times) => value * times)
```

### Asynchronous action creators
Asynchronous action creator is an object with multiple basic action creators, each of which is characteristically responsible for a specific step of the asynchronous action.
It also has a 'load' method for getting payload for chosen steps.
```typescript
import { getAsyncCreator } from 'redux-smart-creators'
```

#### Asynchronous actions without Payload
For example, we have some storage: `{ count: 0 }`.
Now we are increasing the counter using a request to the server, 
and we need to track the various states of this action, such as `initiation`, `loading`, `success` and `error`.

To get these actions in one package, use the `getAsyncCreator` function.
By default, it returns an object with four **steps** (`INIT`, `LOADING`, `SUCCESS`, `FAILURE`), represented as [basic action creators without a payload](#basic-action-creators-without-payload). 
All of them will have computed action type, consisting of the type specified in the `getAsyncCreator` and the **step** name.
Let's create an asynchronous increase by a given value:
```typescript
const incrementByOneAsync = getAsyncCreator('incrementByOneAsync');

store.dispatch(incrementByOneAsync.INIT()) // dispatched { type: 'incrementByOneAsync[INIT]' }
store.dispatch(incrementByOneAsync.LOADING()) // dispatched { type: 'incrementByOneAsync[LOADING]' }
store.dispatch(incrementByOneAsync.SUCCESS()) // dispatched { type: 'incrementByOneAsync[SUCCESS]' }
store.dispatch(incrementByOneAsync.FAILURE()) // dispatched { type: 'incrementByOneAsync[FAILURE]' }
```

#### Defining own steps
If you want to define own **steps** (instead of `INIT`, `LOADING`, `SUCCESS`, `FAILURE`)
for asynchronous action creators, provide them as array in second argument:
```typescript
const Async = incrementByOneAsync('incrementByOne', ['start', 'finish', 'error']);

store.dispatch(incrementByOneAsync.start()) // dispatched { type: 'incrementByOne[start]' }
store.dispatch(incrementByOneAsync.finish()) // dispatched { type: 'incrementByOne[finish]' }
store.dispatch(incrementByOneAsync.error()) // dispatched { type: 'incrementByOne[error]' }
```

#### Asynchronous actions creators with payload
For providing a payload to asynchronous action creator use `load` method and `payload` helper function.
You need to provide an object with steps you want to be injected with a payload.
Use the `payload` function at the desired step to upgrade a step's action creator:
```typescript
import { payload } from 'redux-smart-creators'

const incrementByValueAsync = getAsyncCreator('incrementByValue').load({
  INIT: payload(),
  SUCCESS: payload(),
  FAILURE: payload()
})

store.dispatch(incrementByValueAsync.INIT(10)) // dispatched { type: 'incrementByValue[INIT]', payload: 10 }
store.dispatch(incrementByValueAsync.SUCCESS(true)) // dispatched { type: 'incrementByValue[SUCCESS]', payload: true }
store.dispatch(incrementByValueAsync.FAILURE('Server Error')) // dispatched { type: 'incrementByValue[FAILURE]', payload: 'Server Error' }

// The rest of the steps are left unchanged:
store.dispatch(incrementByValueAsync.LOADING()) // dispatched { type: 'incrementByValue[LOADING]' }
```

#### Providing payload functions
To create more complex payloads, use your functions instead of imported `payload` function, as in [basic actions creators](#using-more-complex-payloads)
```typescript
import { payload } from 'redux-smart-creators'

const calculateValue = (value, times) => value * times;
const incrementManyTimesAsync = getAsyncCreator('incrementManyTimes').load({
  INIT: calculateValue, // You can use declared function
  SUCCESS: payload(),
  FAILURE: (error) => error.message, // or inline functions
})

store.dispatch(incrementManyTimesAsync.INIT(10, 2)) // dispatched { type: 'incrementManyTimes[INIT]', payload: 20 }
store.dispatch(incrementManyTimesAsync.SUCCESS(true)) // dispatched { type: 'incrementManyTimes[SUCCESS]', payload: true }
store.dispatch(incrementManyTimesAsync.FAILURE({ message: 'Server Error', status: 500 })) // dispatched { type: 'incrementManyTimes[FAILURE]', payload: 'Server Error' }
  
// The rest of the steps are left unchanged:
store.dispatch(incrementManyTimesAsync.LOADING()) // dispatched { type: 'incrementManyTimes[LOADING]' }
```

### Retrieving the action type
Actions creators have a `type` property that contains the literal of the corresponding action.
Use this property when you need to access the action type.
```typescript
const incrementByOne = getCreator('incrementByOne');
console.log(incrementByOne.type) // incrementByOne

const asyncIncrement = getAsyncCretor('asyncIncrement');
console.log(incrementByOne.INIT.type) // incrementByOne[INIT]
console.log(incrementByOne.LOADING.type) // incrementByOne[LOADING]

// with own steps:
const asyncDecrement = getAsyncCretor('asyncDecrement', ['start', 'finish']);
console.log(incrementByOne.start.type) // incrementByOne[start]
console.log(incrementByOne.finish.type) // incrementByOne[finish]
```

### Creators pack
It is often necessary to combine several actions into one pack with same label.
To create a package use the `getCreatorPack` function.
The received package will have the functions for getting action creators.

```typescript
import { getCreatorsPack } from 'redux-smart-creators'
```

#### Pack's label
Specify the name of the package, and it will be added to the `type` of each action creator obtained from this package.
```typescript
const counter = getCreatorsPack('COUNTER');

const incrementByOne = counter.getCreator('incrementByOne');
console.log(incrementByOne.type) // @@COUNTER/incrementByOne

const incrementAsync = counter.getAsyncCreator('incrementAsync');
console.log(incrementAsync.INIT.type) // @@COUNTER/incrementAsync[INIT]
console.log(incrementAsync.LOADING.type) // @@COUNTER/incrementAsync[LOADING]
```

#### Pack's asynchronous steps
As the second argument, specify the steps that will be used by default in the asynchronous action creators taken from this package.
```typescript
const counter = getCreatorsPack('COUNTER', ['start', 'finish']);

const incrementAsync = counter.getAsyncCreator('incrementAsync');
console.log(incrementAsync.start.type) // @@COUNTER/incrementAsync[start]
console.log(incrementAsync.finish.type) // @@COUNTER/incrementAsync[finish]
```
It is possible to specify steps as the only argument, but in this case, the package label will be empty and will not be applied to types of action creators.
```typescript
const counter = getCreatorsPack(['start', 'finish']);

const incrementAsync = counter.getAsyncCreator('incrementAsync');
console.log(incrementAsync.start.type) // incrementAsync[start]
console.log(incrementAsync.finish.type) // incrementAsync[finish]
```
Package's default steps can be overwritten for a specific action creator during a `getAsyncCreator` function call.
```typescript
const counter = getCreatorsPack('COUNTER', ['start', 'finish']);

const incrementAsync = counter.getAsyncCreator('incrementAsync', ['init', 'success']);
console.log(incrementAsync.init.type) // @@COUNTER/incrementAsync[init]
console.log(incrementAsync.success.type) // @@COUNTER/incrementAsync[success]
```

## Reducers
The library provides a powerful tool for declarative development of reducers. First, import the `setupReducer` function
```typescript
import { setupReducer } from "redux-smart-creators";
```

### Creating basic reducer
To create a basic reducer, provide an initial state and call the `create` method. This reducer will always return the initial state.
```typescript
const initialState = 0;
const reducer = setupReducer(initialState).create()
```
### Reducer's action handlers
To add some logic to the reducer, use the handlers before calling the `create `method.
Each handler returns a reducer creator, so you can chain handlers.
#### Basic usage
For basic action's handling use the `on` method.

Executes the specified function while processing the specified action creator. 
The function takes the current state, and the payload of the action creator's action (if the action has a payload) as arguments.
The result of executing the function will be a new state.
```typescript
const initialState = 0;
const incrementByOne = getCreator('incrementByOne');
const incrementByValue = getCreator('incrementByValue').load()

const reducer = setupReducer(initialState)
        .on(incrementByOne, (state) => state + 1)
        .on(incrementByValue, (state, payload) => state + payload)
        .create()
```
You can provide a static value instead of a function and this value will become the new state.
```typescript
const initialState = 0;
const switchToOne = getCreator('switchToOne');

const reducer = setupReducer(initialState)
        .on(switchToOne, 1)
        .create()
```
To handle multiple creators that trigger the same logic, put an array with these creators as an argument.
```typescript
const initialState = 0;
const increment = getCreator('increment');
const incrementAsync = getAsyncCreator('incrementAsync');

const reducer = setupReducer(initialState)
        .on([increment, incrementAsync.SUCCESS], (state) => state + 1)
        .create()
```
#### Handling only the payload
In some cases, you do not need the current state to compute a new one.
If your state is determined only from the payload, use the `getFromPayload` method.

Executes the specified function while processing the specified action creator.
This method is similar to [.on](#basic-usage) method, but its handler function does not accept a state, _but only a payload_.
This is useful when the state depends only on the payload.
The result of executing the function will be a new state.

```typescript
const incrementWithComplexPayload = getCreator('incrementWithComplexPayload');
// For this example, the payload would be { value: 10, incrementetBy: 'user' }

const valueReducer = setupReducer(0)
        .getFromPayload(incrementWithComplexPayload, (payload) => payload.value + 1)
        .create()

const lastIncrementorReducer = setupReducer(null)
        .getFromPayload(incrementWithComplexPayload, (payload) => payload.user)
        .create()
```
In this case you cannot provide a static value instead of a handler function.
To handle multiple creators that trigger the same logic, put an array with these creators as an argument.
Note, that their payload must be the same.
```typescript
const initialState = 0;
const incrementWithComplexPayload = getCreator('incrementWithComplexPayload');
const incrementWithComplexPayloadAsync = getCreator('incrementWithComplexPayloadAsync');

const reducer = setupReducer(initialState)
        .getFromPayload([incrementWithComplexPayload, incrementWithComplexPayloadAsync.SUCCESS], (payload) => payload.value + 1)
        .create()
```
#### Switching to the payload
If you do not need to process the payload, but simply want to replace the current state with it, use the `switchToPayload` method.

This method only accepts the action creator.
When a given action creator takes over, the state will be replaced by the creator's payload.
```typescript
const setNewValue = getCreator('setNewValue');

const valueReducer = setupReducer(0)
        .switchToPayload(setNewValue)
        .create()
```
If you need to create the same logic for multiple action creators, just put these creators as arguments.
```typescript
const setNewValue = getCreator('setNewValue');
const setNewValueAsync = getCreator('setNewValue');

const valueReducer = setupReducer(0)
        .switchToPayload(setNewValue, setNewValueAsync.SUCCESS)
        .create()
```
#### Resetting the state
If you need to reset the state to it's initial value, use the `reset` method.

This method only accepts the action creator.
When a given action creator takes over, the state will be switched to it's initial value.
```typescript
const resetValue = getCreator('resetValue');

const valueReducer = setupReducer(0)
        .reset(resetValue)
        .create()
```
Put multiple creators as arguments, if you need to create the same logic for them. 
```typescript
const resetValue = getCreator('resetValue');
const resetValueAsync = getCreator('resetValueAsync');

const valueReducer = setupReducer(0)
        .switchToPayload(resetValue, resetValueAsync.SUCCESS)
        .create()
```
#### Injecting logic
`work in progress`
## Usage with Typescript

### Typing action creators

#### Action creator with payload
By default, the action creator with a payload can accept any type of argument.
To define a type, use a generic for `load` method or `payload` function.
```typescript
import { getCreator, getAsyncCreator, payload } from 'redux-smart-creators'

const incrementByValue = getCreator('incrementByOne').load<number>();
incrementByValue('10') // Type Error;
incrementByValue(10) // Correct type;

const incrementByValueAsync = getAsyncCreator('incrementByValueAsync').load({
  INIT: payload<number>(),
})
incrementByValueAsync.INIT('10') // Type Error;
incrementByValueAsync.INIT(10) // Correct type;
```
If you use your function to define a payload, its typing will be used in the action creator.
```typescript
import { getCreator, getAsyncCreator } from 'redux-smart-creators'

const incrementManyTimes = getCreator('incrementManyTimes').load((value: number, times: number) => {
  return value * times;
});
incrementManyTimes('10', 15) // Type Error;
incrementManyTimes(10, 15) // Correct type;

const roundValueAsync = getAsyncCreator('roundValueAsync').load({
  INIT: Math.round,
})
roundValueAsync.INIT('10.171') // Type Error;
roundValueAsync.INIT(10.99) // Correct type;
```

#### Asynchronous action creator's steps
Steps will be automatically typed if you define them during a `getAsyncCreator` or `getCreatorsPack` function call.
If you define steps as a constant and then use it during a function call, the steps remain untyped.
To fix this, directly define the type for the array with steps.
```typescript
import { getAsyncCreator } from 'redux-smart-creators'

// Correct usage:
getAsyncCreator('roundValueAsync', ['first', 'second']);

// Incorrect usage, steps will not be defined in the action creator's type:
const untypedSteps = ['first', 'second']
getAsyncCreator('roundValueAsync', untypedSteps);

// Correct usage:
type Steps = 'first' | 'second';
const typedSteps: Steps[] = ['first', 'second']
getAsyncCreator('roundValueAsync', typedSteps);
```

#### Inferring root action
Often you need to get the root action (a union type of multiple actions).
To get it, combine all exported action creators into one object and use it in the `InfetActions` generic type.
```typescript
/** counterActions.ts */
import { getCreator, getAsyncCreator, payload } from 'redux-smart-creators'

export const increment = getCreator('increment');
export const incrementByValue = getCreator('incrementByValue').load<number>();

export const asyncIncrementManyTimes = getAsyncCreator('asyncIncrementManyTimes').load({
  INIT: (value: number, times: number): number => value * times,
  SUCCESS: payload<boolean>(),
  FAILURE: ({ message }: Error) => message
});

/** serverActions.ts */
export const checkServerStatusAsync = getAsyncCreator('checkServerStatusAsync');

/** types.ts */
import { InferActions } from 'redux-smart-creators';
import * as counterActions from './counterActions';
import * as serverActions from './serverActions';

export type CounterActions = InferActions<typeof counterActions>
/**
 * | { type: 'increment' }
 * | { type: 'incrementByValue', payload: number }
 * | { type: 'asyncIncrementManyTimes[INIT]', payload: number }
 * | { type: 'asyncIncrementManyTimes[LOADING]' }
 * | { type: 'asyncIncrementManyTimes[SUCCESS]', payload: boolean }
 * | { type: 'asyncIncrementManyTimes[FAILURE]', payload: string }
 */

export type ServerActions = InferActions<typeof serverActions>
/**
 * | { type: 'checkServerStatusAsync[INIT]' }
 * | { type: 'checkServerStatusAsync[LOADING]' }
 * | { type: 'checkServerStatusAsync[SUCCESS]' }
 * | { type: 'checkServerStatusAsync[FAILURE]' }
 */

export type RootAction = CounterActions | ServerActions

```
### Typing reducers
`work in progress`