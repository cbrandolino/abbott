import { Record } from 'immutable';

const Meta = Record({
  bandDimension: "x",
  payloads: [],
  dimensions: {},
  pointOptions: {},
});

const Chunk = Record({
  start: null,
  end: null,
});

export { Meta, Chunk };
