import {fetchApi} from '../../../common/utils/fetch'
import {call, put} from 'redux-saga/effects';

export function* loadLineRoutePieData(action) {
  try {
    const data = yield call(fetchApi, action)
    yield put({type: 'LOADING_SEARCHALLLINEROUTER_PIEDATA_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOADING_SEARCHALLLINEROUTER_PIEDATA_ERROR', error})
  }
}

export function* loadLineRouteRankData(action) {
  try {
    const data = yield call(fetchApi, action)
    yield put({type: 'LOADING_SEARCHALLLINEROUTER_RANKDATA_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOADING_SEARCHALLLINEROUTER_RANKDATA_ERROR', error})
  }
}