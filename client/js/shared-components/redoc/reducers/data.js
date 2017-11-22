import { SUCCESS } from 'core/actions/user/fetch'
import * as logoutTypes from 'core/actions/user/logout'


const data = (state = {}, action) => {
  switch (action.type) {
    case SUCCESS:
      return action.payload.schema
        ? action.payload.schema
        : state
    default:
      return state
  }
}


export default data
