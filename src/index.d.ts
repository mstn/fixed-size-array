// we use numeric literal types for length as TS 2.7 does for fixed size tuples
// N is the length of the array
// T is the type of array elements
export type FixedSizeArray<N extends number, T> = N extends 0 ? never[] : {
    0: T;
    length: N;
} & ReadonlyArray<T>;
