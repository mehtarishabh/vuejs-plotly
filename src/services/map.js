// External
import * as d3 from 'd3'

// Internal
import INDIA_STATES_GEOJSON from '../assets/states_india.json'
import INDIA_CENSUS_JSON from '../assets/india_census.json'

// Constants
const MAP_CSV_URL = `https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv`

// This returns the data and layout used 
// for generating plotly maps for INDIA
const getIndiaMapFigures = () => {
      for (let feature of INDIA_STATES_GEOJSON['features']) {
        feature['id'] = feature['properties']['state_code']
      }
      function unpack(rows, key) {
        return rows?.map(function (row) {
          return row[key]
        })
      }
      const data = [
        {
          type: 'choropleth',
          locationmode: 'geojson-id',
          locations: unpack(INDIA_CENSUS_JSON, 'id'),
          z: unpack(INDIA_CENSUS_JSON, 'Density'),
          text: unpack(INDIA_CENSUS_JSON, 'State or Union Territory'),
          geojson: INDIA_STATES_GEOJSON,
          zmin: 0,
          zmax: 17000,
          colorscale: [
            [0, 'rgb(242,240,247)'],
            [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'],
            [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'],
            [1, 'rgb(84,39,143)']
          ],
          colorbar: {
            title: 'Population',
            thickness: 10
          },
          marker: {
            line: {
              color: 'rgb(255,255,255)',
              width: 1
            }
          },
        }
      ]

      const layout = {
        title: '2023 population density by state',
        geo: {
          scope: 'asia',
          showlakes: true,
          lakecolor: 'rgb(255,255,255)',
          fitbounds: "locations",
          visible: false
        }
      }
      return { data, layout }
}


// This returns the data and layout used for 
// generating plotly maps for USA
const getUSAMapFigures = () => {
  return new Promise((resolve) => {
    d3.csv(MAP_CSV_URL).then(function (rows) {
      function unpack(rows, key) {
        return rows?.map(function (row) {
          return row[key]
        })
      }

      const data = [
        {
          type: 'choropleth',
          locationmode: 'USA-states',
          locations: unpack(rows, 'code'),
          z: unpack(rows, 'total exports'),
          text: unpack(rows, 'state'),
          zmin: 0,
          zmax: 17000,
          colorscale: [
            [0, 'rgb(242,240,247)'],
            [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'],
            [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'],
            [1, 'rgb(84,39,143)']
          ],
          colorbar: {
            title: 'Millions USD',
            thickness: 10
          },
          marker: {
            line: {
              color: 'rgb(255,255,255)',
              width: 2
            }
          }
        }
      ]

      const layout = {
        title: '2011 US Agriculture Exports by State',
        geo: {
          scope: 'usa',
          showlakes: true,
          lakecolor: 'rgb(255,255,255)'
        }
      }
      console.log(data, layout)
      resolve({ data, layout })
    })
  })
}

export { getUSAMapFigures, getIndiaMapFigures }
