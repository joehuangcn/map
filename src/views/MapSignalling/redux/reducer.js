import * as actionTypes from './actionTypes'

//定义初始状态
const initialState = {
  piechart:{
    data: [],
    loading: true,
    error:false
  },
  signlist:{
    data: [],
    loading: true,
    error:false
  },
  linechart:{
    data: [],
    loading: true,
    error:false
  },
  linetop:{
    data: [],
    loading: true,
    error:false
  },
  analazydata:{
    data: [],
    loading: true,
    error:false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOPOLOGY:
      {
        return {
          ...state,
          topology:{
            data:[],
            links:[],
            loading: true,
            error:false
          },
        };
      }

    case LOAD_TOPOLOGY_SUCCESS:
      {
        let result = action.result;
        return {
          ...state,
          topology:{
            data: result.data,
            links: result.links,
            loading: false,
            error:false
          }
      }
    }

    case LOAD_TOPOLOGY_ERROR:
      return {
        ...state,
        topology:{
          loading: false,
          error: true
        }
      }

      case LOAD_COMMUNICATION:
        {
          return {
            ...state,
            communication:{
              total:0,
              result: [],
              loading: true,
              error:false
            },
          };
        }

      case LOAD_COMMUNICATION_SUCCESS:
        {
          let result = action.result;
          return {
            ...state,
            communication:{
              total: result.total,
              result: result.data,
              loading: false,
              error:false
            }
        }
      }

      case LOAD_COMMUNICATION_ERROR:
        return {
          ...state,
          communication:{
            loading: false,
            error: true
          }
        }

    default:
      return state;
  }
};

/* 导出的字段名称固定, 方便后续的store去处理 */
export default {initialState, reducer};
