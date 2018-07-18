import React, { Component } from 'react';
import {Table} from 'antd';
class TableDescribe extends Component {

handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

	render() {
		const {columns,data,size,pagination,loading,rowKey,bordered}=this.props;
		return(
			<div>
				<Table  rowKey={rowKey || 'key'} columns={columns}  dataSource={data} size={size} pagination={pagination} loading={loading} 
				 onChange={this.handleTableChange} bordered={bordered==undefined?false:bordered}/>
			</div>
			);
	}

}

export default TableDescribe;