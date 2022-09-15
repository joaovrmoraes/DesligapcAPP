
import * as React from 'react';
import './button.css';
import { FcAddDatabase } from 'react-icons/fc';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import api from '../../services/api/axios';

function BotaoModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nome, setNome] = useState('');
    const [tag, setTag] = useState('');
    const [desliga, setDesliga] = useState('');
    const [dominio, setDominio] = useState('');

    function adicionar() {
        api.post('/addpc', {
            nome: nome,
            tag: tag.toUpperCase(),
            desliga: parseInt(desliga),
            dominio: dominio
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }

    return (
        <>
            <button className='edit_button' onClick={handleShow}>
                <FcAddDatabase size={30} />
            </button>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Computador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Computador</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                onChange={(e) => { setNome(e.target.value) }}
                                value={nome}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Tag:</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => { setTag(e.target.value) }}
                                value={tag}
                            />
                        </Form.Group>
                    </Form>
                    <Stack direction="horizontal" className='justify-content-between' gap={2}>
                        <Form.Group >
                            <Form.Label>Dominio:</Form.Label>
                            <Form.Select onChange={(e) => { setDominio(e.target.value) }}>
                                <option disabled selected>Selecione um dominio</option>
                                <option value={'.BRANYL.DOMINIO'}>Capivari</option>
                                <option value={'.SPMOMBUCA.BRANYL.DOMINIO'}>Mombuca</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Desliga:</Form.Label>
                            <Form.Select onChange={(e) => { setDesliga(e.target.value) }}>
                                <option disabled selected>Computador será desligado?</option>
                                <option value={1}>Sim</option>
                                <option value={0}>Não</option>
                            </Form.Select>
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="success" onClick={() => { handleClose(); adicionar() }}>
                        Inserir
                    </Button>
                    <Button variant="danger" onClick={() => { handleClose() }}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default BotaoModal