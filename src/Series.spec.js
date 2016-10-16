/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map } from 'immutable';
import { expect } from 'chai';
import Series from './Series';
import Point from './Point';


const pointPayloads = [
  { myBandKey: 3, value: 6 },
  { myBandKey: 5, value: 10 },
];

const morePayloads = [
  { myBandKey: 7, value: 14 },
  { myBandKey: 1, value: 2 },
];

const pointDimensions = {
  x: 'myBandKey',
  y: 'value',
};

const pointsObj = {
  payloads: pointPayloads,
  dimensions: pointDimensions,
}

describe('Types: Series', function() {
  const s = new Series(pointsObj, {});

  describe('constructor: .data with default options', function() {
    it('initializes .data as an Map of points', function() {
      expect(s).to.be.instanceOf(Map);
      expect(s.first()).to.be.instanceOf(Point);
    });
    it('sets keys to x dimension of points', function() {
      expect(s.keySeq().first()).to.equal(3);
    });
  });

  describe('constructor: .data with custom myBandKeyDimension', function() {
    const s1 = new Series(pointsObj, { myBandKeyDimension: 'y' });
    it('sets keys to dimension specified in myBandKeyDimension', function() {
      expect(s1.keySeq().first()).to.equal(6);
    });
  });

  describe('#addPoints()', function() {
    const s1 = s.load(morePayloads);
    it('Adds the points passed to it', function() {
      expect(s1.get(7).y).to.equal(14);
    })
    it('Does not modify the original Series', function() {
      expect(s.size).to.equal(2);
      expect(s1.size).to.equal(4);
    })
  })

});
