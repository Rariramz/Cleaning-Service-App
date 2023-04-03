import React from 'react';
import { Layout, Row, Col } from 'antd';
import Navbar from '../components/Navbar/Navbar';
import Basement from '../components/Basement/Basement';
import './layout-container.less';

const { Header, Footer, Content } = Layout;

const LayoutContainer = (props) => {
  return (
      <Layout className='layout'>  
        <Header>
          <Navbar />
        </Header>
        <Content className='layout-content'>
          <Row align='middle' justify='center'>
            <Col xs={22} sm={20} md={18} lg={18} xl={18} xxl={14}>
              {props.children}
            </Col>
          </Row>
        </Content>
        <Footer className='layout-footer'>
          <Basement />
        </Footer>
      </Layout>
  );
}

export default LayoutContainer;
