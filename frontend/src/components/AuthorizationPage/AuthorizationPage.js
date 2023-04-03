import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Row, Col, Typography } from 'antd';
const { Text, Title, Link } = Typography;

const AuthorizationPage = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <Row justify={"center"} gutter={[20, 20]}>
      {hasAccount
        ? (<>
            <Col span={24} className="text-center">
              <Title level={1}>Sign In</Title>
              <Text className="subtitle" onClick={() => setHasAccount(false)}>Don't have an account? <Link>Sign Up!</Link></Text>
            </Col>
            <Col span={24} className="text-center">
              <Row justify={"center"}>
                <SignIn />
              </Row>
            </Col>
          </>)
        : (<>
            <Col span={24} className="text-center">
              <Title level={1}>Sign Up</Title>
              <Text className="subtitle" onClick={() => setHasAccount(true)}>Already have an account? <Link>Sign In!</Link></Text>
            </Col>
            <Col span={24} className="text-center">
              <Row justify={"center"}>
                <SignUp redirect={() => setHasAccount(true)} />
              </Row>
            </Col>
          </>)
        }
    </Row>
  );
};

export default AuthorizationPage;
