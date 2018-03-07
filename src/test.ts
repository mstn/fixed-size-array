import { FixedSizeArray } from './';

let d: FixedSizeArray<2, string>;

d = ['a', 'b']; // ok
d[0] = 'a2'; // ok
d[2] = 'c2'; // type error
d = ['a']; // type error
d = ['a', 'b', 'c']; // type error
d = ['a', true]; // type error

d.push('d'); // type error

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

interface Fun<N extends number, M extends number> {
  (a: FixedSizeArray<N, number>): FixedSizeArray<M, number>;
}
let f: Fun<2,3>;

// type error
f = function(v: [number, number]) {
  return [1,2,3]
}

f = function(v: FixedSizeArray<2, number>) {
  return [1,2,3]
}
f([1,2]);

let g: [number, number];
let h: FixedSizeArray<2, number>;

h = [1, 2];
g = [1, 2];

h = g;
// type error
g = h;
