import { combineReducers } from 'redux'

import fetching from './fetching'
import fetchError from './fetchError'
import data from './data'
import redocScriptMounted from './redocScriptMounted'


const redocReducers = combineReducers({
  fetching,
  fetchError,
  data,
  redocScriptMounted,
})


export default {
  'shared-components/redoc': redocReducers,
}
