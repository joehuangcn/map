import { hot } from 'react-hot-loader'
import Header from '../common/component/header/Header'
import Home from './Home/Home'
import Sign from './SignallingAnalyse/index'
import CommunicTopo from './CommunicTopo/index'
import React from "react";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import createBrowserHistory from '../../node_modules/history/createBrowserHistory';
import "./App.css"

//-------------------------------------路由部分-------------------------------------
//目标统计子路由
const targetCounts = () => <h3>wait to dev</h3>;
const targetCount = () => (<div className="clear-fix">
      <ul className="nav-second">
            <li><Link to="/targetCount/userMessage">用户信息</Link></li>
            <li><Link to="/targetCount/userTopology">用户通联拓扑分析</Link></li>
            <li><Link to="/targetCount/middlemanRecommend">中间人推荐</Link></li>
            <li><Link to="/targetCount/middlemanAnalysis">中间人分析</Link></li>
            <li><Link to="/targetCount/signTopology">信令点拓扑分析</Link></li>
            <li><Link to="/targetCount/messageAnalysis">短信规律分析</Link></li>
            <li><Link to="/targetCount/targetLine">目标线路走向分析</Link></li>
            <li><Link to="/targetCount/targetRoam">目标漫游分析</Link></li>
      </ul>
  {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
</div>);

//通用统计子路由
const currencyCounts = () => <h3>通用统计,wait to dev</h3>;
const currencyCount = ({ routes }) => (<div className="clear-fix">
    <ul className="nav-second">
        <li>
            <Link to="/currencyCount/countAnalysis">统计分析</Link>
        </li>
        <li>
            <Link to="/currencyCount/signCount">Map信令统计</Link>
        </li>
    </ul>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
</div>);

//监控预警
const monitoringWarnings = () => <h3>监控预警,wait to dev</h3>;
const monitoringWarning = ({ routes }) => (<div>
  <ul className="nav-second">
    <li>
      <Link to="/monitoringWarning/targetMonitoring">目标实时监控</Link>
    </li>
    <li>
      <Link to="/monitoringWarning/targetArea">区域实时分析</Link>
    </li>
  </ul>
  {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
</div>);

//短信检索(一个页面没有自子路由)
const messageSearch = () => <h3>短信检索,wait to dev</h3>;

//数据清洗监控(一个页面没有自子路由)
const dataCleaning = () => <h3>数据清洗监控,wait to dev</h3>;

//-----------------------------------------------组件部分-----------------------------------------------------
const routes = [
  //  目标统计组件
  {
    path: "/targetCount",
    component: targetCount,
    routes: [{
      path: "/targetCount/userMessage",
      component: Sign,
      exact: true
    }, {
      path: "/targetCount/userTopology",
      component: CommunicTopo
    }, {
      path: "/targetCount/middlemanRecommend",
      component: targetCounts
    }, {
      path: "/targetCount/middlemanAnalysis",
      component: targetCounts
    }, {
      path: "/targetCount/signTopology",
      component: targetCounts
    }, {
      path: "/targetCount/messageAnalysis",
      component: targetCounts
    }, {
      path: "/targetCount/targetLine",
      component: targetCounts
    }, {
      path: "/targetCount/targetRoam",
      component: targetCounts
    }]
  },
  //通用统计组件
  {
    path: "/currencyCount",
    component: currencyCount,
    routes: [{
      path: "/currencyCount/countAnalysis",
      component: currencyCounts
    }, {
      path: "/currencyCount/signCount",
      component: currencyCounts
    }]
  },
  //  监控预警组件
  {
    path: "/monitoringWarning",
    component: monitoringWarning,
    routes: [{
      path: "/monitoringWarning/targetMonitoring",
      component: monitoringWarnings
    }, {
      path: "/monitoringWarning/targetArea",
      component: monitoringWarnings
    }]
  },
  //  短信检索
  {
    path: "/messageSearch",
    component: messageSearch,
  },
  //  数据清洗监控
  {
    path: "/dataCleaning",
    component: dataCleaning,
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (<route.component {...props} routes={route.routes}/>)}
  />
);

const history = createBrowserHistory();
const App = () => (
  <HashRouter histry={history}>
      <Router>
        <div style={{backgroundColor:"#ccc"}}>
          <Header/>
          <Route path="/" component={Home} exact/>
          <Route path="/home" component={Home} />
          <Route path="/targetCount" component={targetCount} />
          <Route path="/currencyCount" component={currencyCount} />
          <Route path="/monitoringWarning" component={monitoringWarning} />
          <Route path="/messageSearch" component={messageSearch} />
          <Route path="/dataCleaning" component={dataCleaning} />
        </div>
      </Router>
    </HashRouter>
);

export default hot(module)(App)
