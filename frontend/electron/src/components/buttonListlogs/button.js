
import * as React from 'react';
import './button.css';
import { FcFinePrint } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api/axios.js';
import LogButton from '../buttonLog/button';

function BotaoLogs() {
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api.get('/diretorio')
            .then(async (response) => {
                await
                    setLogs(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [])

    function Editar(value) {
        var nomeEdit = `${value[4]}${value[5]}/${value[6]}${value[7]}/${value[8]}${value[9]}${value[10]}${value[11]}`
        return nomeEdit
    }
    function EditarHora(value) {
        var nomeEdit = `${value[12]}${value[13]}:${value[14]}${value[15]}`
        return nomeEdit
    }

    return (
        <>
            <button className='edit_button' onClick={() => { handleShow(); }} style={{ 'color': 'white' }}>
                <FcFinePrint size={30} /> Logs
            </button>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title>Lista de Logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover >
                        <thead className='text-center'>
                            <tr>
                                <th><BiDotsVerticalRounded size={18} /></th>
                                <th>Log</th>
                                <th>Data</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {logs.map((logs) => {
                                return (
                                    <tr key={logs}>
                                        <td>
                                            <LogButton value={logs} />
                                        </td>
                                        <td >{logs.replace("[", " ").replace("]", " ").split('.', 1)}</td>
                                        <td >{Editar(logs)}</td>
                                        <td>{EditarHora(logs)}</td>
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
export default BotaoLogs