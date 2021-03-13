import React from 'react'
import { Chart } from "react-google-charts";

export class ChartTest extends React.Component<IChart> {

    data: any
    dataS: any

    constructor(props: IChart) {
        super(props)
        this.data = props.data
        this.dataS = props.dataS
    }


    render = () => {

        return (
<div style={{ display: 'flex', maxWidth: 900 }}>
  <Chart
    width={400}
    height={300}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Sex', 'Survived', 'Not Survived'],
      ['Male', this.data['maleSurvive'], this.data['maleNotSurvive']],
      ['Female', this.data['femaleSurvive'], this.data['femaleNotSurvive']]
    ]}
    options={{
      title: 'Survived per sex',
      chartArea: { width: '30%' },
      hAxis: {
        title: 'Survived titanic',
        minValue: 0,
      },
      vAxis: {
        title: 'Quantity',
      },
    }}
    legendToggle
  />

<Chart
    width={400}
    height={300}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Class', 'Survived', 'Not Survived'],
      ['Class 1', this.dataS['class1Survived'], this.dataS['class1NotSurvived']],
      ['Class 2', this.dataS['class2Survived'], this.dataS['class2NotSurvived']],
      ['Class 3', this.dataS['class3Survived'], this.dataS['class3NotSurvived']]
    ]}
    options={{
      title: 'Survived per sex',
      chartArea: { width: '30%' },
      hAxis: {
        title: 'Survived titanic',
        minValue: 0,
      },
      vAxis: {
        title: 'Quantity',
      },
    }}
    legendToggle
  />
</div>
        );

    }

}

interface IChart {
    data: any;
    dataS: any;
  }