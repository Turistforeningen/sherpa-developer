import { FETCH, SUCCESS, ERROR } from '../actions/fetch'


const fetchError = (state = false, action) => {
  switch (action.type) {
    case FETCH:
      return null
    case SUCCESS:
      return action.payload.error
        ? action.payload.error
        : null
    case ERROR:
      return 'network error'
    default:
      return state
  }
}


export default fetchError
