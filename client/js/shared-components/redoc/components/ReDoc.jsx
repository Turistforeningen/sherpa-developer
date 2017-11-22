import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import connect from 'lib/wrappedConnect'

import fetch from '../actions/fetch'
import initRedocScript from '../actions/initRedocScript'
import {
  getRedocScriptMounted,
  getData,
  getIsFetching,
  getFetchError,
  getIsDataSet,
} from '../selectors'

import { Dimmer, Loader, Segment } from 'semantic-ui-react'


const CDN = 'https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js'


class Redoc extends Component {
  redocRoot;
  redocElement;

  componentDidMount() {
    const { isRedocScriptMounted, actions, data } = this.props

    // Fetch schema
    if (!data) {
      actions.fetch()
    }

    // Add redoc-element to document
    this.redocRoot = document.getElementById('redoc-root')
    this.redocElement = document.createElement('redoc')
    this.redocRoot.appendChild(this.redocElement)

    // Load redoc-script and initiate
    if (!isRedocScriptMounted) {
      const script = document.createElement('script')
      script.src = CDN
      script.onload = this.onRedocScriptLoad
      document.body.appendChild(script)
    } else {
      this.init()
    }
  }

  componentWillUnmount() {
    // Remove the redoc-element
    this.redocRoot.removeChild(this.redocElement)
  }

  @autobind
  onRedocScriptLoad() {
    const { actions } = this.props

    actions.initRedocScript()
    this.init()
  }

  @autobind
  init() {
    const { actions, isDataSet } = this.props
    if (!isDataSet) {
      actions.fetch()
    }
  }

  render() {
    const { error, isFetching } = this.props

    if (isFetching) {
      return (
        <div>
          <Segment>
            <Dimmer active>
              <Loader content='Loading!' />
            </Dimmer>
          </Segment>
        </div>
      )
    }

    if (error) {
      return <div>ERROR</div>
    }

    return (
      <div>Redoc</div>
    )
  }
}


const mapStateToProps = (state) => ({
  isRedocScriptMounted: getRedocScriptMounted(state),
  isFetching: getIsFetching(state),
  error: getFetchError(state),
  isDataSet: getIsDataSet(state),
  data: getData(state),
})


const ConnectedComponent = connect(
  mapStateToProps,
  { fetch, initRedocScript }
)(Redoc)


export default ConnectedComponent
