
import * as React from 'react';
import './button.css';
import { FcFinePrint } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api/axios.js';

function LogButton({ value }) {
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api.get('/arquivo?nome=' + value)
            .then(async (response) => {
                await
                    setLogs(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [])

    function PowerOnOff(value) {
        if (value === "Ok") {
            return <FaCheck color='green' size={22} />
        }
        return <FaTimes color='red' size={22} />
    }

    function Dominio(value) {
        let valorEditado = value.slice(value.indexOf(".") + 1)
        if (valorEditado === 'BRANYL.DOMINIO') {
            return 'CAPIVARI'
        } else {
            return 'MOMBUCA'
        }
    }

    return (
        <>
            <button className='edit_button' onClick={() => { handleShow(); }} style={{ 'color': 'white' }}>
                <FcFinePrint size={30} />
            </button>
            <Modal show={show}
                onHide={handleClose}
                fullscreen={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{value.split('.', 1)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover >
                        <thead className='text-center'>
                            <tr>
                                <th>Computador</th>
                                <th>Dominio</th>
                                <th>Status</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {logs.map((logs) => {
                                return (
                                    <tr key={logs.Tempo}>
                                        <td >{logs.Computador.split('.', 1)}</td>
                                        <td >{Dominio(logs.Computador)}</td>
                                        <td >{PowerOnOff(logs.Status)}</td>
                                        <td>{logs.Tempo}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default LogButton