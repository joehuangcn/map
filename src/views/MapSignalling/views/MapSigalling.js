import React, { Component } from 'react';
import { Row, Col, DatePicker, Button, Card, Form, Icon, Tabs, List, Input, message } from 'antd';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PieChart from "../../../component/pieChart";
import BarTopTypeChart from "../../../component/barChart/BarTopTypeChart"
import LineChart from "../../../component/lineChart"
import * as ActionCreators from "../../../redux/reducers/mapSigSumAction"
import TableDescribe from "../../../component/basicTable";
import ReactLoading from "react-loading";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;
const Search = Input.Search;

class DiffMapSearch extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { obtainDateList, diffCodeList, netCodeList } = this.props;
    return(
      <Form layout="inline"  >
       <Row gutter={24}>
       <Col span={8} >
        <FormItem {...formItemLayout} label="时间周期">
          {getFieldDecorator("obtainDate")(
             <RangePicker format={dateFormat} />
          )}
        </FormItem>
        </Col>
         <Col span={4} style={{ textAlign: 'right' }} >
           <Button type="primary" onClick={this.props.handleSearch}><Icon type="sync" />查询</Button>
         </Col>
       </Row>
     </Form>
    );

  }
}
const SearchBut = Form.create()(DiffMapSearch);


class MapSigSum extends Component {

  componentWillMount() {
    const param = { "startDate": "", "endDate": "" };
    this.props.getPieChartMap(param);
    this.props.getMapSigList(param);
    this.props.getLineChart(param);
    this.props.lineTopBarChart(param);
    this.props.analazyMes(param);
  }

  handleSearch = (e) => {
    const form = this.form;
    const mapThis = this;
    form.validateFields((err, values) => {
      if(err) {
        return;
      }
      console.log(values);
      mapThis.props.getPieChartMap(values);
      mapThis.props.getMapSigList(values);
      mapThis.props.getLineChart(values);
      mapThis.props.lineTopBarChart(values);
      mapThis.props.analazyMes(values);

    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    let mes = { current: pagination.current };
    this.props.getMapSigList(mes);
    console.log(pagination);
  }

  handleSearchTableMes = (value) => {
    this.props.getMapSigList(value);
  }


  render() {
    const { pie_Data, pie_loading, sign_Data, sign_loading, line_Data, line_loading, top_Data, top_loading, anal_Data, anal_loading } = this.props;
    const mes = "信令类型及数量统计";
    const mapSigListClumns = [
      { "title": "信令类型", "dataIndex": "sigType" },
      { title: "信令分类", "dataIndex": "sigTypeName" },
      { title: "数量", "dataIndex": "num" },
      { title: "占比情况", "dataIndex": "percent", render: (text) => (text + "%") },
    ];
    const pagination = {
      pageSize: 10,
      total: mapSigListData == undefined ? 0 : mapSigListData.total,
      current: mapSigListData == undefined ? 1 : mapSigListData.current
    };
    const rowKey = "id";
    return(
      <div>
          {/* 查询框 */}
			   	<SearchBut ref={(ref) => this.form = ref} handleSearch={this.handleSearch.bind(this)}/>
			    <Row>
			    	<Row gutter={8}>
          {/* Map信令总量 */}
			    	<Col span={12}>
			    		<Card title="Map信令总量">
                {(pie_loading===true)?<ReactLoading type="spinningBubbles" color="#ccc" />:<PieChart pieChartData={pie_Data} />}
			    		</Card>
			    	</Col>
            {/* 信令类型及数量统计 */}
			    	<Col span={12}>
			    	 <Card title={mes}>
			    	 	<Search  enterButton="查询"   placeholder="请输入信令类型/信令分类" onSearch={this.handleSearchTableMes}  style={{ width: 300 }} />
              <TableDescribe columns={mapSigListClumns} data={sign_Data} size="middle"
                                pagination={pagination} loading={sign_loading} rowKey={rowKey}  onChange={this.handleStandardTableChange}/>
			    	 </Card>
			    	</Col>
			  	    </Row>
			        <Row>
                {/* 主要信令类型流量统计趋势和线路号top */}
			        	<Col span={16}>
			        	<Card>
			        	 <Tabs defaultActiveKey="1" size='small'>
                		 <TabPane tab="主要信令类型流量统计趋势" key="1">
                  		   {(line_loading===true)?<ReactLoading type="spinningBubbles" color="#ccc" />:<LineChart lineChartData={line_Data}/> />}
                		 </TabPane>
                         <TabPane tab="线路号TOP" key="2" style={{height:"100%"}}>
                         {(top_loading===true)?<ReactLoading type="spinningBubbles" color="#ccc" />:
                         <BarTopTypeChart  title="" legendData={top_Data.legendData}  xAxisData={top_Data.xAxisData}
                   			  yAxisData={top_Data.yAxisData} series={(top_Data.series==undefined?{name:'',data:[]}:top_Data.series)} />
                       }

                  		  </TabPane>
                         </Tabs>
			        	</Card>
			        	</Col>
                {/* 信令趋势分析 */}
			        	<Col span={8}>
			        	<Card title="信令趋势分析">
                  {(anal_loading===true)?<ReactLoading type="spinningBubbles" color="#ccc" />:
			        		<List itemLayout="horizontal"
								    dataSource={anal_Data}
								    renderItem={item => (
								      <List.Item>
								        <List.Item.Meta
								          title={`${item.name}情况`}
								          description={`从${anal_Data.startDate}至 ${anal_Data.endDate} 时间段 最大峰值 ${item.max} 最小峰值 ${item.min}`}
								        />
								      </List.Item>
								    )}/>
                  }
			        	</Card>
			        	</Col>
			        </Row>
			   </Row>
			</div>
    );
  }

}


function mapStateToProps(state) {
  return {
    //map信令总量 饼图
    pie_Data: state.mapSumMes.piechart.data,
    pie_loading: state.mapSumMes.piechart.loading,
    pie_error: state.mapSumMes.piechart.error,
    //信令类型统计   表格
    sign_Data: state.mapSumMes.signlist.data,
    sign_loading: state.mapSumMes.signlist.loading,
    sign_error: state.mapSumMes.signlist.error,
    //主要信令类型流量统计   折线图
    line_Data: state.mapSumMes.linechart.data,
    line_loading: state.mapSumMes.linechart.loading,
    line_error: state.mapSumMes.linechart.error,
    //线路号top    柱状图
    top_Data: state.mapSumMes.linetop.data,
    top_loading: state.mapSumMes.linetop.loading,
    top_error: state.mapSumMes.linetop.error,
    //信令趋势分析   卡片
    anal_Data: state.mapSumMes.analazydata.data,
    anal_loading: state.mapSumMes.analazydata.loading,
    anal_error: state.mapSumMes.analazydata.error,
  }
}
const MapSigalling = connect(mapStateToProps, dispath => bindActionCreators(ActionCreators, dispath))(MapSigSum);

export default MapSigalling;
