/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map, Set, Record } from 'immutable';
import { expect } from 'chai';
import SeriesCollection from './SeriesCollection';
import Point from './Point';


const payloads = [
  {
    id: 'seriesA',
    payloads: [
      { myBandKey: 5, value: 10 },
      { myBandKey: 3, value: 6 },
      { myBandKey: 7, value: 14 },
    ],   
  },
  {
    id: 'seriesB',
    payloads: [
      { myBandKey: 7, value: 14 },
      { myBandKey: 9, value: 18 },
      { myBandKey: 1, value: 2 },
    ],   
  },
];

const pointDimensions = {
  x: 'myBandKey',
  y: 'value',
};


describe('Types: SeriesCollection', () => {
  const c = SeriesCollection.fromPayloads(payloads, { pointDimensions });


});
