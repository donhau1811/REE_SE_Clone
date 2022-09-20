import { ROWS_PER_PAGE_DEFAULT } from '@constants/index'
// haimn check
import { FETCH_ROLE_REQUEST } from '@constants/actions'

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
  }
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
    default:
      return state
  }
}

export default reducer
