import React, { useState } from 'react';
import { Button, Row, Col, Form, Input, InputNumber, Radio, Select, Switch, Checkbox, DatePicker, Typography } from 'antd';
import { services } from '../PricesPage/Prices';
import { useSelector } from 'react-redux';

const { Text, Title, Link } = Typography;

const Calculator = ({ editMode, onChange, initialValues={
      homeSquareMeters: 50,
      dustingBlinds: true,
      bedrooms: 1,
      ovenCleaning: true,
      bathrooms: 1,
      windowCleaning: true,
      changeBedsheets: true,
      washDryLaundry: true,
      fridgeCleaning: true,
      baseboardCleaning: true,
      cabinetCleaning: true,
    }
  }) => {  
  const [form] = Form.useForm();
  const [totalCost, setTotalCost] = useState(calculateCost(initialValues));
  const chosenOptions = useSelector((state) => state.user.chosenOptions);

  const onValuesChange = (values) => {
    form.submit();
  };

  function calculateCost({
    homeSquareMeters,
    bedrooms,
    bathrooms,
    changeBedsheets,
    dustingBlinds,
    fridgeCleaning,
    ovenCleaning,
    windowCleaning,
    washDryLaundry,
    cabinetCleaning,
    baseboardCleaning,
  }) {
    return (
      (+homeSquareMeters / 100 * services[0].cost) +
      (+bedrooms * services[1].cost) +
      (+bathrooms * services[2].cost) +
      (+changeBedsheets * services[3].cost) +
      (+dustingBlinds * services[4].cost) +
      (+fridgeCleaning * services[5].cost) +
      (+ovenCleaning * services[6].cost) +
      (+windowCleaning * services[7].cost) +
      (+washDryLaundry * services[8].cost) +
      (+cabinetCleaning * services[9].cost) +
      (+baseboardCleaning * services[10].cost)
    )
  }

  const onFinish = (values) => {
    const {
      homeSquareMeters,
      bedrooms,
      bathrooms,
      changeBedsheets,
      dustingBlinds,
      fridgeCleaning,
      ovenCleaning,
      windowCleaning,
      washDryLaundry,
      cabinetCleaning,
      baseboardCleaning,
    } = values;
    onChange({ values, totalCost });
    setTotalCost(calculateCost(values));
  };

  const onFinishFailed = (errorInfo) => {
    // alert(`Form ERROR`);
    // console.log(errorInfo);
  };

  const extraProps = editMode ? {
    "bordered": true,
  } : {
    "disabled": true,
  };

  return (
    <>
      <Col xs={22} sm={22} md={18} lg={16} xl={12} xxl={8} className="grey-box text-left">
        <Form
          form={form}
          initialValues={initialValues}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Row gutter={[50, 10]}>
            <Col xs={24} sm={12}>
              <Text>HOME SQUARE METERS</Text>
              <Form.Item name='homeSquareMeters' rules={[
                  {
                    required: true,
                    message: '',
                  }
                ]}
                onChange={onValuesChange}
              >  
                <InputNumber
                  size="large"
                  min={10}
                  max={1000}
                  addonAfter="sq. m."
                  formatter={(value) => +value.split(/[,.]/)[0]}
                  step={10}
                  onChange={onValuesChange}
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>DUSTING BLINDS</Text>
              <Form.Item name='dustingBlinds' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>BEDROOMS</Text>
              <Form.Item name='bedrooms' rules={[
                  {
                    required: true,
                    message: '',
                  }
                ]}
                onChange={onValuesChange}
              >
                <InputNumber
                  size="large"
                  min={1}
                  max={6}
                  addonAfter="bedroom(s)"
                  formatter={(value) => +value.split(/[,.]/)[0]}
                  {...extraProps}
                  onChange={onValuesChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>OVEN CLEANING</Text>
              <Form.Item name='ovenCleaning' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>         
            <Col xs={24} sm={12}>
              <Text>BATHROOMS</Text>
              <Form.Item name='bathrooms' rules={[
                  {
                    required: true,
                    message: '',
                  }
                ]}
                onChange={onValuesChange}
              >
                <InputNumber
                  size="large"
                  min={1}
                  max={6}
                  addonAfter="bathroom(s)"
                  formatter={(value) => +value.split(/[,.]/)[0]}
                  {...extraProps}
                  onChange={onValuesChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>WINDOW CLEANING</Text>
              <Form.Item name='windowCleaning' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>          
            <Col xs={24} sm={12}>
              <Text>CHANGE BEDSHEETS</Text>
              <Form.Item name='changeBedsheets' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>WASH & DRY LAUNDRY</Text>
              <Form.Item name='washDryLaundry' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>FRIDGE CLEANING</Text>
              <Form.Item name='fridgeCleaning' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>BASEBOARD CLEANING</Text>
              <Form.Item name='baseboardCleaning' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>CABINET CLEANING</Text>
              <Form.Item name='cabinetCleaning' valuePropName='checked'>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  {...extraProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name='totalCost'>
                <br/>
                <Title level={4}>TOTAL COST: {`${totalCost}$`}</Title>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
};

export default Calculator;