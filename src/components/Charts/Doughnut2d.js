// STEP 1 - Include Dependencies
// Include react
import React from 'react'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.ocean'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const ChartComp = ({ data }) => {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: 'doughnut2d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Stars Per Language',
        theme: 'ocean',
        decimals: 0,
        doughnutRadius: '50%',
        showPercentValues: 0,
      },
      // Chart Data
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default ChartComp
