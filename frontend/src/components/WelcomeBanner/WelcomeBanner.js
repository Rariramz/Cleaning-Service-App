import { Button, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CALCULATOR_ROUTE } from '../../utils/consts';

const { Title, Text, Link } = Typography;

const WelcomeBanner = () => {
  const navigate = useNavigate();
  
  return (
    <Row gutter={[40, 40]}>
      <Col span={24}>
        <Title level={1}>Welcome!</Title>
        <Text>
          Welcome to our cleaning service app! We are a team of professional cleaners
          who are dedicated to providing top-quality cleaning services to your homes.
          Look forward to serving you!
        </Text>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={() => {
          navigate(CALCULATOR_ROUTE);
        }}>
          Calculate price
        </Button>
      </Col>
    </Row>
  );
};

export default WelcomeBanner;