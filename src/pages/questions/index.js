import React, { useState } from 'react';
import { InputNumber, Button, Space, Modal, Card, Row, Col } from 'antd';
import './index.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';






function Questions() {
    const [value, setValue] = React.useState('1');
    const { confirm } = Modal;



    function showConfirm() {
        confirm({
            title: 'Quantas perguntas deseja responder?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                window.location.href = "/answer?quantidade=" + value
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    return (

        <Row>
            <Col span={8} xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}></Col>
            <Col span={8} xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <div className="site-card-border-less-wrapper">
                    <Card id='card' className="card-5 card" bordered={false}>
                        <Space>
                            <Row>
                                <h3 style={{ textAlign: 'center', margin: 20, padding: 25 }}>Escolha a quantidade de perguntas</h3>
                                <Col span={11} xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                                    <InputNumber min={1} max={50} value={value} onChange={setValue} />
                                </Col>
                                <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
                                <Col span={11} xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                                    <Button
                                        type="primary"
                                        onClick={showConfirm}
                                    >
                                        Confirmar
                                     </Button>
                                </Col>
                            </Row>
                        </Space>
                    </Card>
                </div>
            </Col>
            <Col span={8} span={8} xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}></Col>
        </Row >


    );
};

export default Questions;