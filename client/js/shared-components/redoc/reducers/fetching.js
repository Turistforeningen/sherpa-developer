import { FETCH, SUCCESS, ERROR } from '../actions/fetch'


const fetching = (state = false, action) => {
  switch (action.type) {
    case FETCH:
      return true
    case SUCCESS:
    case ERROR:
      return false
    default:
      return state
  }
}


export default fetching
