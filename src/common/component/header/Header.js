import React, {Component} from "react"
import { NavLink } from "react-router-dom";
import { Row, Col } from 'antd';
import './Header.css';
import headerLogo from './home.png';

class Header extends Component {
	// state={
	//   index:0,
	// };


	render() {
		return (
				<div className="header-css ">
					<Row>
						<Col span={1}>
							<img style={{
									height: 50,
									width: 70,
								}} src={headerLogo} alt="headerLogo"/>
						</Col>
						<Col span={23}>
							<ul className="nav-top">
								<li><NavLink to="/">首页</NavLink></li>
								<li><NavLink to="/targetCount">目标统计分析</NavLink></li>
								<li><NavLink to="/currencyCount">通用统计分析</NavLink></li>
								<li><NavLink to="/MonitoringWarning">监控预警</NavLink></li>
								<li><NavLink to="/messageSearch">短信检索</NavLink></li>
								<li><NavLink to="/dataCleaning">数据清洗监控</NavLink></li>
							</ul>
						</Col>
					</Row>


				</div>
		)
	}
}

export default Header
