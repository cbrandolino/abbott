/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { OrderedMap } from 'immutable';
import SeriesCollection from './SeriesCollection';
import Series from './Series';

const seriesFixtures = [
  {
    attributes: { id: 'mySeries' },
    payload: [
      { myBandKey: 5, value: 10 },
      { myBandKey: 3, value: 6 },
      { myBandKey: 7, value: 14 },
    ],   
  },
  {
    attributes: { id: 'myOtherSeries' },
    payload: [
      { myBandKey: 7, value: 14 },
      { myBandKey: 9, value: 18 },
      { myBandKey: 1, value: 2 },
    ],   
  },
];

const dimensions = {
  x: 'myBandKey',
  y: 'value',
};

describe('Types: SeriesCollection', () => {
  const c = SeriesCollection.fromPayloads(seriesFixtures, dimensions);
  describe('#fromPayloads()', () => {

    it('returns a SeriesCollection instance', () => {
      expect(c).to.be.instanceOf(SeriesCollection);
    });
    it('contains a map of series as .data', () => {
      expect(c.data).to.be.instanceOf(OrderedMap);
      expect(c.data.first()).to.be.instanceOf(Series);
    })
  });

  describe('#at()', () => {
    it('returns a map with values from each series at the given band', () => {
      expect(c.at(5).first().y).to.equal(10);
      expect(c.at(5).last().y).to.equal(0);
    })
  });
});
