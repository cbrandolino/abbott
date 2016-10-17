/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map, Set } from 'immutable';
import { expect } from 'chai';
import Series from './Series';
import Point from './Point';


const pointPayloads = [
  { myBandKey: 5, value: 10 },
  { myBandKey: 3, value: 6 },
];

const morePayloads = [
  { myBandKey: 7, value: 14 },
  { myBandKey: 1, value: 2 },
];

const stillMore = [
  { myBandKey: 9, value: 18 },
];
const pointDimensions = {
  x: 'myBandKey',
  y: 'value',
};

const pointsObj = {
  payloads: pointPayloads,
  dimensions: pointDimensions,
}

describe('Types: Series', () => {
  const s = new Series(pointsObj, {});

  describe('constructor: .data with default options', () => {
    it('initializes .data as an Map of points', () => {
      expect(s).to.be.instanceOf(Map);
      expect(s.first()).to.be.instanceOf(Point);
    });
    it('sets keys to x dimension of points', () => {
      expect(s.first().x).to.equal(3);
    });
  });

  describe('constructor: .data with custom bandDimension', () => {
    const s1 = new Series(pointsObj, { bandDimension: 'y' });
    it('sets keys to dimension specified in bandDimension', () => {
      expect(s1.toArray()[0].x).to.equal(3);
    });
  });

  describe('#addPoints()', () => {
    const s1 = s.load(morePayloads)
    it('Adds the points passed to it', () => {
      expect(s1.size).to.equal(4);
    });
    it('Does not modify the original Series', () => {
      expect(s.size).to.equal(2);
      expect(s1.size).to.equal(4);
    });
  });

  describe('#selected()', () => {
    it("Includes the whole series at the start", () => {
      expect(s.selected().size).to.equal(2);
    });
    it("Changes the selection to the start and \
        end of the new series when updating", () => {
        expect(s.load(morePayloads).size).to.equal(4)
    });
  });

  describe('#select()', () => {
    it("Chages the selected range")
  });
});
