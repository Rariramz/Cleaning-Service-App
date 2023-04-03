import React from 'react';
import { Button, Row, Col, Form, Input, InputNumber, Radio, Select, Switch, Checkbox, DatePicker, Typography, Badge } from 'antd';

const { Text, Title, Link } = Typography;

const OrderStatus = ({ status }) => {
  return (
    <>
      {(status === 'awaits_payment') && (<Title level={4}>Status: awaits payment <Badge color="rgb(222, 49, 99)" /></Title>)}
      {(status === 'active') && (<Title level={4}>Status: {status} <Badge color="rgb(101, 88, 255)" /></Title>)}
      {(status === 'pending') && (<Title level={4}>Status: {status} <Badge color="rgb(223, 255, 0)" /></Title>)}
      {(status === 'completed') && (<Title level={4}>Status: {status} <Badge color="rgb(64, 224, 168)" /></Title>)}
    </>
  );
};

export default OrderStatus;