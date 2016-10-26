/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map, OrderedSet } from 'immutable';
import { expect } from 'chai';
import Series from './Series';
import Point from './Point';

const seriesAttributes = {
  id: 'GOOGL',
}

const pointPayload = [
  { myBandKey: 5, value: 10 },
  { myBandKey: 3, value: 6 },
];

const pointDimensions = {
  x: 'myBandKey',
  y: 'value',
};

const fancyPayload = [{ myX: 1, doubleY: 2 }];
const fancyDimensions = { x: 'myX', y: (it) => (it.get('doubleY') / 2) };

describe('Types: Series', () => {
  const s = Series.fromPayload(seriesAttributes, pointPayload, pointDimensions);
  describe('#fromPayload()', () => {
    it('returns a series', () => {
      expect(s).to.be.instanceOf(Series);
    });
    it('initializes .data as an Map of points', () => {
      expect(s.data).to.be.instanceOf(Map);
      expect(s.data.first()).to.be.instanceOf(Point);
    });
    it('sets keys to x dimension of points', () => {
      expect(s.data.first().x).to.equal(3);
    });
    it('supports fancy transforms for dimensions', () => {
      const fancyS = Series.fromPayload(seriesAttributes, fancyPayload, fancyDimensions)
      expect(fancyS.data.first().x).to.equal(1);
      expect(fancyS.data.first().y).to.equal(1);
    })
  });

  describe('#at()', () => {
    it('Gets data for a given band', () => {
      expect(s.at(3).y).to.equal(6);
    });
    it('Gets an empty point when accessing nonexistant index', () => {
      expect(s.at(4)).to.eql(new Point());
    });
  })

  describe('#bands, #addBands()', () => {
    const s1 = s.addBands(OrderedSet.of(11));
    it('Provides getter for current bands', () => {
      expect(s.bands).to.eql(OrderedSet.of(3, 5));
    });
    it('Adds dummy points in empty bands through #addBands()', () => {
      expect(s1.size).to.equal(3);
      expect(s1.at(11).y).to.equal(0);
    });
  });

  describe('#equals()', () => {
    const s1 = Series.fromPayload(seriesAttributes, pointPayload, pointDimensions);
    it('considers two series with same data and attributes as equal', function() {
      expect(s.equals(s1)).to.be.true;
    });
  })

  describe('#segments', () => {
    const s1 = s.addBands(OrderedSet.of(11, 13));
    it('Returns subsets containing contiguous non-dummy Points', () => {
      expect(s1.segments).to.have.length.of(1);
      expect(s1.segments[0]).to.have.length.of(2);
    });
  });

});
