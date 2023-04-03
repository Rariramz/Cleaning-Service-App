import React, { useState } from 'react';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Collapse, Button, Drawer, Space, Badge, Spin, Form, Input, Upload } from 'antd';
import AvatarImage from './AvatarImage';
import UploadImage from './UploadImage';

const ProfileForm = ({ onSave, onCancel, name, surname, mobile, email, avatar }) => {
    const [editMode, setEditMode] = useState(true);  
    const [file, setFile] = useState([]);

    const onFinishFailed = (errorInfo) => {
        alert(`From ERROR`);
    };

    const extraProps = editMode ? {
        "bordered": true,
    } : {
        "bordered": false,
        "readOnly": true,
    };

    const saveChanges = (values) => {
        const data = new FormData();
        //data.append("file", values.newAvatar.file.originFileObj);
        data.append("file", file[0].originFileObj);
        // console.log(data)

        // const { firstName, lastName, mobile, email } = values;
        // values = { firstName, lastName, mobile, email, file }
        // setEditMode(false);
        onSave(data);
      };
    
    const cancelChanges = () => {
        setEditMode(false);
        onCancel();
    };

  return (
    <Col span={24}>
        <Form
            name="basic"
            labelCol={{ xs: 6 }}            
            wrapperCol={{ xs: 18 }}
            initialValues={{
                avatar: avatar,
                firstName: name,
                lastName: surname,
                mobile: mobile,
                email: email,
            }}
            onFinish={saveChanges}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
        >
            <Row gutter={[50, 10]} justify="center">
                {editMode ? (
                    <Col span={24} className="text-center">
                        <Form.Item label="Photo" name="newAvatar" valuePropName="file" preserve>
                            {/* <Upload showUploadList={false}>
                                <Button>Upload</Button>
                            </Upload> */}
                            <UploadImage setFile={setFile} />
                        </Form.Item>
                    </Col>
                ) : (
                    <Col span={24} className="text-center">
                        <Form.Item name="avatar">
                            <AvatarImage />
                        </Form.Item>
                    </Col>
                )}

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
                        <Input {...extraProps} />
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
                        <Input {...extraProps} />
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
                        <Input {...extraProps} />
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
                        <Input {...extraProps} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                    {
                    editMode
                        ? (
                        <Button type="success" htmlType="submit" className='primary-button' onClick={saveChanges}>
                            <CheckOutlined />
                        </Button>
                        ) : (
                        <Button type="primary" htmlType="submit" className='primary-button' onClick={() => setEditMode(true)}>
                            <EditOutlined />
                        </Button>
                        )
                    }
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                    {
                    editMode
                        && (
                        <Button type="danger" htmlType="submit" className='primary-button' onClick={cancelChanges}>
                            <CloseOutlined />
                        </Button>
                        )
                    }
                    </Form.Item>
                </Col>    
            </Row>
        </Form>
    </Col>
  );
};

export default ProfileForm;