import React, { Component } from 'react';
import {Row, Col, DatePicker, Button, Card, Form, Icon, Tabs, List, Input, Select ,Divider,message,Spin} from 'antd';
import PersonInfo from "./PersonInfo";
import TargetSimpleDes from "./TargetSimpleDes";
import ConnectionMes from "./ConnectionMes";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const {Option} = Select;

const SourceList = [
  {dicCode:'phoneNum',dicName:'手机号码'},
  {dicCode:'IMSI',dicName:'IMSI'},
];

class DiffMapSearch extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const formItemLayoutNolabel = {
      labelCol: { span: 1 },
      wrapperCol: { span: 24 },
    };
    const { obtainDateList, diffCodeList, netCodeList } = this.props;
    return(
      <Form layout="inline"  >
       <Row gutter={2}>
       <Col span={2} >
        <FormItem {...formItemLayoutNolabel} label="" style={{width:'100%'}} >
          {getFieldDecorator("targetAType",{
          	initialValue:"IMSI"
          })(
              <Select  style={{width:'100%'}}>
              {SourceList.map(d=> <Option key={d.dicCode} value={d.dicCode}>目标A {d.dicName}</Option>)}
              </Select>
          )}
        </FormItem>
        </Col>
        <Col span={4} >
        <FormItem {...formItemLayoutNolabel} label="" style={{width:'100%'}} >
          {getFieldDecorator("targetAValue")(
             <Input  placeholder="请输入目标A手机号码或者IMSI号码"/>
          )}
        </FormItem>
        </Col>
        <Col span={2} >
        <FormItem {...formItemLayoutNolabel} label="" style={{width:'100%'}} > 
          {getFieldDecorator("targetBType",{
          	initialValue:"IMSI"
          })(
              <Select >
              {SourceList.map(d=> <Option key={d.dicCode} value={d.dicCode}>目标B {d.dicName}</Option>)}
              </Select>
          )}
        </FormItem>
        </Col>
        <Col span={4} >
        <FormItem {...formItemLayoutNolabel} label="" style={{width:'100%'}} >
          {getFieldDecorator("targetBValue")(
             <Input  placeholder="请输入目标B手机号码或者IMSI号码"/>
          )}
        </FormItem>
        </Col>
       <Col span={6} >
        <FormItem {...formItemLayout} label="时间周期" style={{width:'100%'}}>
          {getFieldDecorator("obtainDate")(
             <RangePicker format={dateFormat} />
          )}
        </FormItem>
        </Col>
         <Col span={2} style={{ textAlign: 'right' }} >
           <Button type="primary" onClick={this.props.handleSearch}><Icon type="sync" />查询</Button>
         </Col>
       </Row>
     </Form>
    );

  }
}
const TargetForm = Form.create()(DiffMapSearch);

class TargetSearch extends Component {

  componentWillReceiveProps(nextprops){
    if (nextprops.targetAnalayzeListdata.error===true) {
        message.error('请求失败,稍后再试....');
      } 
 }

 handleSearch=(e) =>{
     const form= this.form;
     const mapThis=this;
      form.validateFields(( err, values) => {
      if (err) {
         return;
        }
        console.log(values);
        let params={"targetAType":values.targetAType,"targetAValue":values.targetAValue,
                 "targetBType":values.targetBType,"targetBValue":values.targetBValue,
        "startDate":values.obtainDate[0]._d,"endDate":values.obtainDate[1]._d };

console.log(params);
    this.props.searchMiddlepersonByTargets();
      })
  }


	render (){
    const {targetAnalayzeListdata}=this.props;
		return (
			<div>
			<Row>
				<TargetForm style={{ backgroundColor:"white",marginTop:"10px"}}  ref={(ref) => this.form = ref} handleSearch={this.handleSearch} />
			</Row>
      <Spin spinning={targetAnalayzeListdata.loading}>
			<Row gutter={24} style={{ backgroundColor:"gray",marginTop:"10px"}}>
        <Col span={8}>
          <List header={<span></span>} 
                   grid={{ gutter: 16, column: 1 }}
                itemLayout="horizontal"
                dataSource={targetAnalayzeListdata.data.targetData}
                renderItem={item => (
                  <List.Item>
                  <Row gutter={12}>
                    <Col >
                     <Card title="目标信息" ><TargetSimpleDes middlePerson={item==undefined?[]:item} /></Card>
                    </Col>
                    </Row>
                  </List.Item>
                )}
           /> 
            <Divider type="vertical" />        
        </Col>
 
        <Col span={16}>
          <List header={<span>查询结果</span>} 
                   grid={{ gutter: 16, column: 1 }}
                itemLayout="horizontal"
                dataSource={targetAnalayzeListdata.data.data}
                renderItem={item => (
                  <List.Item>
                  <Row gutter={12}>
                    <Col span={8}>
                     <Card title="中间人信息" ><TargetSimpleDes middlePerson={item.middlePerson==undefined?[]:item.middlePerson} /></Card>
                    </Col>
                     <Col span={8}>
                     <Card title={`与目标人${item.targetA==undefined?"":item.targetA.name} 信息`}  > <ConnectionMes target={item.targetA==undefined?{}:item.targetA}/></Card>
                    </Col>
                     <Col span={8}>
                     <Card title={`与目标人${item.targetB==undefined?"":item.targetB.name} 信息`}  > <ConnectionMes target={item.targetB==undefined?{}:item.targetB}/></Card>
                    </Col>
                    </Row>
                    <Divider  />
                  </List.Item>
                )}
           />
        </Col>      
			</Row>
      </Spin>
			</div>
			);
	}
}

export default TargetSearch;