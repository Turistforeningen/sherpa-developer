import { INIT } from '../actions/initRedocScript'


const redocScriptMounted = (state = false, action) => {
  switch (action.type) {
    case INIT:
      return true
    default:
      return state
  }
}


export default redocScriptMounted
