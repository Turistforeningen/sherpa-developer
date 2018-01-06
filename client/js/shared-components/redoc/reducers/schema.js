import { SUCCESS } from '../actions/fetch'


const schema = (state = {}, action) => {
  switch (action.type) {
    case SUCCESS:
      return action.payload.schema
        ? action.payload.schema
        : state
    default:
      return state
  }
}


export default schema
