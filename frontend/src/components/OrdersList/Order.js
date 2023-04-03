import React, { useEffect, useState } from 'react';
import { Typography, Spin, List } from 'antd';
import { useGetAddressByIdMutation, useGetImageMutation, useGetOrderByIdQuery, useGetStatusByOrderIdMutation, useGetUserByIdMutation } from '../../redux/api';
import { ORDERS_ROUTE } from '../../utils/consts';
import AvatarImage from '../AccountPage/AvatarImage';
const { Item} = List;
const { Meta } = Item;
const { Text, Title, Link } = Typography;

const Order = ({ id }) => {
    const [avatarProps, setAvatarProps] = useState({});

    const { data : order, isLoading, isFetching, isSuccess, isError, error } = useGetOrderByIdQuery({ id });
    const [getUserById] = useGetUserByIdMutation();
    const [getImage, { data: cleanerAvatar}] = useGetImageMutation();
    const [getStatus, {data: orderStatus}] = useGetStatusByOrderIdMutation();
    const [getAddress, {data: address}] = useGetAddressByIdMutation();

    useEffect(() => {
        if (order && !orderStatus) {
            getStatus({id: order.id});
        }
        if (order && !address) {
            getAddress({id: order.addressId});
        }
        if (order && orderStatus && (orderStatus === 'active' || orderStatus === 'completed')) {
            getUserById({ id: order.cleanerId })
                .unwrap()
                .then((cleaner) => getImage({ id: cleaner.id }))
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = reject
                    reader.readAsDataURL(blob)
                }))
                .then((url) => setAvatarProps(<AvatarImage img={url} />))
                .catch((e) => alert(`Image fetch ERROR: ${e.status}`));
        }
        if (error) {
            alert(`Order Fetch ERROR: ${error.status}`)
        }
    }, [order, error]);

    return isFetching ? (<Spin size="small" />) : (
        <Item
            // actions={[<a key="list-delete-item">delete</a>]}
        >
            <Meta
                {...avatarProps}
                title={<Link href={ORDERS_ROUTE + `/${order.id}`}>Order {order.id}</Link>}
                description={`date: ${new Date(order.dateOfOrder).toDateString()}, address: ${address}, price: ${order.price}`}
            />
        </Item>
    )
}

export default Order;