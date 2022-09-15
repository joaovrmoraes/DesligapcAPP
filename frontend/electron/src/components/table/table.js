import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaTimes, FaCheck } from 'react-icons/fa'
import api from '../../services/api/axios.js'
import { useState, useEffect } from 'react';
import BotaoEdit from '../buttonSetting/button.js';
import '../button/button.css';
import { FcAutomatic } from 'react-icons/fc';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

function TabelaPC() {
    const [itens, setItens] = useState([])
    const [show, setShow] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [tag, setTag] = useState('');
    const [desliga, setDesliga] = useState('');
    const [dominio, setDominio] = useState('');

    useEffect(() => {
        api.get('/lista')
            .then(async (response) => {
                await
                    setItens(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [refreshKey])

    function atualizador() {
        setItens([])
        setRefreshKey(oldKey => oldKey + 1);
    }

    function dominioEdit(domain) {
        if (domain === '.BRANYL.DOMINIO') {
            return 'CAPIVARI'
        } else {
            return 'MOMBUCA'
        }
    }

    function desligaEdit(des) {
        if (des === 0) {
            return <FaTimes size={22} color={'red'} />
        } else {
            return <FaCheck size={22} color={'green'} />
        }
    }

    function Editar() {
        api.put('/alterar', {
            nome: nome,
            tag: tag,
            desliga: parseInt(desliga),
            dominio: dominio,
            id: id
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }

    console.log(desliga)

    return (
        <>
            <Table striped hover >
                <thead className='text-center'>
                    <tr>
                        <th><BiDotsVerticalRounded size={18} /></th>
                        <th>Computador</th>
                        <th>Tag</th>
                        <th>Dominio</th>
                        <th>Desliga</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {itens.map((itens) => {
                        return (
                            <tr key={itens.id}>
                                <td >
                                    <button className='edit_button' onClick={() => { handleShow(); setId(itens.id); setNome(itens.nome); setTag(itens.tag); setDesliga(itens.desliga); setDominio(itens.dominio) }}>
                                        <FcAutomatic size={26} />
                                    </button>
                                    <Modal show={show}
                                        onHide={handleClose}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Header >
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
                                                    <Form.Select defaultValue={dominio}
                                                        onChange={(e) => { setDominio(e.target.value) }}>
                                                        <option value={'.BRANYL.DOMINIO'}>Capivari</option>
                                                        <option value={'.SPMOMBUCA.BRANYL.DOMINIO'}>Mombuca</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>Desliga:</Form.Label>
                                                    <Form.Select defaultValue={desliga}
                                                        onChange={(e) => { setDesliga(e.target.value) }}>
                                                        <option value={1}>Sim</option>
                                                        <option value={0}>Não</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Stack>
                                        </Modal.Body>
                                        <Modal.Footer className='d-flex justify-content-between'>
                                            <Button variant="success" onClick={() => { handleClose(); Editar(); atualizador() }}>
                                                Inserir
                                            </Button>
                                            <Button variant="danger" onClick={() => { handleClose(); }}>
                                                Cancelar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                                <td>{itens.nome}</td>
                                <td>{itens.tag}</td>
                                <td>{dominioEdit(itens.dominio)}</td>
                                <td>{desligaEdit(itens.desliga)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )

}

export default TabelaPC