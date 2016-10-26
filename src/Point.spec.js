/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { Map } from 'immutable';


import Point from './Point';


const orderlyPayload = { x: 2, z: 2 };
const fancyPayload = { myX: 1, doubleY: 2 };
const fancyDimensions = { x: 'myX', y: (it) => (it.get('doubleY') / 2) };
const mixedPayload = { halfX: 1, y: 2 };
const id = "Pointy McPointface";

describe('Types: Point', function() {

  describe('Meta', function() {
    const p = new Point(orderlyPayload, {}, { id });
    const pl = Map(orderlyPayload);
    it('gets hash of payload', function() {
      expect(p.payload.equals(pl)).to.be.true;
      const wontChangeProp = p.payload;
      wontChangeProp.x = null;
      expect(p.payload.equals(pl)).to.be.true;
    });
    it('gets id', function() {
      expect(p.id).to.eql(id);
    });
  });

  describe('Dimension getters', function() {
    describe('Default dimensions', function() {
      const p = new Point(orderlyPayload);
      it('exposes default dimensions', function() {
        expect(p.x).to.equal(2);
      });
      it('returns undefined if dimension is not present in payload', function() {
        expect(p.y).to.be.undefined;
      });
      it('throws when trying to access prop not present in dimensions', function() {
        expect(p.w).to.throw;
      });
    });
    
    describe('Custom dimension transformers', function() {
      const p = new Point(fancyPayload, fancyDimensions);
      it('Works with keys', function() {
        expect(p.x).to.equal(1);
      });
      it('returns undefined if dimension is not present in payload', function() {
        expect(p.z).to.be.undefined;
      });
      it('works with transformer functions', function() {
        expect(p.y).to.equal(1);
      });
      it('mixes and matches default and custom dimensions', function() {
        expect((new Point(mixedPayload, { x: (it) => (it.get('halfX') * 2) })).x).to.equal(2);
      })
    });
  });
});

