const ParentHashFinder = require('./index');

const arrayOfPointsSameParent = [
  [-3.701313989865374, 40.42444132659549],
  [-3.6962489531032854, 40.42460467545006],
];

const arrayOfPointsMultipleParents = [
  [-3.701313989865374, 40.42444132659549],
  [-3.6962489531032854, 40.42460467545006],
  [14.596210700037997, 47.010225655683485],
];

const testGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-3.7291717529296875, 40.45844200118894],
            [-3.7296867370605464, 40.4579195465031],
            [-3.719558715820312, 40.45295602435479],
            [-3.769512176513672, 40.45517659274668],
            [-3.774662017822266, 40.41820110334611],
            [-3.7123489379882812, 40.42473535424809],
            [-3.6646270751953125, 40.45805016055547],
            [-3.693981170654297, 40.47750881660339],
            [-3.7291717529296875, 40.45844200118894],
          ],
        ],
      },
    },
  ],
};

test('Array of coordinates under same parent geohash should return parent geohash', () => {
  const finder = new ParentHashFinder(5);
  expect(finder.fromPoints(arrayOfPointsSameParent)).toEqual(['ezjmg']);
});

test('Array of coordinates under different parent geohash should return more than one geohash parent', () => {
  const finder = new ParentHashFinder(5);
  expect(finder.fromPoints(arrayOfPointsMultipleParents).length).toBeGreaterThan(1);
});

test('Sometimes its impossible to find common parents of a certain precision', () => {
  const finder = new ParentHashFinder(7, {
    enabled: true,
    maxParents: 1,
  });
  expect(finder.fromPoints(arrayOfPointsMultipleParents).length).toEqual(2);
});

test('Shape with multiple geohashes of a certain precision should return more than one geohash parent', async () => {
  const finder = new ParentHashFinder(5);
  const data = await finder.fromPolygon(testGeoJSON);
  expect(data.length).toBeGreaterThan(1);
});

test('Any kind of shape should work', async () => {
  const finder = new ParentHashFinder(5);
  const data = await finder.fromPolygon(testGeoJSON.features[0]);
  expect(data.length).toBeGreaterThan(1);
});

test('Shape with multiple geohashes with optimization on should return the number of results set in the options', async () => {
  const finder = new ParentHashFinder(5, {
    enabled: true,
    maxParents: 2,
  });
  const data = await finder.fromPolygon(testGeoJSON);
  expect(data.length).toEqual(2);
});
