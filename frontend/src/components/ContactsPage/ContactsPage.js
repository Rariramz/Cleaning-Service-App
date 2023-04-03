import React from 'react';
import { Row, Col, Typography } from 'antd';
import ProfileDescription from '../ProfileDescription/ProfileDescription';
import smile from "../../assets/smile.png";

const { Text, Title, Link } = Typography;

const ContactsPage = () => {
  return (
    <Row justify={"center"} gutter={[40, 40]}>
      <Col span={24} className="text-center">
        <Title level={1}>Contact Us</Title>
        <Text className="subtitle">Contact us if you have any problems</Text>
      </Col>
      <Col xs={20} sm={16} md={14} lg={12} xl={10} xxl={8} className="text-left grey-box">
        <ProfileDescription email={"admin.help@gmail.com"} mobile={"+375 (17) 222-33-44"} avatar={smile} />
      </Col>
    </Row>
  );
};

export default ContactsPage;