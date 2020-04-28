const ghash = require('ngeohash');
const shape2geohash = require('shape2geohash');

/**
 * GeohashService class
 *
 * @class GeohashService
 */
class GeohashService {

  /**
   * Encodes a geohash
   *
   * @static
   * @param {number} lat
   * @param {number} lon
   * @param {number} precision
   * @returns {string}
   * @memberof GeohashService
   */
  static encodeHash(lat, lon, precision) {
    return ghash.encode(lat, lon, precision);
  }

  /**
   * Finds list of geohashes inside shape
   *
   * @static
   * @param {object} inputPolygon
   * @param {number} precision
   * @returns {Promise<string[]>}
   * @memberof GeohashService
   */
  static findHashesInside(inputPolygon, precision) {
    return shape2geohash(inputPolygon, {
      precision,
    });
  }
}

module.exports = GeohashService;
