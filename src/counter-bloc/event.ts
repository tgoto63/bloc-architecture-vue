export type Increment = {
  type: "increment";
  count: number;
};

export type Decrement = {
  type: "decrement";
  count: number;
};

export type AsyncIncrement = {
  type: "async-increment";
  count: number;
};

export type AsyncFinish = {
  type: "async-finish";
  nextSink: "increment" | "decrement";
  count: number;
};

export type AsyncDecrement = {
  type: "async-decrement";
  count: number;
};

export type EventType =
  | Increment
  | Decrement
  | AsyncIncrement
  | AsyncFinish
  | AsyncDecrement;
