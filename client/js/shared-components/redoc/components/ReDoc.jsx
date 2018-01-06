import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import connect from 'lib/wrappedConnect'

import fetch from '../actions/fetch'
import initRedocScript from '../actions/initRedocScript'
import attachRedocSchema from '../actions/attachRedocSchema'
import detachRedocSchema from '../actions/detachRedocSchema'
import {
  getRedocScriptMounted,
  getSchema,
  getIsFetching,
  getFetchError,
  getIsSchemaSet,
  getSchemaAttached,
} from '../selectors'

import { Spin } from 'antd'


const CDN = 'https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js'


class Redoc extends Component {
  redocRoot;
  redocElement;

  componentDidMount() {
    const { isRedocScriptMounted, actions, isSchemaSet } = this.props

    // Fetch schema
    if (!isSchemaSet) {
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
    const { actions } = this.props

    actions.detachRedocSchema()

    // Remove the redoc-element
    this.redocRoot.removeChild(this.redocElement)
  }

  componentWillReceiveProps(nextProps) {
    const {
      isRedocScriptMounted,
      isSchemaSet,
      schemaAttached,
      actions,
      schema,
    } = nextProps

    if (isSchemaSet && isRedocScriptMounted && !schemaAttached) {
      this.attachSchema(schema)
    }
  }

  @autobind
  onRedocScriptLoad() {
    const { actions } = this.props

    actions.initRedocScript()
    this.init()
  }

  @autobind
  init() {
    const {
      actions,
      isSchemaSet,
      isRedocScriptMounted,
      schemaAttached,
      schema,
    } = this.props

    if (!isSchemaSet) {
      actions.fetch()
    } else if (isRedocScriptMounted && !schemaAttached) {
      this.attachSchema(schema)
    }
  }

  @autobind
  attachSchema(schema) {
    const { actions } = this.props
    actions.attachRedocSchema()
    window.Redoc.init(schema, {})
  }

  render() {
    const { error, isFetching } = this.props

    if (isFetching) {
      return (
        <div>
          <Spin />
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
  isSchemaSet: getIsSchemaSet(state),
  schema: getSchema(state),
  schemaAttached: getSchemaAttached(state),
})


const ConnectedComponent = connect(
  mapStateToProps,
  {
    fetch,
    initRedocScript,
    attachRedocSchema,
    detachRedocSchema,
  }
)(Redoc)


export default ConnectedComponent
