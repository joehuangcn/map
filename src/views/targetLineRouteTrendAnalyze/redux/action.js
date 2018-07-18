import * as actionTypes from './actionType'

export function  searchAllLineRouterPieData(param){
	return {
		type: actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA,
		url:"/mock/targetLineRouteTrendAnalyze/lineRoutePieData.json",
		...param
	}
} 

export function  searchAllLineRouterRankData(param){
	return {
		type: actionTypes.LOADING_SEARCHALLLINEROUTER_RANKDATA,
		url:"/mock/targetLineRouteTrendAnalyze/lineRouteRankData.json",
		...param
	}
} 