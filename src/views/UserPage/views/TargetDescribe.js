import React, { Component } from 'react';
import { Avatar,Row,Col,Card,Tag,Tabs,List} from 'antd';
import BarChart  from "../../../component/barChart";
import BarTopTypeChart from "../../../component/barChart/BarTopTypeChart"
import TableDescribe from "../../../component/basicTable";
const {TabPane}=Tabs;
class TargetDescribe extends Component {

 handleStandardTableChange = (pagination, filtersArg, sorter) => {
    let mes={current:pagination.current};
    this.props.locationlistTarget(mes);
    console.log(pagination);
 }


 renderTag=(data)=>{
    let dataColor=["#f40","#50","#2db7f5","#108ee9","#87d068"];
    let dataRender=[];
    if (data==undefined) {
    return "";
    }else{
        for (let i = data.length - 1; i >= 0; i--) {
            dataRender.push(<Tag key={data[i]} color={dataColor[i]}>{data[i]}</Tag>);
        }
        return dataRender;
    }

 }

 renderMes=(mes) =>{
     return (mes==undefined?"":mes);
 }

	render() {

    const columns=[
        {title:'时间', dataIndex:'time'},
        {title:'位置',dataIndex:'position'},
    ];

  
    const phoneColumns=[
        {title:'号码', dataIndex:'phoneNum'},
        {title:'IMSI',dataIndex:'imsi'}, 
        {title:'卡号状态', dataIndex:'status'},
        {title:'机型',dataIndex:'phoneType'},
    ];

     const contacterColumns=[
        {title:'联系人号码', dataIndex:'phoneNum'},
        {title:'联系人归属地',dataIndex:'locaton'}, 
        {title:'通联频次', dataIndex:'frequency',render:(text)=>(text+"次/月")},
        {title:'亲密度',dataIndex:'intmacyLevel'},
    ];

    const userContacterTradColumns=[
        {title:"联系人号码", dataIndex:'phoneNum'},
        {title:"收发方", dataIndex:'part'},
        {title:"通联方式", dataIndex:'connectionWay'},
        {title:"源信令点", dataIndex:'originLocation'},
        {title:"目标信令点", dataIndex:'targetLocation'},
        {title:"线路号", dataIndex:'trance'},
        {title:"最近通联时间", dataIndex:'recentConnectionDate'},
        {title:"平均通联时长(分/秒)", dataIndex:'averageCoastTime'},
        {title:"最长时长(分/秒)", dataIndex:'longestCoastTime'},
        {title:"通联次数", dataIndex:'connectionCount'},

    ]

    const {selectTarget}=this.props;
    const userInfo=(selectTarget.userInfo==undefined?{}:selectTarget.userInfo);
    const barChart=(selectTarget.barChar==undefined?{}:selectTarget.barChar);
    const lastLocationData=(selectTarget.locationData==undefined?[]:selectTarget.locationData.data);
    const pagination={pageSize:5,total:selectTarget.locationData==undefined?0:selectTarget.locationData.total,
                        current:selectTarget.locationData==undefined?1:selectTarget.locationData.current};
    const rowKey="id";
    const loading=false;

    const cityListData=(selectTarget.cityListData==undefined?[]:selectTarget.cityListData);
   
   const phoneData=(selectTarget.phoneData==undefined?[]:selectTarget.phoneData.data);
    const phonePagination={pageSize:5,total:selectTarget.phoneData==undefined?0:selectTarget.phoneData.total};
    const phoneRowKey="id";
    const phoneLoading=false;

    const interConnecterData=(selectTarget.interConnecterData==undefined?[]:selectTarget.interConnecterData);
    const foreignConnecterData=(selectTarget.foreignConnecterData==undefined?[]:selectTarget.foreignConnecterData);  
     const userContacterTradData=(selectTarget.userContacterTradData==undefined?[]:selectTarget.userContacterTradData); 
   
		return(
		<div style={{height:'100%'}}>
		<Row gutter={4} style={{height:'60%'}}>
       	<Col span={2}>
       		<div>
        	 <Avatar style={{ backgroundColor: '#87d068' }} size='large' icon="user" />
        	 <div className="tag-mes">
                {this.renderTag(selectTarget.tap)}
        	 </div>	
        	 </div>
        </Col>
        <Col span={6}>
        	<Card title="用户属性信息">
        		<p><span>目标号码:</span> {this.renderMes(userInfo.phoneNum)}</p>
        		<p><span>IMSI 号码:</span> {this.renderMes(userInfo.IMSI)}</p>
        		<p><span>用户归属地:</span> {this.renderMes(userInfo.city)}</p>
        		<p><span>主要短信文种:</span> {this.renderMes(userInfo.language)}</p>
        		<p style={{color: 'red'}}><span >是否中间人:</span> {this.renderMes(userInfo.mainConnecter)}</p>
        		<p style={{color: 'red'}}><span >是否重要目标:</span> {this.renderMes(userInfo.mainTarget)}</p>
        	</Card>
        	</Col>
        	<Col span={6}>
        	<Card title="用户状态信息">
        		<p><span>最近状态:</span> {this.renderMes(userInfo.status)}</p>
        		<p><span> 漫游位置:</span> {this.renderMes(userInfo.lastLocation)}</p>
        		<p><span>最近联系人:</span> {this.renderMes(userInfo.recentContacter)}</p>
        		<p><span>涉外联系人:</span> {this.renderMes(userInfo.forginContacter)}</p>
        		<p><span>最近联系重要目标:</span> {this.renderMes(userInfo.rencentMainTarget)}</p>
        	</Card>
        	</Col>
        	<Col span={10}>
        	<Card title="用户动态信息">
        		 <Tabs defaultActiveKey="1" size='small'>
          		 <TabPane tab="通联信息统计" key="1"><BarChart title="短信/通话次数统计" legendData={barChart.legendData}  xAxisData={barChart.xAxisData} 
          		       yAxisData={barChart.yAxisData} series={barChart.series}/></TabPane>
                 <TabPane tab="近期位置信息" key="2"><TableDescribe columns={columns} data={lastLocationData} size="middle" 
                                pagination={pagination} loading={loading} rowKey={rowKey}  onChange={this.handleStandardTableChange} />
                 </TabPane>
                 <TabPane tab="漫游地位置" key="3">
                    <List  grid={{gutter:4,columns:2 ,lg: 2, md: 2, sm: 2, xs: 2}}  dataSource={cityListData} 
                        renderItem={item =>(
                            <List.Item><Card title={item.title}>{item.city}</Card></List.Item>
                            )}
                    />
                 </TabPane>
                 <TabPane tab="机卡位置" key="4"><TableDescribe columns={phoneColumns} data={phoneData} size="middle" 
                                pagination={phonePagination} loading={phoneLoading} rowKey={phoneRowKey}  onChange={this.handleStandardTableChange} />
                 </TabPane>
               </Tabs>
        	</Card>
        	</Col>
        </Row>		
        <Row  style={{height:'60%'}}>
          <Col span={8}>
        	<Card >
        		 <Tabs defaultActiveKey="1" size='small'>
                 <TabPane tab="国内常用通信人" key="1"><TableDescribe columns={contacterColumns} data={interConnecterData} size="middle" 
                                 loading={loading} rowKey={rowKey} pagination={false}/>
                 </TabPane>
                 <TabPane tab="国际常用通信人" key="2"><TableDescribe columns={contacterColumns} data={foreignConnecterData} size="middle" 
                                 loading={phoneLoading} rowKey={rowKey} pagination={false} />
                 </TabPane>
               </Tabs>
        	</Card>
        	</Col>
        	<Col span={16}>
        	<Card >
        	 <Tabs defaultActiveKey="1" size='small'>
            
                 <TabPane tab="用户通联轨迹线路" key="1">
                    <TableDescribe columns={userContacterTradColumns} data={userContacterTradData} size="middle" 
                                 loading={phoneLoading} rowKey={rowKey} pagination={false} />
                 </TabPane>
                 
               </Tabs>
        	</Card>
        	</Col>
        </Row>
		</div>
			);
	}
}

export default TargetDescribe;