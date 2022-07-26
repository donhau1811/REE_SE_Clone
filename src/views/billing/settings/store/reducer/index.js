import {
  ROWS_PER_PAGE_DEFAULT

} from '@constants/index'
import { FETCH_SETTINGS_REQUEST } from '@constants/actions'

// ** Initial State
const initialState = {
  data: [],
  total: 0,
  params: {
    page: 1,
    rowsPerPage: ROWS_PER_PAGE_DEFAULT,
    order: 'createDate desc',
    state: '*',
    fk: '["settings", "projects", "group"]'
  },
  paramsActivities: {
    page: 1,
    rowsPerPage: ROWS_PER_PAGE_DEFAULT,
    state: '*',
    fk: '*'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_REQUEST:
      return {
        ...state,
        allData: action?.data ? action.data : state.allData,
        data: action?.data ? action.data : state.data,
        total: action.total,
        params: action.params ? { ...state.params, ...action.params } : state.params
      }
      default:
        return state
}
}

export default reducer
