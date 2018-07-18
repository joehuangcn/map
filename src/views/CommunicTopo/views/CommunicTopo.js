import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions'
import { Button, Input, message, Row, Col, Select, DatePicker } from 'antd';
import Table from '../../../common/component/table/table'
import "./CommunicaTopo.css";
import Topo from "./topo"
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

let param = {
  startTime: "",
  endTime: "",
  searchWay: "phonenumber",
  keyWord: ""
}

const targetCounts = () => <h3>wait to dev</h3>;

const commu_columns = [{
  title: '主叫号码',
  dataIndex: 'calling',
  key: 'calling'
}, {
  title: '被叫号码',
  dataIndex: 'called',
  key: 'called'
}, {
  title: '通信方式',
  dataIndex: 'ways',
  key: 'ways'
}, {
  title: '开始时间',
  dataIndex: 'starttime',
  key: 'starttime'
}, {
  title: '结束时间',
  dataIndex: 'endtime',
  key: 'endtime'
}, {
  title: '通信时长',
  dataIndex: 'time',
  key: 'time'
}, {
  title: '详情',
  dataIndex: '',
  key: 'details',
  render: function(record) {
    if(record.ways === "短信") {
      return <a>查看</a>
    } else if(record.ways === "通话") {
      return <a>播放</a>
    }
  }
}];

class CommunicTopo extends React.PureComponent {

  componentDidMount() {
    this.questData();
    this.error();
  }

  questData() {
    this.props.loadTopology(param);
    this.props.loadCommunication(param);
    this.error();
  }

  error() {
    if(this.props.error) message.error('This is a message of error');
  }

  onTime(datas, dateStrings) {
    param.startTime = dateStrings[0];
    param.endTime = dateStrings[1];
  }

  onSearch() {
    this.questData();
  }

  onchangeKey(e) {
    param.keyWord = e.target.value;
  }

  onBus(value) {
    console.log(value);
    param.searchWay = value;
  }

  render() {
    return(
      <div>
        {/*通联分析头部*/}
        <Row style={{backgroundColor:"#FFFFFF"}} className="TopoSearch">
            <Col span={7} className="searchSelected">
              <InputGroup compact style={{ width: 500 }}>
                <Select defaultValue="手机号码" onChange={this.onBus.bind(this)}>
                  <Option value="phonenumber">手机号码</Option>
                  <Option value="imei">IMEI号</Option>
                </Select>
                <Input style={{ width: '50%' }} placeholder="请输入手机号码或IMSI号码" onChange={this.onchangeKey.bind(this)}/>
              </InputGroup>
            </Col>
          <Col span={7} >
            时间 : <RangePicker format="YYYY-MM-DD HH:mm" onChange={this.onTime.bind(this)}/>
          </Col>

          <Col span={4}>
            <Button type="primary" icon="search" onClick={this.onSearch.bind(this)}>查询</Button>
          </Col>
        </Row>
        {/*拓扑图正文内容*/}
        <Row className="communicTopo" gutter={16}>
          <Col span={12}>
            <div style={{backgroundColor:"#FFFFFF"}}>
              <Row>
                <p className="communicTopoTitle">拓扑图分析</p>
              </Row>
              <Row className="userTopology">
                <Topo  data={this.props.topo_data} links={this.props.topo_links}></Topo>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div style={{backgroundColor:"#FFFFFF"}}>
                <p className="tableTitle">
                    <span className="condition">通信情况</span>
                    <Button size="small">导出记录</Button>
                </p>
              <Row>
                <Table
                  total={this.props.commu_total}
                  result={this.props.commu_result}
                  loading={this.props.commu_loading}
                  columns={commu_columns}
                  size="middle"
                  >
                </Table>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(state => ({
  //拓扑参数
  topo_data: state.CommunicTopo.topology.data,
  topo_links: state.CommunicTopo.topology.links,
  topo_loading: state.CommunicTopo.topology.loading,
  topo_error: state.CommunicTopo.topology.error,
  //通信表格数据
  commu_total: state.CommunicTopo.communication.total,
  commu_result: state.CommunicTopo.communication.result,
  commu_loading: state.CommunicTopo.communication.loading,
  commu_error: state.CommunicTopo.communication.error,
}), dispatch => bindActionCreators(ActionCreators, dispatch))(CommunicTopo)
