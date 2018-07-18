// import { hot } from 'react-hot-loader'
// import Header from '../common/component/header/Header'
// import Sign from './SignallingAnalyse/index'
// import CommunicTopo from './CommunicTopo/index'
// import React from "react";
// import { BrowserRouter as Router, Route, NavLink, HashRouter } from "react-router-dom";
// import createBrowserHistory from '../../node_modules/history/createBrowserHistory';
//
//
// //通用待开发
// const common = () => <h3>wait to dev</h3>;
//
// //路由选中高亮样式
// const navstyle ={
//     fontWeight: 'bold',
//     color: 'red'
//   };
//
// // 首页  Home
// const Home = () => <h3>Home wait to dev</h3>;
//
//
// //目标监控target
// // const targetCounts = () => <h3>wait to dev</h3>;
// const targetCounts1 = () => <h3>1111</h3>;
// const targetCounts2 = () => <h3>222</h3>;
//
// const homerouter=[
//   {
//       name:"默认页",
//       path: "/targetCount",
//       exact:true,
//       component: Sign
//   }, {
//            name:"用户信息",
//            path: "/targetCount/userMessage",
//            exact:false,
//            component: Sign
//        }, {
//            name:"用户通联拓扑分析",
//            path: "/targetCount/userTopology",
//            exact:false,
//            component: CommunicTopo
//        }, {
//          name:"中间人推荐",
//            path: "/targetCount/middlemanRecommend",
//            exact:false,
//            component: common
//        },{
//            name:"中间人分析",
//            path: "/targetCount/middlemanAnalysis",
//            exact:false,
//            component: common
//        }, {
//            name:"信令点拓扑分析",
//            path: "/targetCount/signTopology",
//            exact:false,
//            component: common
//        }, {
//          name:"短信规律分析",
//            path: "/targetCount/messageAnalysis",
//            exact:false,
//            component: common
//        }, {
//            name:"目标线路走向分析",
//            path: "/targetCount/targetLine",
//            exact:false,
//            component: common
//        }, {
//          name:"目标漫游分析",
//            path: "/targetCount/targetRoam",
//            exact:false,
//            component: common
//        }
//    ];
//
// const getUl =function(a){
//   let itemList = [];
//   for(let i = 0; i < a.length; i++) {
//     if(a[i].exact===false){
//       itemList.push(
//         <li key={i}>
//           <NavLink to={a[i].path} activeStyle={navstyle}>{a[i].name}</NavLink>
//         </li>);
//     }
//   }
//   return <ul className="category">{itemList}</ul>
// }
//
// const getUl1 =function(a){
//   return a.map(function(item,index){
//     if(item.exact===true){
//       return   <Route exact path={item.path} key={item.index} component={item.component}/>
//     }else{
//       return   <Route path={item.path} key={item.index} component={item.component}/>
//     }
//   })
// }
//
// const newComponent = getUl(homerouter);
// const newComponent1 = getUl1(homerouter);
//
// const targetCounts = ({ homerouter }) => (<div className="clear-fix">
//     {newComponent}
//     {newComponent1}
// </div>);
//
//
//
//
// const history = createBrowserHistory();
// const App = () => (
//       <Router>
//         <div style={{backgroundColor:"#ccc"}}>
//           <Header/>
//           <Route path="/" component={Home} exact/>
//           <Route path="/home" component={Home} />
//           <Route path="/targetCount" component={targetCounts} />
//           {/* <Route path="/currencyCount" component={currencyCount} />
//           <Route path="/monitoringWarning" component={monitoringWarning} />
//           <Route path="/messageSearch" component={messageSearch} />
//           <Route path="/dataCleaning" component={dataCleaning} /> */}
//         </div>
//       </Router>
// );
//
// export default hot(module)(App)

import {hot} from 'react-hot-loader'
import Header from '../common/component/header/Header'
import Home from './Home/Home'
import {view as Sign} from './SignallingAnalyse/index'
import {view as CommunicTopo} from './CommunicTopo/index'
import {Middlemen as Middlemen} from './middlemanRecommend'
import {SmsAnalyze} from "./smsAnalyze"
import {TargetLineRourteTrendAnalyze} from "./targetLineRouteTrendAnalyze"
import React from "react";
import {BrowserRouter as Router,Route,NavLink,HashRouter} from "react-router-dom";
import createBrowserHistory from '../../node_modules/history/createBrowserHistory';
// import MonitoringWarnings from "./AlertPage/index";
import "./App.css"

