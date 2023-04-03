import React from 'react';
import { Row, Col, Typography, Collapse,Button, Checkbox, Form, Input, Descriptions } from 'antd';
import AvatarImage from '../AccountPage/AvatarImage';

const ProfileDescription = ({name, surname, mobile, email, avatar}) => {
  return (
    <Col span={24} className="text-center">
        <Descriptions bordered={false} column={1} className="text-center">
            <Descriptions.Item>
                <AvatarImage img={avatar} />
            </Descriptions.Item>
            {name && <Descriptions.Item>{name} {surname || ""}</Descriptions.Item>}
            {mobile && <Descriptions.Item>{mobile}</Descriptions.Item>}
            {email && <Descriptions.Item>{email}</Descriptions.Item>}
        </Descriptions>
    </Col>
  );
};

export default ProfileDescription;