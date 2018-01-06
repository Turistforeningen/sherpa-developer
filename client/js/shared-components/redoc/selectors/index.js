import { createSelector } from 'reselect'


const KEY = 'shared-components/redoc'


export const getIsFetching = (state) => state[KEY].fetching


export const getFetchError = (state) => state[KEY].fetchError


export const getSchema = (state) => state[KEY].schema


export const getSchemaAttached = (state) => state[KEY].schemaAttached


export const getRedocScriptMounted = (state) => state[KEY].redocScriptMounted


export const getIsSchemaSet = createSelector(
  getSchema,
  (schema) => !!(schema && schema.swagger)
)
