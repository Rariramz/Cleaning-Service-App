import React, { useEffect, useState } from 'react';
import { Typography, Spin, List } from 'antd';
import { useGetAllPendingOrdersMutation, useGetCleanerActiveOrdersMutation, useGetOrdersByTypeMutation } from '../../redux/api';
import Order from './Order';
const { Text, Title, Link } = Typography;

const OrdersList = ({ type }) => {
  const [orders, setOrders] = useState(null);
  const [getAllPendingOrders, { isLoading: isAllPendingLoading }] = useGetAllPendingOrdersMutation();
  const [getOrdersByType, { isLoading: isOrdersByTypeLoading }] = useGetOrdersByTypeMutation();
  const [getCleanerActiveOrders, { isLoading: isCleanerActiveLoading }] = useGetCleanerActiveOrdersMutation();

  useEffect(() => {
    switch (type) {
      case 'allPending':
        getAllPendingOrders()
        .unwrap()
        .then((orders) => setOrders(orders))
        break;
      case 'cleanerActive':
        getCleanerActiveOrders()
        .unwrap()
        .then((orders) => setOrders(orders))
        break;
      default:
        getOrdersByType({ type })
        .unwrap()
        .then((orders) => setOrders(orders))
    };
  }, []);

  return (isOrdersByTypeLoading || isAllPendingLoading || isCleanerActiveLoading || (!orders))
    ? (<Spin size="large" />)
    : (
      <List
        bordered={false}
        split={false}
        className="demo-loadmore-list"
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={orders}
        renderItem={(id) => (
          <Order id={id} />
        )}
      />
    );
};

export default OrdersList;