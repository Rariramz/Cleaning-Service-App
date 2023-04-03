import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useRegisterMutation } from '../../redux/api';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ redirect }) => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const onFinish = (values) => {
      console.log('onFinish', values);
      register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobile: values.mobile,
        password: values.password
      })
        .unwrap()
        .then(() => {
          redirect();
        })
        .catch((e) => alert(`ERROR: ${e.status}`));
    };

    const onFinishFailed = (errorInfo) => {
      alert('ERROR: Incorrect Form')
    };

    return (
      <>
        <Col xs={24} sm={22} md={20} lg={16} xl={14} xxl={14} className="grey-box">
          <Form
            name="basic"
            labelCol={{
              xs: {span: 24},
              sm: {span: 10},              
            }}
            wrapperCol={{
              xs: {span: 24},
              sm: {span: 12},
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
                  label="Name"
                  name="firstName"
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
                  label="Surname"
                  name="lastName"
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
                  label="Mobile"
                  name="mobile"
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
                  label="Password Confirmation"
                  name="passwordConfirmation"
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
                    sm: {span: 12, offset: 10},
                  }}
                  className="text-left"
                >                
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
        
              <Col span={24}>
                <Form.Item wrapperCol={{
                  xs: {span: 24},
                  sm: {span: 12, offset: 10},
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

export default SignUp;