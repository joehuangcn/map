import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class PieChart extends Component {
	render(){
    const {pieChartData,title}=this.props;
	const option = {
        title:{
           text:title
        },
    tooltip: {
        trigger: 'item',
        formatter: " {b}: {c} ({d}%)"
    },
    // legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data:["短信","主机","换卡","主被叫","开关机","周期性位置更新","强制性位置更新","切换","换手机","其他"]
    // },
   series: [{
        type: 'pie', //图表类型，柱状图：bar
        //饼图：pie  (南丁格尔图在series中加上roseType:’angle’)移开后不显示原来信息
        radius: '70%', //半径
        center: ['50%', '50%'],
        data: pieChartData.data,
         label: {
                normal: {
                    formatter: ' {b} {c} ({d}%)',
                }
            },
        itemStyle: { //itemStyle有正常显示：normal，有鼠标hover的高亮显示：emphasis
            emphasis: { //normal显示阴影,与shadow有关的都是阴影的设置
                shadowBlur: 10, //阴影大小
                shadowOffsetX: 0, //阴影水平方向上的偏移
                shadowColor: 'rgba(0, 0, 0, 0.5)' //阴影颜色
            },
        }
    }]
	};	
		return(
			<ReactEcharts option={option}  className={'react_for_echarts'}/>
			)
	}

}

export default PieChart;