import React, { useEffect, useState } from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import { Row, Col, Typography, Spin, Select, Button } from 'antd';
import { useCompleteOrderMutation, useGetAddressByIdMutation, useGetImageMutation, useGetOrderByIdQuery, useGetOrderDetailsMutation,
  useGetOrderPaymentLinkMutation,
  useGetStatusByOrderIdMutation, useGetUserByIdMutation, useTakeOrderMutation } from '../../redux/api';
import Calculator from '../CalculatorPage/Calculator';
import OrderStatus from './OrderStatus';
import AvatarImage from '../AccountPage/AvatarImage';
import ProfileDescription from '../ProfileDescription/ProfileDescription';
import { useSelector } from 'react-redux';
import { ACCOUNT_ROUTE } from '../../utils/consts';
const { Text, Title, Link } = Typography;

const OrderPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [avatarProps, setAvatarProps] = useState({});
  const [initialValues, setInitialValues] = useState(null);
  const userRole = useSelector((state) => state.user.userRole);

  const { data : order, isLoading, isFetching, isSuccess, isError, error } = useGetOrderByIdQuery({ id });
  const [getUserById, { data, isLoading: isCleanerLoading }] = useGetUserByIdMutation();
  const [getImage, { data: cleanerAvatar}] = useGetImageMutation();
  const [getStatus, {data: orderStatus}] = useGetStatusByOrderIdMutation();
  const [getOrderDetails, { data: orderDetails, isSuccess: isOrderDetailsSuccess, isFetching: isOrderDetailsFetching }] = useGetOrderDetailsMutation();
  const [getAddress, {data: address}] = useGetAddressByIdMutation();
  const [takeOrder] = useTakeOrderMutation();
  const [completeOrder] = useCompleteOrderMutation();
  const [getOrderPaymentLink] = useGetOrderPaymentLinkMutation();
  const [cleaner, setCleaner] = useState(null);

  useEffect(() => {
    if (order && !orderStatus) {
      getStatus({id: order.id});
    }
    if (order && !orderDetails) {
      getOrderDetails({id: order.id})
      .unwrap()
      .then((orderDetails) => {
        setInitialValues(
          {
            homeSquareMeters: orderDetails.roomSquareM,
            bedrooms: orderDetails.nBedrooms,
            bathrooms: orderDetails.nBathrooms,
            changeBedsheets: orderDetails.changeBedSheets,
            dustingBlinds: orderDetails.dustingBlinds,
            cabinetCleaning: orderDetails.cabinetCleaning,
            ovenCleaning: orderDetails.ovenCleaning,
            windowCleaning: orderDetails.windowCleaning,
            washDryLaundry: orderDetails.washDryLaundry,
            baseboardCleaning: orderDetails.baseboardCleaning,
            fridgeCleaning: orderDetails.fridgeCleaning
          }
        )
      })
    }
    if (order && !address) {
      getAddress({id: order.addressId});
    }
    if (order && orderStatus && (orderStatus === 'active' || order.status === 'completed')) {
      getUserById({ id: order.cleanerId })
        .unwrap()
        .then((cleaner) => {
          setCleaner(cleaner)
          return cleaner;
        })
        .then((cleaner) => getImage({ id: cleaner.photoId }).unwrap())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
        .then((url) => setAvatarProps(url))
        .catch((e) => alert(`Image fetch ERROR: ${e.status}`))
    }
    if (error) {
      alert(`Order Fetch ERROR: ${error.status}`)
    }
  }, [order, error, orderStatus, address])

  const handleCleanerSelectChange = (status) => {
    switch (status) {
      case 'active':
        takeOrder({ id });
        break;
      case 'completed':
        completeOrder({ id });
        break;
    }
  }

  return isFetching ? (
    <Row justify={"center"} gutter={[20, 20]}>
      <Col span={24} className="text-center">
        <Spin size='large' />
      </Col>
    </Row>
  ) : (
    <Row justify={"center"} gutter={[20, 20]}>
      <Row justify={"center"}>
        <Col span={24} className="text-center">
          <Title level={1}>Order information</Title>
        </Col>
      </Row>
      <Row justify={"center"}>
        {isOrderDetailsFetching || (!initialValues) ? (<Spin size="large" />) : (<Calculator editMode={false} initialValues={initialValues} />)}
      </Row>
      <Row justify={"center"}>
        <Col xs={22} sm={22} md={18} lg={16} xl={12} xxl={8}>
          <Row justify={"center"}>
            <Col span={24}>
              <Title level={4}>Address: {address}</Title>
            </Col>
            <Col span={24}>
              <Title level={4}>Date: {new Date(order.dateOfOrder).toDateString()}</Title>
            </Col>
            <Col span={24}>
              {userRole === 'cleaner' ? (
                  <Select
                    style={{ width: 120 }}
                    onChange={handleCleanerSelectChange}
                    defaultValue='pending'
                    options={[
                      {
                        value: 'pending',
                        disabled: true,
                        label: 'Pending',
                      },
                      {
                        value: 'active',
                        label: 'Active',
                      },
                      {
                        value: 'completed',
                        label: 'Completed',
                      },
                    ]}
                  />
                ) : (
                  <OrderStatus status={orderStatus} />
                )
              }
            </Col>
          </Row>
        </Col>
        {orderStatus === 'awaits_payment' &&
          <Col xs={22} sm={22} md={18} lg={16} xl={12} xxl={8}>
            <Button type="primary" className="primary-button" onClick={() => {
              getOrderPaymentLink({ id })
              .unwrap()
              .then((link) => {
                window.open(
                  link,
                  '_blank'
                );
                navigate(ACCOUNT_ROUTE);
                }
              )
              .catch((e) => alert(`Payment ERROR: ${e.status}`))
            }}>
                Make payment
            </Button>
          </Col>
        }
        <Row justify={"center"}>
          {
            cleaner && avatarProps && (
                <Col xs={22} sm={22} md={18} lg={16} xl={12} xxl={8} className="grey-box">
                  <ProfileDescription name={cleaner.name} surname={cleaner.surname} email={cleaner.email} mobile={cleaner.mobile} avatar={avatarProps} /> 
                </Col>
              )
          }
        </Row>
      </Row>
    </Row>
  );
};

export default OrderPage;
