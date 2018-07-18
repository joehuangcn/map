import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from "../redux/action"

import {Row,Col,Card,Spin,message} from 'antd'

import BarTopTypeChart from "../../../common/component/echarts/BarTopTypeChart"
import PieChart from "../../../common/component/echarts/SimplePieChart"

class LineRouteMes extends Component {

	componentWillMount() {
		this.props.searchAllLineRouterRankData();
		this.props.searchAllLineRouterPieData();
	}

	render() {

		const {lineRouteRankData,lineRoutePieData}=this.props;
		if (lineRouteRankData.error) {
			message.error("线路排序图数据请求失败,稍后再试！");
		};
		if (lineRoutePieData.error) {
			message.error("线路饼图数据请求失败,稍后再试！");
		}
		return(
			<div>
				<Row gutter={12}>
					<Col span={14}>
					<Card>
					<Spin spinning={lineRoutePieData.loading}>
							<PieChart  title="线路占比情况" pieChartData={(lineRoutePieData.data===undefined?{"data":[]}:lineRoutePieData)}/>
                     </Spin>
                      </Card>
					</Col>
					<Col span={10}>
					<Card>
						<Spin spinning={lineRouteRankData.loading}>
						<BarTopTypeChart title="线路排序" legendData={lineRouteRankData.data.legendData}  xAxisData={lineRouteRankData.data.xAxisData} 
                   			  yAxisData={lineRouteRankData.data.yAxisData} series={(lineRouteRankData.data.series==undefined?{name:'',data:[]}:lineRouteRankData.data.series)} />
                        </Spin>
					</Card>
					</Col>
				</Row>
				<Row>
					<Col>
					</Col>
				</Row>
			</div>
			);
	}

}

function mapStateToProps(state) {
  return {
  	lineRoutePieData:state.TargetLineRouteAnalyze.lineRoutePieData,
  	lineRouteRankData:state.TargetLineRouteAnalyze.lineRouteRankData,
  	targetSearchResultData:state.TargetLineRouteAnalyze.targetSearchResultData,
  }
}
const TargetLineRourteTrendAnalyze = connect(mapStateToProps, dispath => bindActionCreators(ActionCreators, dispath))(LineRouteMes);

export default TargetLineRourteTrendAnalyze;


