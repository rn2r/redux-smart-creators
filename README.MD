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
</h1>

<p>Strongly typed tools for fast and declarative Redux development</p>

</div>

## Documentation

Examples

`WIP`

Getting Started

- [Installation](#installation)
- [Action creators](#action-creators)
  - [Basic action creators](#basic-action-creators)
  - [Asynchronous action creators]
  - [Retrieving the action type]
- [Reducers](#creating-asynchronous-actions)
- [Usage with Typescript]
  - [Action creators]

API

`WIP`

## Getting Started

### Installation

```bash
# with npm
npm install redux-smart-creators
# with yarn
yarn add redux-smart-creators
```

### Action creators
#### Basic action creators
```typescript
import { getCreator } from 'redux-smart-creators'
```
Use `getCreator` function with provided action type as single argument:
```typescript
const sing = getCreator('sing');

/** equal to:
 * const sing = () => ({ type: 'sing' }) 
 */

store.dispatch(sing()) // dispatched {type: 'singSomething'}
```
#### Actions with Payload
After getting basic creator you can inject a payload into it using `load` method:
```typescript
const singSomething = getCreator('singSomething').load()

/** equal to:
 * const singSomething = (anyPayload: any) => ({ type: 'singSomething', payload: anyPayload })
 */

store.dispatch(sing('song')) // dispatched {type: 'singSomething', payload: 'song'}
```
#### Providing types and payload functions
You can provide generic payload type for `load` method or inject your own logic for action creator
```typescript
const rateSong = getCreator('singFavoriteSong').load<number>()

/** equal to:
 * const rateSong = (rating: number) => ({ type: 'rateSong', payload: rating })
 */

const repeatSong = (song: string, repeats: number) => song.repeat(repeats);
const singManyTimes = getCreator('singManyTimes').load(repeatSong)

/** equal to:
 * const singManyTimes = (song: string, repeats: number) => ({ 
 *    type: 'singManyTimes', 
 *    payload: song.repeat(repeats) 
 *  })
 */

store.dispatch(rateSong('10')) // Type error!
store.dispatch(rateSong(10)) // dispatched {type: 'rateSong', payload: 10}

store.dispatch(singManyTimes('la', 2)) // dispatched {type: 'singManyTimes', payload: 'lala'}
```
### Creating asynchronous actions
```typescript
import { getAsyncCreator } from 'redux-smart-creators'
```
#### Asynchronous actions without Payload
Use `getAsyncCreator` function with provided action type as single argument.
By default, it returns an object with four **steps** (`INIT`, `LOADING`, `SUCCESS`, `FAILURE`), represented as action creators. 
All of them will have computed action type, consisting of the type specified in the `getAsyncCreator` and the **step** name
```typescript
const singAsync = getAsyncCreator('sing');

console.log(singAsync.INIT.type) // sing[INIT]

store.dispatch(singAsync.INIT()) // dispatched {type: 'sing[INIT]'}
store.dispatch(singAsync.LOADING()) // dispatched {type: 'sing[LOADING]'}
store.dispatch(singAsync.SUCCESS()) // dispatched {type: 'sing[SUCCESS]'}
store.dispatch(singAsync.FAILURE()) // dispatched {type: 'sing[FAILURE]'}
```
#### Defining own steps
If you want to define own **steps** (instead of `INIT`, `LOADING`, `SUCCESS`, `FAILURE`)
for asynchronous actions, provide them as array in second argument:
```typescript
const Async = getAsyncCreator('sing', ['start', 'finish', 'error']);

console.log(singAsync.start.type) // sing[start]

store.dispatch(singAsync.start()) // dispatched {type: 'sing[start]'}
store.dispatch(singAsync.finish()) // dispatched {type: 'sing[finish]'}
store.dispatch(singAsync.error()) // dispatched {type: 'sing[error]'}
```
#### Asynchronous actions creators with Payload
For injecting a payload to asynchronous action creator use `load` method and `payload` helper function.
You need to provide an object with steps you want to be injected with a payload.
For upgrading use `payload` function:
```typescript
import {payload} from 'redux-smart-creators'

const Async = getAsyncCreator('sing').load({
  INIT: payload(),
  SUCCESS: payload(),
})

store.dispatch(singAsync.INIT('init')) // dispatched {type: 'sing[INIT]', payload: 'init'}
store.dispatch(singAsync.SUCCESS(true)) // dispatched {type: 'sing[SUCCESS]', payload: true}
  
// The rest of the steps are left unchanged:

store.dispatch(singAsync.LOADING()) // dispatched {type: 'sing[LOADING]'}
store.dispatch(singAsync.FAILURE()) // dispatched {type: 'sing[FAILURE]'}
```
#### Providing payload functions
To create more complex actions, use your functions instead of imported `payload` function
```typescript
import {payload} from 'redux-smart-creators'

const payloadFunction = () => {}
const Async = getAsyncCreator('sing').load({
  INIT: payloadFunction, // You can use declared function
  SUCCESS: () => {}, // or inline functions
})

store.dispatch(singAsync.INIT('init')) // dispatched {type: 'sing[INIT]', payload: 'init'}
store.dispatch(singAsync.SUCCESS(true)) // dispatched {type: 'sing[SUCCESS]', payload: true}
  
// The rest of the steps are left unchanged:

store.dispatch(singAsync.LOADING()) // dispatched {type: 'sing[LOADING]'}
store.dispatch(singAsync.FAILURE()) // dispatched {type: 'sing[FAILURE]'}
```
### Creating reducers
`WIP`