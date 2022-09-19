
import * as React from 'react';
import './button.css';
import { FcAlarmClock, FcClock } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import api from '../../services/api/axios.js';
import InputGroup from 'react-bootstrap/InputGroup';

function Horario() {
    const [show, setShow] = useState(false);
    const [horario, setHorario] = useState([]);
    const [horas, setHoras] = useState([]);
    const [minutos, setMinutos] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api.get('/horario')
            .then(async (response) => {
                await
                    setHorario(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [])

    function editHorario(horario) {
        if (horario < 10) {
            return '0' + horario
        } else {
            return horario
        }
    }

    function refresh() {
        location.reload()
    }

    function Editar() {
        api.put('/horario', {
            horas: horas,
            minutos: minutos
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }


    return (
        <>
            <InputGroup.Text style={{ 'fontWeight': 'bolder' }} className="align-items-center bg-danger border-0 botaoHorario" onClick={() => { handleShow(); }}>
                <FcClock size={22} style={{ 'marginRight': '5px' }} />
                <span className='text-white'>Horario:</span>
                {horario.map((horas) => {
                    return <span key={horas.id} style={{ 'marginLeft': '3px' }} className='text-white'>
                        {editHorario(horas.horas)}:{editHorario(horas.minutos)}
                    </span>
                })}
            </InputGroup.Text>
            <Modal show={show}
                onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title className="align-items-center"> <FcAlarmClock size={24} /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="horizontal" className='justify-content-between' gap={2}>
                        <Form.Group className='col-md-6'>
                            <Form.Label>Horas:</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                onChange={(e) => { setHoras(e.target.value) }}
                                value={horas}
                                min={1}
                                max={23}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-6'>
                            <Form.Label>Min:</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setMinutos(e.target.value) }}
                                value={minutos}
                                min={0}
                                max={60}
                            />
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="dark" onClick={() => { handleClose(); Editar(); refresh(); }}>
                        Inserir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Horario