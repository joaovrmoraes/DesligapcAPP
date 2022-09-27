
import * as React from 'react';
import './button.css';
import { FcAutomatic } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa'
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../services/api/axios.js';

function ButtonEdit({ nome, tag, dominio, desliga, id }) {
    const [show, setShow] = useState(false);
    const [pcNome, setPcNome] = useState(nome);
    const [pcTag, setPcTag] = useState(tag);
    const [pcDesliga, setPcDesliga] = useState(desliga);
    const [pcDominio, setPcDominio] = useState(dominio);
    const [pcId, setPcId] = useState(id);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function Editar() {
        api.put('/alterar', {
            nome: pcNome,
            tag: pcTag,
            desliga: parseInt(pcDesliga),
            dominio: pcDominio,
            id: pcId
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }

    function Deletar() {
        api.post('/deletar', {
            id: pcId
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }

    function refresh() {
        location.reload()
    }

    return (
        <>
            <button className='edit_button' onClick={() => { handleShow(); }}>
                <FcAutomatic size={26} />
            </button>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title>Editar Computador</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Computador</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                onChange={(e) => { setPcNome(e.target.value) }}
                                value={pcNome}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Tag:</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => { setPcTag(e.target.value) }}
                                value={pcTag}
                            />
                        </Form.Group>
                    </Form>
                    <Stack direction="horizontal" className='justify-content-between' gap={2}>
                        <Form.Group >
                            <Form.Label>Dominio:</Form.Label>
                            <Form.Select defaultValue={pcDominio} onChange={(e) => { setPcDominio(e.target.value) }}>
                                <option value={'.BRANYL.DOMINIO'}>Capivari</option>
                                <option value={'.SPMOMBUCA.BRANYL.DOMINIO'}>Mombuca</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Desliga:</Form.Label>
                            <Form.Select defaultValue={pcDesliga} onChange={(e) => { setPcDesliga(e.target.value) }}>
                                <option value={1}>Sim</option>
                                <option value={0}>Não</option>
                            </Form.Select>
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="success" onClick={async () => { handleClose(); Editar(); refresh() }}>
                        Inserir
                    </Button>
                    <Button variant="danger" onClick={async () => { handleClose(); Deletar(); refresh() }}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ButtonEdit