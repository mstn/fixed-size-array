// we use numeric literal types for length as TS 2.7 does for fixed size tuples
// N is the length of the array
// T is the type of array elements
export type FixedSizeArray<N extends number, T> = {
    0: any;
    length: N;
} & ReadonlyArray<T>;
