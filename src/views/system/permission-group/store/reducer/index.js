import { ROWS_PER_PAGE_DEFAULT } from '@constants/index'
// haimn check
import { FETCH_ROLE_REQUEST, SET_ALL_PERMISSION, SET_ALL_USER_ACTION, SET_ALL_USER_FEATURE } from '@constants/actions'

// ** Initial State
const initialState = {
  data: [],
  total: 0,
  selectedRole: {},
  roles:[],
  params: {
    pagination: {
      rowsPerPage: ROWS_PER_PAGE_DEFAULT,
      currentPage: 1
    }
  },
  allPermission: [],
  allUserFeature: [],
  allUserAction: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        roles: action?.data ? action.data : state.data,
        total: action?.total ? action?.total : state.total,
        params: action.params ? { ...state.params, ...action.params } : state.params
      }
    case SET_ALL_PERMISSION:
      return {
        ...state,
        allPermission: action?.payload || state.allPermission
      }
    case SET_ALL_USER_FEATURE:
      return {
        ...state,
        allUserFeature: action?.payload || state.allUserFeature
      }
    case SET_ALL_USER_ACTION:
      return {
        ...state,
        allUserAction: action?.payload || state.allUserAction
      }
    default:
      return state
  }
}

export default reducer
