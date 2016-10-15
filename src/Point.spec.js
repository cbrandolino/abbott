/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */

import { expect } from 'chai';
import Point from './Point';

const orderlyPayload = { x: 2, y: 1, z: 2 };
const dimensionKeys = [ 'x', 'y', 'z' ];
const fancyPayload = { halfX: 1, doubleY: 2 };
const mixedPayload = { halfX: 1, y: 2 };
const id = "Pointy McPointface";

describe('Types: Point', function() {

  describe('Meta', function() {
    const p = new Point(id, orderlyPayload);
    it('gets copy of payload', function() {
      expect(p.payload).to.eql(orderlyPayload);
      const wontChangeProp = p.payload;
      wontChangeProp.x = null;
      expect(p.payload).to.eql(orderlyPayload);
    });
    it('gets id', function() {
      expect(p.id).to.eql(id);
    });
  });

  describe('Dimensions', function() {
    describe('Default dimensions', function() {
      const p = new Point(id, orderlyPayload);
      it('exposes default dimensions', function() {
        expect(p.x).to.equal(2);
      });
    });
  });
});

