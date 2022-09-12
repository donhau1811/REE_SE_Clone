import { ROWS_PER_PAGE_DEFAULT } from '@constants/index'
import { FETCH_INPUT_CLOCK_INDEX, SET_INPUT_CLOCK_INDEX_PARAMS } from '@constants/actions'

// ** Initial State
const initialState = {
  data: [],
  total: 0,
  params: {
    pagination: {
      rowsPerPage: ROWS_PER_PAGE_DEFAULT,
      currentPage: 1
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INPUT_CLOCK_INDEX:
      return {
        ...state,
        data: action?.data || state.data,
        params: action?.params,
        total: action?.total
      }
    case SET_INPUT_CLOCK_INDEX_PARAMS:
      return {
        ...state,
        params: action.payload
      }
    default:
      return state
  }
}

export default reducer
