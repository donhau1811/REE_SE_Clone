import { SET_CONTRACT_OF_BILLING_PROJECT, SET_SELECTED_BILLING_PROJECT } from '@constants/actions'

// ** Initial State
const initialState = {
  data: [],
  selectedProject: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTRACT_OF_BILLING_PROJECT:
      return {
        ...state,
        data: action.payload || []
      }
    case SET_SELECTED_BILLING_PROJECT:
      return {
        ...state,
        selectedProject: action.payload
      }
    default:
      return state
  }
}

export default reducer
