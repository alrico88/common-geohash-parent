const GeohashService = require('./services/GeohashService');
const {default: bboxPolygon} = require('@turf/bbox-polygon');

/**
 * @typedef {string[]} ParentGeohashList
 */

/**
 * @typedef OptimizationOptions
 * @property {boolean} enabled
 * @property {number} maxParents
 */

/**
 * ParentFinder class
 *
 * @class ParentFinder
 */
class ParentFinder {

  /**
   * Creates an instance of ParentFinder.
   * @param {number} parentPrecision Initial parent precision
   * @param {OptimizationOptions} [optimization] If desired, specify optimization options
   * @memberof ParentFinder
   */
  constructor(parentPrecision, optimization) {
    this.precision = parentPrecision;
    this.optimization = optimization ? optimization : {enabled: false};
  }

  /**
   * Finds common parents from array of points
   *
   * @param {Array.<number[]>} points [lon, lat]
   * @returns {ParentGeohashList} Array of geohashes
   * @memberof ParentFinder
   */
  fromPoints(points) {
    const parents = new Set();
    points.forEach(([lon, lat]) => {
      parents.add(GeohashService.encodeHash(lat, lon, this.precision));
    });
    return this.checkResultOptimization(
      Array.from(parents),
      'fromPoints',
      points
    );
  }

  /**
   * Finds common parents from array of geohashes
   *
   * @param {string[]} hashes List of geohashes
   * @returns {ParentGeohashList} List of parent geohashes
   * @memberof ParentFinder
   */
  fromGeohashes(hashes) {
    const parents = new Set();
    hashes.forEach((hash) => {
      parents.add(hash.slice(0, this.precision));
    });
    return this.checkResultOptimization(
      Array.from(parents),
      'fromGeohashes',
      hashes
    );
  }

  /**
   * Finds common parents from bounding box
   *
   * @param {number[]} bbox [number, number, number, number]
   * @returns {Promise<ParentGeohashList>} Promise of list of parent geohashes
   * @memberof ParentFinder
   */
  fromBBox(bbox) {
    const asPoly = bboxPolygon(bbox);
    return this.fromPolygon(asPoly);
  }

  /**
   * Finds common parents from polygon feature
   *
   * @param {object} inputPolygon GeoJSON shape
   * @returns {Promise<ParentGeohashList>} Promise of list of parent geohashes
   * @memberof ParentFinder
   */
  async fromPolygon(inputPolygon) {
    const parents = await GeohashService.findHashesInside(
      inputPolygon,
      this.precision
    );
    return this.checkResultOptimization(parents, 'fromPolygon', inputPolygon);
  }

  /**
   * Checks if the response meets the optimization criteria
   *
   * @private
   * @param {string[]} parents Parents list
   * @param {string} method Class method used before
   * @param {*} input The input param for the method
   * @returns {(ParentGeohashList|Promise<ParentGeohashList>)} Method response
   * @memberof ParentFinder
   */
  checkResultOptimization(parents, method, input) {
    const MIN_PRECISION = 1;
    if (this.optimization.enabled && this.precision > MIN_PRECISION) {
      if (parents.length > this.optimization.maxParents) {
        const finder = new ParentFinder(this.precision - 1, this.optimization);
        return finder[method](input);
      } else {
        return parents;
      }
    } else {
      return parents;
    }
  }
}

module.exports = ParentFinder;
