import React from 'react';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import { Row, Col } from 'antd';
import background from '../../assets/cleaning-tools-hero.jpeg'

const HomePage = () => {
  return (
    <Row>
      <Col xs={22} sm={18} md={14} xl={10} xxl={10} className="text-left">
        <WelcomeBanner />
      </Col>
    </Row>
  );
};

export default HomePage;

