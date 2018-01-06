import React from 'react'

import { Layout } from 'antd'


const { Header, Content } = Layout


const CoreLayout = ({ children }) => (
  <Layout>
    <Header>Header!</Header>
    <Content>
      { children }
    </Content>
  </Layout>
)


export default CoreLayout
