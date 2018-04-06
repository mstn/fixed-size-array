# Typescript type for fixed size arrays

This package contains type definitions for arrays of fixed length in Typescript.
The size of the arrays is checked **at compile time**.

It could be useful in a variety of cases. For example, checking if the correct number of
configuration options are passed to a function.

At the moment, we can use only immutable arrays since arithmetic operations over numeric literals have not been implemented in Typescript, yet.
Workarounds without using numeric literals (e.g. define numbers by recursion) look too hacky and impractical, but any suggestion is welcome!

## Bugs and issues

Apparently, the package works as expected for many practical cases.
Howerver, I do not know if its behavior is always correct.
Feel free to open an issue on github if you meet something odd.

## Example

```javascript
import { FixedSizeArray } from 'fixed-size-array';

// define a string array of length 2
let d: FixedSizeArray<2, string>;

d = ['a', 'b']; // ok
d[0] = 'a2'; // ok
d[2] = 'c2'; // type error
d = ['a']; // type error
d = ['a', 'b', 'c']; // type error
d = ['a', true]; // type error

d.push('d'); // type error       

// define an empty array of strings            
let e: FixedSizeArray<0, string>;
// we get an error, but it is not what we want
// however, in this case void could be a better type
// why do we want to define an immutable array of zero elements?                    
e = []; // type error
e = [] as string[]; // type error

// with objects does not work, as wanted
let o: FixedSizeArray<2, string>;
o = {
  length: 2,
  0: 'a',
  1: 'b'
  // type error
  // missing array methods
}

o = {
  length: 2,
  0: 'a',
  1: 'b',
  'l': 'c'
  // type error
  // spurious property name
}

```

## Current problems and limitations

```javascript
interface Fun<N extends number, M extends number> {
  (a: FixedSizeArray<N, number>): FixedSizeArray<M, number>;
}
let f: Fun<2,3>;

// type error
f = function(v: [number, number]) {
  return [1,2,3]
}

// ok
f = function(v: FixedSizeArray<2, number>) {
  return [1,2,3]
}

//ok
f([1,2]);
```

## Credits

We use the same trick to assign a numeric literal to length as it was [done](https://github.com/Microsoft/TypeScript/pull/17765) in TS 2.7 for tuples of fixed size.

Type definition had been simplified as suggested [here](https://github.com/Microsoft/TypeScript/issues/6229#issuecomment-376988681) by @tycho01.
