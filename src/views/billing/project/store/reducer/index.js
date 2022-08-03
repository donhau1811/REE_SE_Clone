import { ROWS_PER_PAGE_DEFAULT } from '@constants/index'
import { FETCH_PROJECT_REQUEST } from '@constants/actions'

// ** Initial State
const initialState = {
  data: [],
  total: 0,
  selectedProject: {},
  params: {
    pagination: {
      rowsPerPage: ROWS_PER_PAGE_DEFAULT,
      currentPage: 1
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        data: action?.data ? action.data : state.data,
        params: action.params,
        total: action.total
      }
    default:
      return state
  }
}

export default reducer
