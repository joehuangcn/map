import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from "../redux/action"

import {Radio,Row,Col} from 'antd'
import MiddlemenSearch from './MiddlemenSearch';
import TargetSearch from './TargetSearch';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class MiddleMenRecommend extends Component {


onChange=(e) =>{
	console.log(e);
	const param={"searchWay":e.target.value};
	this.props.changeSearchWay(param);

}

renderSeach =() =>{
	const {searchWay,middlePersonListdata,targetAnalayzeListdata, searchByMiddlePersonStatu,searchMiddlepersonByTargets}=this.props;
	switch(searchWay){
		case 'middlePerson':
		return  <MiddlemenSearch middlePersonListdata={middlePersonListdata} searchByMiddlePersonStatu={searchByMiddlePersonStatu}/>;
		case "target":
		 return <TargetSearch targetAnalayzeListdata={targetAnalayzeListdata} searchMiddlepersonByTargets={searchMiddlepersonByTargets}/>;
		default: return <MiddlemenSearch  middlePersonListdata={middlePersonListdata} searchByMiddlePersonStatu={searchByMiddlePersonStatu}/>;
	}
}



	render(){
		let renderMes=this.renderSeach();
		const {searchWay}=this.props;
		return (
			<div>
				<Row style={{ backgroundColor:"white",marginTop:"5px"}} >
					<Col span={4}>
					</Col>
					<Col span={1} >
					 <span>查询方式:</span>
					</Col>
					<Col span={4}>
						<RadioGroup onChange={this.onChange} value={searchWay} >
				        <RadioButton value="middlePerson">中间人查询</RadioButton>
				        <RadioButton value="target">根据目标推荐中间人</RadioButton>
				      </RadioGroup>
					</Col>					
				</Row>
				<Row>
					{renderMes}				
				</Row>
			</div>
			);
	}

}

function mapStateToProps(state) {
  return {
  	searchWay:state.MiddlemenRecommend.searchWay,
  	middlePersonListdata:state.MiddlemenRecommend.middlePersonListdata,
  	targetAnalayzeListdata:state.MiddlemenRecommend.targetAnalayzeListdata,
  }
}
const Middlemen = connect(mapStateToProps, dispath => bindActionCreators(ActionCreators, dispath))(MiddleMenRecommend);

export default Middlemen;