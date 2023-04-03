import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Typography, Button } from 'antd';
import Calculator from '../CalculatorPage/Calculator';
import { useCreateOrderMutation, useGetOrderPaymentLinkMutation, useSetUserAddressMutation } from '../../redux/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Text, Title, Link } = Typography;

const OrderCheckoutPage = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [setUserAddress] = useSetUserAddressMutation();
  const [createOrder] = useCreateOrderMutation();
  const [getOrderPaymentLink] = useGetOrderPaymentLinkMutation();
  const navigate = useNavigate();
  const chosenOptions = useSelector((state) => state.user.chosenOptions);

  const onFinish = (values) => {
    setUserAddress({ city: values.address });
    createOrder(chosenOptions)
      .unwrap()
      .then((id) => getOrderPaymentLink({ id }).unwrap())
      .then((link) => {
        window.open(
          link,
          '_blank'
        );
        setIsConfirmed(true);
      })
      .catch((e) => alert(`Payment ERROR: ${e.status}`))
      
    // SET DATE OF CLEANING - need to add server endpoint
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Row justify={"center"} gutter={[20, 20]}>
      { !isConfirmed
        ? (<>
            <Col span={24} className="text-center">
              <Title level={1}>Confirm Order</Title>
            </Col>
            <Col span={24} className="text-center">
              <Row justify={"center"}>
                <Calculator editMode={false} initialValues={chosenOptions} />
              </Row>
            </Col>
            <Col span={24} className="text-center">
              <Row justify={"center"}>
                <Col xs={22} sm={22} md={18} lg={16} xl={12} xxl={8} className="grey-box">
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Text>Address</Text>
                        <Form.Item name='address' rules={[
                            {
                              required: true,
                              message: '',
                            }
                          ]}
                        >  
                          <Input placeholder="city, street, building, block, apartment" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Text>Date</Text>
                        <Form.Item name='date' rules={[
                            {
                              required: true,
                              message: '',
                            }
                          ]}
                        >
                          <DatePicker onChange={() => {}} />
                        </Form.Item>
                      </Col>

                      <Col span={24} className="text-center">                        
                        <Button className="transparent-button" htmlType="submit">
                          <Link>
                            Next
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </>)
        : (<>
            <Col span={24} className="text-center">
              <Title level={1}>Done!</Title>
              <Text className="subtitle" onClick={() => {navigate('/account')}}>You can view your orders in your <Link>account</Link></Text>
            </Col>
            <Col span={24} className="text-center">
              <Row justify={"center"}>
                
              </Row>
            </Col>
          </>)
        }
    </Row>
  );
};

export default OrderCheckoutPage;
