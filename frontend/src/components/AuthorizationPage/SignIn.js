import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useLoginMutation } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { setAccessToken, setIsLogin, setRefreshToken, setUserRole } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, HOME_ROUTE } from '../../utils/consts';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { data, error, isLoading, isSuccess, isError }] = useLoginMutation();

    const onFinish = (values) => {
      login({
        email: values.email,
        password: values.password
      })
        .unwrap()
        .then((data) => {
          dispatch(setAccessToken(data.jwt));
          dispatch(setRefreshToken(data.refresh));
          dispatch(setIsLogin(true));
          navigate(HOME_ROUTE);
        })
        .catch((e) => alert(`ERROR: ${e.status}`));
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
      alert('ERROR: Incorrect Form')
    };

    return (
      <>
        <Col xs={24} sm={20} md={16} lg={12} xl={12} xxl={10} className="grey-box">
          <Form
            name="basic"
            labelCol={{
              xs: {span: 24},
              sm: {span: 6},
            }}
            wrapperCol={{
              xs: {span: 24},
              sm: {span: 16},
            }}            
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={[50, 10]} justify="center">
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
        
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    xs: {span: 24},
                    sm: {span: 16, offset: 6},
                  }}
                  className="text-left"
                >                
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item wrapperCol={{
                  xs: {span: 24},
                  sm: {span: 16, offset: 6},
                }}
                >
                  <Button type="primary" htmlType="submit" className="primary-button">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </>
    );
};

export default SignIn;