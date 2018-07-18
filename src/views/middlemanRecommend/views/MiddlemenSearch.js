import React, { Component } from 'react';
import {Row, Col, DatePicker, Button, Card, Form, Icon, Tabs, List, Input, Select,Divider,Spin,message } from 'antd';
import PersonInfo from "./PersonInfo";
import TargetSimpleDes from "./TargetSimpleDes";
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
      <Form layout="inline">
       <Row gutter={24}>
        <Col span={3} >
        <FormItem {...formItemLayoutNolabel} label="" style={{width:'100%'}} >
          {getFieldDecorator("middlemenType",{
          	initialValue:"IMSI"
          })(
              <Select  style={{width:'100%'}}>
              {SourceList.map(d=> <Option key={d.dicCode} value={d.dicCode}>中间人 {d.dicName}</Option>)}
              </Select>
          )}
        </FormItem>
        </Col>
        <Col span={4} >
        <FormItem {...formItemLayoutNolabel} label="" style={{width:'100%'}} >
          {getFieldDecorator("middlemenValue")(
             <Input  placeholder="请输入中间人手机号码或者IMSI号码" />
          )}
        </FormItem>
        </Col>
       <Col span={8} >
        <FormItem {...formItemLayout} label="时间周期"style={{width:'100%'}}  >
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
const MiddlemenForm = Form.create()(DiffMapSearch);


class MiddlemenSearch extends Component {
 
 componentWillReceiveProps(nextprops){
    if (nextprops.middlePersonListdata.error===true) {
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
        let params={"middlemenType":values.middlemenType,"middlemenValue":values.middlemenValue,"startDate":values.obtainDate[0]._d,"endDate":values.obtainDate[1]._d };

console.log(params);
    this.props.searchByMiddlePersonStatu();
      })
  }

		render() {
      const {middlePersonListdata} = this.props;

			return (
				<div>
				<Row style={{ backgroundColor:"white",marginTop:"10px"}}>
					<MiddlemenForm ref={(ref) => this.form = ref} handleSearch={this.handleSearch} />
				</Row>
         <Spin spinning={middlePersonListdata.loading}>
				<Row style={{ backgroundColor:"gray",marginTop:"10px"}} >
            <List header={<span>查询结果</span>} 
                   grid={{ gutter: 16, column: 1 }}
                itemLayout="horizontal"
                dataSource={middlePersonListdata.data}
                renderItem={item => (
                  <List.Item>
                  <Row gutter={12}>
                    <Col span={8}>
                     <Card title="中间人信息" ><TargetSimpleDes  middlePerson={item.middlePerson==undefined?[]:item.middlePerson}/></Card>
                    </Col>
                     <Col span={8}>
                     <Card title="目标人信息"  > <PersonInfo  targetA={item.targetA==undefined?[]:item.targetA}/></Card>
                    </Col>
                     <Col span={8}>
                     <Card title="目标人信息"  > <PersonInfo targetA={item.targetB==undefined?[]:item.targetB}/></Card>
                    </Col>
                    </Row>
                    <Divider  />
                  </List.Item>
                )}
           />
				</Row>
        </Spin>
				</div>

				);
		}
}

export default MiddlemenSearch;