//-------------------------------------路由部分-------------------------------------
//目标统计子路由
const targetCounts = () => <h3>wait to dev</h3>;
const targetCount = ({routes}) => (<div className="clear-fix">
    <ul className="nav-second">
        <li>
            <NavLink to="/targetCount/userMessage" activeClassName="selected" >用户信息</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/userTopology" activeClassName="selected" >用户通联拓扑分析</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/middlemanRecommend" activeClassName="selected" >中间人推荐</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/middlemanAnalysis" activeClassName="selected" >中间人分析</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/signTopology" activeClassName="selected" >信令点拓扑分析</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/messageAnalysis" activeClassName="selected" >短信规律分析</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/targetLine" activeClassName="selected" >目标线路走向分析</NavLink>
        </li>
        <li>
            <NavLink to="/targetCount/targetRoam" activeClassName="selected" >目标漫游分析</NavLink>
        </li>
    </ul>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
</div>);

//通用统计子路由
const currencyCounts = () => <h3>通用统计,wait to dev</h3>;
const currencyCount = ({routes}) => (<div className="clear-fix">
    <ul className="nav-second">
        <li>
            <NavLink to="/currencyCount/countAnalysis">统计分析</NavLink>
        </li>
        <li>
            <NavLink to="/currencyCount/signCount">Map信令统计</NavLink>
        </li>
    </ul>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
</div>);

//监控预警
const MonitoringWarnings = () => <h3>监控预警,wait to dev</h3>;
const MonitoringWarning = ({routes}) => (<div>
    <ul className="nav-second">
        <li>
            <NavLink to="/MonitoringWarning/targetMonitoring">目标实时监控</NavLink>
        </li>
        <li>
            <NavLink to="/MonitoringWarning/targetArea">区域实时分析</NavLink>
        </li>
    </ul>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
</div>);

//短信检索(一个页面没有自子路由)
const messageSearchs = () => <h3>短信检索,wait to dev</h3>;

//数据清洗监控(一个页面没有自子路由)
const dataCleaning = () => <h3>数据清洗监控,wait to dev</h3>;

//-----------------------------------------------组件部分-----------------------------------------------------
const routes = [
    //  目标统计组件
    {
        path: "/targetCount",
        component: targetCount,
        routes: [
          {
            path: "/targetCount/userMessage",
            component: Sign,
        }, {
            path: "/targetCount/userTopology",
            component: CommunicTopo
        }, {
            path: "/targetCount/middlemanRecommend",
            component: Middlemen
        }, {
            path: "/targetCount/middlemanAnalysis",
            component: targetCounts
        }, {
            path: "/targetCount/signTopology",
            component: targetCounts
        },{
            path: "/targetCount/messageAnalysis",
            component: SmsAnalyze
        },{
            path: "/targetCount/targetLine",
            component: TargetLineRourteTrendAnalyze
        },{
            path: "/targetCount/targetRoam",
            component: targetCounts
        }
        ]
    },
    //通用统计组件
    {
        path: "/currencyCount",
        component: currencyCount,
        routes:[
            {
                path: "/currencyCount/countAnalysis",
                component: currencyCounts
            }, {
                path: "/currencyCount/signCount",
                component: currencyCounts
            }
        ]
    },
    //  监控预警组件
    {
        path: "/MonitoringWarning",
        component: MonitoringWarning,
        routes: [{
            path: "/MonitoringWarning/targetMonitoring",
            component: MonitoringWarnings
        }, {
            path: "/MonitoringWarning/targetArea",
            component: MonitoringWarnings
        }]
    },
    //  短信检索
    {
        path: "/messageSearch",
        component: messageSearchs,
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
const New = () => (
    <Router histry={history}>
        <Router>
            <div style={{backgroundColor:"#ccc"}}>
                <Header/>
                <Route path="/" component={Home} exact/>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)}
            </div>
        </Router>
    </Router>
);

export default hot(module)(New)
