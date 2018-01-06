import { ATTACH } from '../actions/attachRedocSchema'
import { DETACH } from '../actions/detachRedocSchema'


const schemaAttached = (state = false, action) => {
  switch (action.type) {
    case ATTACH:
      return true
    case DETACH:
      return false
    default:
      return state
  }
}


export default schemaAttached
