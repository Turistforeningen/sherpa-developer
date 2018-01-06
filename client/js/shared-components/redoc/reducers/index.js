import { combineReducers } from 'redux'

import fetching from './fetching'
import fetchError from './fetchError'
import schema from './schema'
import schemaAttached from './schemaAttached'
import redocScriptMounted from './redocScriptMounted'


const redocReducers = combineReducers({
  fetching,
  fetchError,
  schema,
  schemaAttached,
  redocScriptMounted,
})


export default {
  'shared-components/redoc': redocReducers,
}
