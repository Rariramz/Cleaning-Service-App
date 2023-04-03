import React, { useEffect, useState } from 'react';
import { Menu, Space } from 'antd';
import { cleanerRoutes, clientRoutes, publicRoutes, routes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  let navigate = useNavigate();

  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {    
    navigate(key);
  };

  const userRole = useSelector((state) => state.user.userRole);
  const [items, setItems] = useState(publicRoutes);
  
  useEffect(() => {
    switch (userRole) {
      case 'user':
        setItems(clientRoutes);
        break;
      case 'cleaner':
        setItems(cleanerRoutes);
        break;
      default:
        setItems(publicRoutes);
    }
  }, [userRole])
  
  return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        onSelect={onSelect}
        selectedKeys={[window.location.pathname]}
        items={items.filter(route => route.hasOwnProperty("linkName")).map(route => ({key: route.path, label: route.linkName}))}
      />
  );
};

export default Navbar;