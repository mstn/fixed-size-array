// we use numeric literal types for length as TS 2.7 does for fixed size tuples
// N is the length of the array
// T is the type of array elements
// M is a dummy type inizialized to '0', we need it to trick the compiler
export type FixedSizeArray<N extends number, T, M extends string = '0'> = {
    [k in M]: any;
} & { length: N } & ReadonlyArray<T>;
