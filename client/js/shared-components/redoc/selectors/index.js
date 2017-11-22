import { createSelector } from 'reselect'


const KEY = 'shared-components/redoc'


export const getIsFetching = (state) => state[KEY].fetching


export const getFetchError = (state) => state[KEY].fetchError


export const getData = (state) => state[KEY].data


export const getRedocScriptMounted = (state) => state[KEY].redocScriptMounted


export const getIsDataSet = createSelector(
  getData,
  (data) => data && data.swagger
)
