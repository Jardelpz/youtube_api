import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import '../../src/index.css'

class Chart extends Component{
  constructor(props){
    super(props);
    var label = props.chartData.map((title)=>{
      return title.channelTitle
    })
    var data = props.chartData.map((subs) => {
      return subs.subscribe_number
    })

    this.state = {
      chartData: {
        labels: label,
        datasets:[
          {
            label:'Canais',
            data: data,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 12, 12, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(55, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(25, 99, 132, 0.6)',
              'rgba(255, 99, 32, 0.6)'              
            ]
          }
        ]
      }
    }
    
  }

  render(){
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          width={60}
          height={25}
          options={{
            title:{
              display: true,
              text:'Canais com seus respectivos inscritos',
              fontSize:25
            },
            legend:{
              display: true,
              position: "bottom"
            }
          }}
        />

      </div>
    )
  }
}

export default Chart;