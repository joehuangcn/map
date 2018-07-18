import {takeEvery, takeLatest} from 'redux-saga/effects';
import {loadSignalling,loadDetail} from './SignallingAnalyse/redux/sagas'
import {loadTopology,loadCommunication} from './CommunicTopo/redux/sagas'
import {loadMiddpersonListData,loadTargetListData } from "./middlemanRecommend/redux/sagas"
import {loadSmsLanguageListData,loadAppReceiveSMSFrequencyListData,loadAppContaionsTargetListData} from "./smsAnalyze/redux/sagas"
import {loadLineRoutePieData,loadLineRouteRankData} from "./targetLineRouteTrendAnalyze/redux/sagas"

export function* watchIncrementAsync() {
  yield takeLatest('LOAD_SIGNALLING', loadSignalling)
  yield takeEvery('LOAD_DETAIL', loadDetail)
  yield takeLatest('LOAD_TOPOLOGY', loadTopology)
  yield takeLatest('LOAD_COMMUNICATION', loadCommunication)
  yield takeLatest('LOADING_MIDDLEPERSON',loadMiddpersonListData)
  yield takeLatest('LOADING_TARGETLIST',loadTargetListData)

 yield takeLatest('LOADING_SMS_LANGUAGETOP',loadSmsLanguageListData)
 yield takeLatest('LOADING_APP_RECEIVE_FREQUENCY',loadAppReceiveSMSFrequencyListData)
  yield takeLatest('LOADING_APP_CONTAINS_TARGET',loadAppContaionsTargetListData)

  //目标线路统计
  yield takeLatest('LOADING_SEARCHALLLINEROUTER_RANKDATA',loadLineRouteRankData)
  yield takeLatest('LOADING_SEARCHALLLINEROUTER_PIEDATA',loadLineRoutePieData)


}

export default function* RootSaga() {
   yield watchIncrementAsync()
}
