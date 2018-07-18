import * as actionTypes from './actionType'
//定义初始状态
const initialState = {
 
  lineRoutePieData:{
    data: [],
    loading: false,
    error:false
  },
  lineRouteRankData:{
    data: [],
    loading: false,
    error:false
  },
  targetSearchResultData:{
    data: [],
    loading: false,
    error:false
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
     case actionTypes.LOADING_SEARCHALLLINEROUTER_RANKDATA:
      {
        return {
          ...state,
          lineRouteRankData:{
            data:[],
            loading: true,
            error:false
          },
        };
      }

    case actionTypes.LOADING_SEARCHALLLINEROUTER_RANKDATA_SUCCESS:
      {
        let result = action.result;
        return {
          ...state,
          lineRouteRankData:{
            data: result.data,
            loading: false,
            error:false
          }
      }
    }

    case actionTypes.LOADING_SEARCHALLLINEROUTER_RANKDATA_ERROR:
      return {
        ...state,
        lineRouteRankData:{
          data:[],
          loading: false,
          error: true
        }
      }

     case actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA:
     case actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA_SUCCESS:
     case actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA_ERROR:
          return( pieReducer(state,action));
  	default: 
  		return state;
  }
}

//pie图请求
const pieReducer= (state , action)=> {
   switch (action.type) {
     case actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA:
      {
        return {
          ...state,
          lineRoutePieData:{
            data:[],
            loading: true,
            error:false
          },
        };
      }

    case actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA_SUCCESS:
      {
        let result = action.result;
        return {
          ...state,
          lineRoutePieData:{
            data: result.data,
            loading: false,
            error:false
          }
      }
    }

    case actionTypes.LOADING_SEARCHALLLINEROUTER_PIEDATA_ERROR:
      return {
        ...state,
        lineRoutePieData:{
          data:[],
          loading: false,
          error: true
        }
      }
    default:
    return state;
   }  
}


 /* 导出的字段名称固定, 方便后续的store去处理 */
export default {initialState, reducer};