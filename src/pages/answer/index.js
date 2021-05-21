import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Col, Radio, Space, Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';







const Answer = () => {

    const [data, setData] = useState([])

    const [resposta, setResposta] = useState({ "corretas": 0, "erradas": 0 })

    const { confirm } = Modal;


    const perguntas = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('quantidade');

        const url = 'https://opentdb.com/api.php?amount=' + myParam

        axios.get(url).then(res => setData(res.data.results))
    }

    useEffect(() => {
        perguntas()
        localStorage.removeItem('respostas');
    }, [])

    const embaralhar = (correta, incorreta) => {
        let array = []
        array.push(correta)

        incorreta.map(el => {
            array.push(el)
        })
        array['correta'] = correta
        return array
    }


    const shuffle = (array) => {
        var m = array.length, t, i;

        while (m) {

            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }


    function showConfirm(resposta, minhaResposta, respostaCorreta) {
        confirm({
            title: 'Sua resposta esta  ' + resposta + '!',
            icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    A sua resposta foi  <b>{minhaResposta}</b>
                    <br />
                    A resposta correta é  <b>{respostaCorreta}</b>
                </>
            ),
            onOk() {
                console.log('Cancel');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    function showResposta() {
        const nota = JSON.parse(localStorage.getItem('respostas'));
        if (nota) {
            confirm({
                title: 'Sua nota é!',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <>
                        Corretas {nota.corretas}
                        <br />
                    Erradas {nota.erradas}
                    </>
                ),
                onOk() {
                    console.log('Cancel');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Questions</h1>
            <div style={{ textAlign: 'left' }}>
                <Button
                    type="primary"
                    onClick={ () => {window.location.href = "/home"}}
                >
                    Home
                </Button>
            </div>
            {
                data.map(function (name, i) {
                    const array = shuffle(embaralhar(name.correct_answer, name.incorrect_answers))
                    let disabled = false;
                    const validar = (tes) => {
                        if (array.correta == tes.target.value) {
                            resposta.corretas += 1
                            setResposta(resposta)
                            localStorage.setItem('respostas', JSON.stringify(resposta));
                            showConfirm('CORRETA', tes.target.value, array.correta)
                        } else {
                            resposta.erradas += 1
                            setResposta(resposta)
                            localStorage.setItem('respostas', JSON.stringify(resposta));
                            showConfirm('ERRADA', tes.target.value, array.correta)
                        }
                        console.log(array)
                        console.log('resposta', resposta)
                    }
                    return (
                        <Col key={i} style={{ margin: 50 }}>
                            <h5>{name?.question}</h5>
                            <Radio.Group onChange={validar}>
                                <Space direction="vertical">
                                    {array.map(el => {
                                        return <Radio value={el}>{el}</Radio>
                                    })}
                                </Space>
                            </Radio.Group>
                        </Col>
                    )
                })
            }
            <div style={{ textAlign: 'center', top: 50, bottom: 50 }}>
                <Button
                    style={{ width: '100%' }}
                    type="primary"
                    onClick={showResposta}
                >
                    Pontuação
                </Button>
            </div>

        </>
    )
}





export default Answer;