import React from 'react';
import { Row, Col, Typography } from 'antd';
import Prices from './Prices';

const { Text, Title, Link } = Typography;

const PricesPage = () => {
  return (
    <Row justify={"center"} gutter={[20, 20]}>
      <Row>
        <Col span={24} className="text-center">
          <Title level={1}>Our Prices</Title>
          <Text className="subtitle">Our prices remain fixed regardless of the complexity of cleaning* 😉</Text>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Prices />
      </Row>
    </Row>
  );
};

export default PricesPage;