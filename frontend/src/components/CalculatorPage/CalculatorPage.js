import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import Calculator from './Calculator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChosenOptions, setTotalCost } from '../../redux/user/userSlice';
import { ORDERS_CHECKOUT_ROUTE } from '../../utils/consts';

const { Text, Title, Link } = Typography;

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const saveOptionsAndRedirect = () => {
    dispatch(setChosenOptions(services.values));
    dispatch(setTotalCost(services.totalCost));
    navigate(ORDERS_CHECKOUT_ROUTE);
  };

  return (
    <Row justify={"center"} gutter={[20, 20]}>
      <Row justify={"center"}>
        <Col span={24} className="text-center">
          <Title level={1}>House Cleaning Cost Calculator</Title>
          <Text className="subtitle">How much does our house cleaning services cost? Use the calculator below to find out</Text>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Calculator editMode={true} onChange={setServices} />
      </Row>
      <Row justify={"center"}>
        <Col span={24}>
          <Text className="subtitle" onClick={saveOptionsAndRedirect}>Are you ready to <Link>place the order</Link>? 😃</Text>
        </Col>
      </Row>
    </Row>
  );
};

export default CalculatorPage;