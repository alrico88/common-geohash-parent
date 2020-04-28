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
   * @param {number} lat Latitude
   * @param {number} lon Longitude
   * @param {number} precision Desired geohash length
   * @returns {string} Encoded geohash
   * @memberof GeohashService
   */
  static encodeHash(lat, lon, precision) {
    return ghash.encode(lat, lon, precision);
  }

  /**
   * Finds list of geohashes inside shape
   *
   * @static
   * @param {object} inputPolygon The GeoJSON input
   * @param {number} precision Desired geohash length
   * @returns {Promise<string[]>} Promise with list of geohashes inside
   * @memberof GeohashService
   */
  static findHashesInside(inputPolygon, precision) {
    return shape2geohash(inputPolygon, {
      precision,
    });
  }
}

module.exports = GeohashService;
