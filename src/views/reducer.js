import {combineReducers } from 'redux'
import {reducer as SignallingCheck} from './SignallingAnalyse/index'
import {reducer as CommunicTopo} from './CommunicTopo/index'
import {reducer as MiddlemenRecommend} from './middlemanRecommend'
import {reducer as SmsAnalyze } from "./smsAnalyze"
import {reducer as TargetLineRouteAnalyze} from "./targetLineRouteTrendAnalyze"
// 定义reducer
// 每个组件自己的reducer负责维护自己的状态, 注意key的名字和组件名一致
const reducers= combineReducers({
   SignallingCheck: SignallingCheck.reducer,
   CommunicTopo:CommunicTopo.reducer,
   MiddlemenRecommend:MiddlemenRecommend.reducer,
   SmsAnalyze:SmsAnalyze.reducer,
   TargetLineRouteAnalyze:TargetLineRouteAnalyze.reducer,
});

// 整体的初始状态
// 就是把每个组件自己的初始状态组合起来, 注意key的名字和组件名一致
const initState = {
  SignallingCheck: SignallingCheck.initialState,
  CommunicTopo: CommunicTopo.initialState,
  MiddlemenRecommend:MiddlemenRecommend.initialState,
  SmsAnalyze:SmsAnalyze.initialState,
  TargetLineRouteAnalyze:TargetLineRouteAnalyze.initialState,
};

export {reducers,initState}
