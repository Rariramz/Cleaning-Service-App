import { Col, Row, Typography } from 'antd';
import React from 'react';

export const services = [
    {id: "1", name: "Cost per 100 sq.m.", cost: "50", costStr: "$50 per 100 sq.m." },
    {id: "2", name: "Cleaning bedrooms", cost: "75", costStr: "$75 per bedroom" },
    {id: "3", name: "Cleaning bathrooms", cost: "55", costStr: "$55 per bathroom" },
    {id: "4", name: "Changing bedsheets", cost: "10", costStr: "$10" },
    {id: "5", name: "Dusting blinds", cost: "20", costStr: "$20" },
    {id: "6", name: "Fridge cleaning", cost: "12", costStr: "$12" },
    {id: "7", name: "Oven cleaning", cost: "15", costStr: "$15" },
    {id: "8", name: "Window cleaning", cost: "149", costStr: "$149" },
    {id: "9", name: "Wash & dry laundry", cost: "10", costStr: "$10" },
    {id: "10", name: "Cabinet cleaning", cost: "7", costStr: "$7" },
    {id: "11", name: "Baseboard cleaning", cost: "10", costStr: "$10" },
];

const { Text, Title, Link } = Typography;

const Prices = () => {
  return (
    <>
        <Col xs={24} sm={18} md={16} lg={12} xl={10} xxl={8} className="grey-box">
            <Row gutter={[{xs: 10, sm: 10, md: 40}, 20]}>
                <Col span={12} className="text-left">
                    <Title level={5}>SERVICE</Title>
                </Col>
                <Col span={12} className="text-right">
                    <Title level={5}>COST</Title>
                </Col>
                {services.map(s => (
                    <React.Fragment key={s.name}>
                    <Col span={12} className="text-left">
                        <Text>{s.name}</Text>
                    </Col>
                    <Col span={12} className="text-right">
                        <Text strong>{s.costStr}</Text>
                    </Col>
                    </React.Fragment>
                    )
                )}
            </Row>
        </Col>
    </>
  );
};

export default Prices;