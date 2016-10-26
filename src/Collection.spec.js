/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map, List } from 'immutable';
import { expect } from 'chai';
import Collection from './Collection';

const cAttributes = Map({
  id: 'GOOGL',
});

const cPayload = Map([
  [ 0, { myBandKey: 5, value: 10 } ],
  [ 1, { myBandKey: 6, value: 12 } ],
]);

describe('Types: Collection', () => {
  const c = new Collection(cAttributes, cPayload);
  describe('#equals()', () => {
    const c1 = new Collection(cAttributes, cPayload);
    it('considers two series with same data and attributes as equal', function() {
      expect(c.equals(c1)).to.be.true;
    });
  });
  describe('#[Symbol.iterator]() delegating to #data\'s iterator', () => {
    it('supports destructuring', () => {
      const [...elements] = c;
      expect(elements).to.eql(cPayload.toArray());
    });
  });
});
