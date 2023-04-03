import React from 'react';
import { Avatar } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

// const AvatarImage = () => <img src='http://aleksyy.ddns.net:60303/api/images/8e15ccd9-f4a8-4530-bc98-33b5904c2d05'/>;
const AvatarImage = ({ img }) => {
  return img ? (
        <Avatar
            size={80}
            src={img}
        />
    ) : (
        <Avatar
            size={80}
            icon={<SmileOutlined />}
        />
    )
};

export default AvatarImage;