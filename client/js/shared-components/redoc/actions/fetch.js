import api from 'core/api'

import { getIsFetching } from '../selectors'

export const FETCH = 'app/shared-components/redoc/fetch/FETCH'
export const SUCCESS = 'app/shared-components/redoc/fetch/SUCCESS'
export const ERROR = 'app/shared-components/redoc/fetch/ERROR'


const fetch = () => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return Promise.resolve()
  }

  dispatch({type: FETCH})

  const opts = {
    url: '/api/schema',
    method: 'GET',
  }

  return api(opts).then(
    (response) => {
      dispatch({
        type: SUCCESS,
        payload: response,
      })
    },
    (error) => {
      dispatch({
        type: ERROR,
        message: error.message || 'unknown error',
      })
    }
  )
}


export default fetch
