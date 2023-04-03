import React, { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Collapse, Drawer, Badge, Spin } from 'antd';
import OrdersList from '../OrdersList/OrdersList';
import { useSelector } from 'react-redux';

const { Panel } = Collapse;
const { Text, Title, Link } = Typography;

const CollapseOrders = () => {
  const userRole = useSelector((state) => state.user.userRole);

  return (
    <Collapse
        accordion={true}
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse grey-box"
    >
      {userRole === 'cleaner' ? (
          <>
            <Panel key="1" header={<Title level={3}>Pending Orders <Badge color="rgb(223, 255, 0)" /></Title>}>
              <OrdersList type="allPending" />
            </Panel>
            <Panel key="2" header={<Title level={3}>My Active Orders <Badge color="rgb(101, 88, 255)" /></Title>}>
              <OrdersList type="cleanerActive" />
            </Panel>
          </>
        ) : (
          <>
            <Panel key="1" header={<Title level={3}>Pending Orders <Badge color="rgb(223, 255, 0)" /></Title>}>
              <OrdersList type="pending" />
            </Panel>
            <Panel key="2" header={<Title level={3}>Active Orders <Badge color="rgb(101, 88, 255)" /></Title>}>
              <OrdersList type="active" />
            </Panel>
            <Panel key="3" header={<Title level={3}>Completed Orders <Badge color="rgb(64, 224, 168)" /></Title>}>
              <OrdersList type="completed" />
            </Panel>
            <Panel key="4" header={<Title level={3}>Awaits Payment <Badge color="rgb(222, 49, 99)" /></Title>}>
              <OrdersList type="awaits_payment" />
            </Panel>
          </>
        )
      }
    </Collapse>
  );
};

export default CollapseOrders;