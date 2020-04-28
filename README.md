# Common geohash parent finder v0.1.0

Class with multiple methods to help you find the common parent geohash from points, geohashes, bounding boxes, polygons or other GeoJSON shapes.

## Installation

Using npm:

`npm i common-geohash-parent`

Using yarn:

`yarn add common-geohash-parent`

## Example usage

In node:

```javascript
const ParentFinder = require('common-geohash-parent');

const bbox = [-3.944092, 40.241799, -3.261566, 40.779502];
const precision = 5;
const finder = new ParentFinder(precision);
finder.fromBBox(bbox)
  .then((parents) => {
    // parents is ['ezjp','ezjr','ezjx','ezjn','ezjq','ezjw','ezjj','ezjm','ezjt','ezjh','ezjk','ezjs']
    ...
  });
```

## Classes

<dl>
<dt><a href="#ParentFinder">ParentFinder</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ParentGeohashList">ParentGeohashList</a> : <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#OptimizationOptions">OptimizationOptions</a></dt>
<dd></dd>
</dl>

<a name="ParentFinder"></a>

## ParentFinder

**Kind**: global class

- [ParentFinder](#ParentFinder)
  - [new ParentFinder()](#new_ParentFinder_new)
  - _instance_
    - [.fromPoints(points)](#ParentFinder+fromPoints) ⇒ [<code>ParentGeohashList</code>](#ParentGeohashList)
    - [.fromGeohashes(hashes)](#ParentFinder+fromGeohashes) ⇒ [<code>ParentGeohashList</code>](#ParentGeohashList)
    - [.fromBBox(bbox)](#ParentFinder+fromBBox) ⇒ [<code>Promise.&lt;ParentGeohashList&gt;</code>](#ParentGeohashList)
    - [.fromPolygon(inputPolygon)](#ParentFinder+fromPolygon) ⇒ [<code>Promise.&lt;ParentGeohashList&gt;</code>](#ParentGeohashList)
  - _static_
    - [.ParentFinder](#ParentFinder.ParentFinder)
      - [new ParentFinder(parentPrecision, [optimization])](#new_ParentFinder.ParentFinder_new)

<a name="new_ParentFinder_new"></a>

### new ParentFinder()

ParentFinder class

<a name="ParentFinder+fromPoints"></a>

### parentFinder.fromPoints(points) ⇒ [<code>ParentGeohashList</code>](#ParentGeohashList)

Finds common parents from array of points

**Kind**: instance method of [<code>ParentFinder</code>](#ParentFinder)  
**Returns**: [<code>ParentGeohashList</code>](#ParentGeohashList) - Array of geohashes

| Param  | Type                                            | Description |
| ------ | ----------------------------------------------- | ----------- |
| points | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | [lon, lat]  |

<a name="ParentFinder+fromGeohashes"></a>

### parentFinder.fromGeohashes(hashes) ⇒ [<code>ParentGeohashList</code>](#ParentGeohashList)

Finds common parents from array of geohashes

**Kind**: instance method of [<code>ParentFinder</code>](#ParentFinder)  
**Returns**: [<code>ParentGeohashList</code>](#ParentGeohashList) - List of parent geohashes

| Param  | Type                              | Description       |
| ------ | --------------------------------- | ----------------- |
| hashes | <code>Array.&lt;string&gt;</code> | List of geohashes |

<a name="ParentFinder+fromBBox"></a>

### parentFinder.fromBBox(bbox) ⇒ [<code>Promise.&lt;ParentGeohashList&gt;</code>](#ParentGeohashList)

Finds common parents from bounding box

**Kind**: instance method of [<code>ParentFinder</code>](#ParentFinder)  
**Returns**: [<code>Promise.&lt;ParentGeohashList&gt;</code>](#ParentGeohashList) - Promise of list of parent geohashes

| Param | Type                              | Description                      |
| ----- | --------------------------------- | -------------------------------- |
| bbox  | <code>Array.&lt;number&gt;</code> | [number, number, number, number] |

<a name="ParentFinder+fromPolygon"></a>

### parentFinder.fromPolygon(inputPolygon) ⇒ [<code>Promise.&lt;ParentGeohashList&gt;</code>](#ParentGeohashList)

Finds common parents from polygon feature

**Kind**: instance method of [<code>ParentFinder</code>](#ParentFinder)  
**Returns**: [<code>Promise.&lt;ParentGeohashList&gt;</code>](#ParentGeohashList) - Promise of list of parent geohashes

| Param        | Type                | Description   |
| ------------ | ------------------- | ------------- |
| inputPolygon | <code>object</code> | GeoJSON shape |

<a name="ParentFinder.ParentFinder"></a>

### ParentFinder.ParentFinder

**Kind**: static class of [<code>ParentFinder</code>](#ParentFinder)  
<a name="new_ParentFinder.ParentFinder_new"></a>

#### new ParentFinder(parentPrecision, [optimization])

Creates an instance of ParentFinder.

| Param           | Type                                                     | Description                              |
| --------------- | -------------------------------------------------------- | ---------------------------------------- |
| parentPrecision | <code>number</code>                                      | Initial parent precision                 |
| [optimization]  | [<code>OptimizationOptions</code>](#OptimizationOptions) | If desired, specify optimization options |

<a name="ParentGeohashList"></a>

## ParentGeohashList : <code>Array.&lt;string&gt;</code>

**Kind**: global typedef  
<a name="OptimizationOptions"></a>

## OptimizationOptions

**Kind**: global typedef  
**Properties**

| Name       | Type                 |
| ---------- | -------------------- |
| enabled    | <code>boolean</code> |
| maxParents | <code>number</code>  |
