import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Collapse, Drawer, Badge, Spin } from 'antd';
import ProfileForm from './ProfileForm';
import ProfileDescription from '../ProfileDescription/ProfileDescription';
import { useGetImageMutation, useGetUserQuery, useSetImageMutation } from '../../redux/api';
import { setUser } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import CollapseOrders from '../CollapseOrders/CollapseOrders';

const AccountPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching, isSuccess, isError } = useGetUserQuery();
  const [getImage] = useGetImageMutation();
  const [setImage] = useSetImageMutation();

  const [avatar, setAvatar] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      if (data.photoId)
        getImage({ id: data.photoId })
          .unwrap()
          .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          }))
          .then((url) => setAvatar(url))
          .catch((e) => console.log(`Image fetch ERROR: ${e.status}`))
    }
    if (error) {
      console.log(`User ERROR: ${error.status}`)
    }
  }, [data, error])

  const onSave = (data) => {
    if (data) {
      setImage(data)
      .unwrap()
      .then(() => console.log('SUCCESS setImage'))
      .catch((e) => console.log(`Image ERROR: ${e.status}`))
    }
    // console.log("!!!!!!", firstName, lastName, mobile, email, newAvatar)
    //SAVE
    closeDrawer();
  }
  const onCancel = () => {
    closeDrawer();
  }
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return isFetching ? (<Spin size="large" />) : (
    <Row justify={"center"} gutter={[80, 40]}>
      <Col xs={20} sm={16} md={14} lg={8} xl={6} xxl={6} className="grey-box clickable">
        <Row className="clickable" onClick={showDrawer}>
          <ProfileDescription name={data?.firstName} surname={data?.lastName} mobile={data?.mobile} email={data?.email} avatar={avatar} />
        </Row>
        <Drawer
          title="Edit Profile"
          closable={true}
          placement="left"
          onClose={closeDrawer}
          open={drawerOpen}
        >
          <Row justify={"center"} gutter={[20, 20]}>
            <Col span={24}>
              <ProfileForm onSave={onSave} onCancel={onCancel} name={data?.firstName} surname={data?.lastName} mobile={data?.mobile} email={data?.email} avatar={avatar} />
            </Col>
          </Row>   
        </Drawer>
      </Col>
      <Col xs={24} sm={24} md={24} lg={16} xl={18} xxl={18}>
        <CollapseOrders />
      </Col>
    </Row>
  );
};

export default AccountPage;