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

<p>Strong typed tools for fast and declarative Redux development</p>

</div>

## Documentation

Examples

`WIP`

Getting Started

- [Installation](#installation)
- [Creating actions](#creating-actions)
- [Creating asynchronous actions](#creating-asynchronous-actions)
- [Creating reducers](#creating-reducers)

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

### Creating actions
```typescript
import { getCreator } from 'redux-smart-creators'
```
#### Actions without Payload
Use `getCreator` function with provided action type as single argument:
```typescript
/** actions.ts */
const sing = getCreator('sing');

/** somewhere else */
store.dispatch(sing())
```
#### Actions with Payload
After getting basic creator you can inject a payload into it using `load` method:
```typescript
/** actions.ts */
const singSomething = getCreator('singSomething').load()

/** somewhere else */
store.dispatch(sing('random song'))
```
#### Providing types and payload functions
You can provide generic payload type for `load` method or inject your own logic for action creator
```typescript
/** actions.ts */
const rateSong = getCreator('singFavoriteSong').load<number>()

const singManyTimes = getCreator('singManyTimes').load((song: string, repeats: number): string => {
  return song.repeat(repeats)
})

/** somewhere else */
store.dispatch(rateSong('10')) // Type error!
store.dispatch(rateSong(10)) // Correct type

store.dispatch(singManyTimes('favoriteSong', 10))
```
### Creating asynchronous actions
```typescript
/** actions.ts */
import { getAsyncCreator } from 'redux-smart-creators'
```
#### Actions without Payload
Use `getAsyncCreator` function with provided action type as single argument.
By default, it returns an object with four **steps** (`INIT`, `LOADING`, `SUCCESS`, `FAILURE`), represented as action creators. 
All of them will have computed action type, consisting of the type specified in the `getAsyncCreator` and the **step** name
```typescript
/** actions.ts */
const singAsync = getAsyncCreator('sing');

console.log(singAsync.INIT.type) // sing[INIT]

/** somewhere else */
store.dispatch(singAsync.INIT())
store.dispatch(singAsync.LOADING())
store.dispatch(singAsync.SUCCESS())
store.dispatch(singAsync.FAILURE())
```
#### Customizing creators

### Creating reducers
`WIP`