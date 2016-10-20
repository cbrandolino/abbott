/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map, Set, Record, OrderedSet, Seq } from 'immutable';
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

const pointDimensions = {
  x: 'myBandKey',
  y: 'value',
};

const pointsObj = {
  payloads: pointPayloads,
  dimensions: pointDimensions,
}

const fancyPayloads = [{ myX: 1, doubleY: 2 }];
const fancyDimensions = { x: 'myX', y: (it) => (it.doubleY / 2) };
const fancyObject = {
  payloads: fancyPayloads,
  dimensions: fancyDimensions,

}


describe('Types: Series', () => {

  const s = Series.fromPayloads(pointsObj, {});

  describe('#fromPayloads()', () => {
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
      const fancyS = Series.fromPayloads(fancyObject)
      expect(fancyS.data.first().x).to.equal(1);
      expect(fancyS.data.first().y).to.equal(1);
    })
  });

  describe('#select()', () => {
    it('Chages the selected range', () => {
      const s1 = s.select(1, 2);
      expect(s.selected.size).to.equal(2);
      expect(s1.selected.first().x).to.equal(5);
    })
  });

  describe('#at()', () => {
    it('Gets data for a given band', () => {
      expect(s.at(3).y).to.equal(6);
    });
    it('Gets an empty point when accessing nonexistant index', () => {
      expect(s.at(4)).to.eql(new Point());
    });
    it('Only gets data from selection if such option is set', () => {
      const s1 = s.select(1, 2).load(morePayloads);
      expect(s1.at(3, true)).to.eql(new Point());
    })
  })

  describe('#selected()', () => {
    it('Includes the whole series at the start', () => {
      expect(s.selected.size).to.equal(2);
    });
    it('Changes the selection to the start and \n\
      end of the new series when updating', () => {
      const s1 = s.load(morePayloads);
      expect(s1.selected.size).to.equal(4);

    });
    it('Does not change the selection to the start and \
      end when a selection is already present', () => {
      const s1 = s.select(1, 2).load(morePayloads);
      expect(s1.selected.size).to.equal(1);
    });
  });

  describe('#bands', () => {
    it('Provides getter for current bands', () => {
      expect(s.bands).to.eql(OrderedSet.of(3, 5));
    })
  });

});
