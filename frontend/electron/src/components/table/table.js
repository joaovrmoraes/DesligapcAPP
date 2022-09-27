import * as React from 'react';
import { useState, useEffect } from 'react';
import { FcAutomatic, FcFilledFilter } from 'react-icons/fc';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaTimes, FaCheck, FaSearch } from 'react-icons/fa'
import ButtonEdit from '../buttonEdit/button.js';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import api from '../../services/api/axios.js'
import Horario from '../buttonHorario/button.js';
import '../button/button.css';
import './table.css'

function TabelaPC() {
    const [itens, setItens] = useState([])
    const [show, setShow] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [busca, setBusca] = useState('');
    const [desliga, setDesliga] = useState('');
    const [dominio, setDominio] = useState('');

    useEffect(() => {
        api.get('/lista?nome=' + busca + '&desliga=' + desliga + '&dominio=' + dominio)
            .then(async (response) => {
                await
                    setItens(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [refreshKey, busca, desliga, dominio])

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

    return (
        <>
            <div className='header'>
                <Form className="align-items-center">
                    <Row className="align-items-center">
                        <Col sm={2}>
                            <Horario />
                        </Col>
                        <Col>
                        </Col>
                        <Col sm={6}>
                            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                Pesquisa
                            </Form.Label>
                            <InputGroup >
                                <InputGroup.Text style={{ 'backgroundColor': 'transparent', 'borderRight': '0 none' }}>
                                    <FaSearch size={22} />
                                </InputGroup.Text>
                                <Form.Control
                                    id="inlineFormInputGroupUsername"
                                    placeholder="Pesquisa"
                                    style={{ 'borderLeft': '0 none' }}
                                    onChange={(e) => { setBusca(e.target.value) }}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="border-top line"></div>
            <Table striped hover >
                <thead className='text-center'>
                    <tr>
                        <th><BiDotsVerticalRounded size={18} /></th>
                        <th>Computador</th>
                        <th>Tag</th>
                        <th>
                            <select defaultValue={''} className='text-center' style={{ 'border': '0 none', 'fontWeight': 'bold', 'outline': '0 none' }}
                                onChange={(e) => { setDominio(e.target.value); setItens([]); }}>
                                <option value={''}>Dominio</option>
                                <option value=".BRANYL.DOMINIO">CAPIVARI</option>
                                <option value=".SPMOMBUCA.BRANYL.DOMINIO">MOMBUCA</option>
                            </select>
                        </th>
                        <th>
                            <select defaultValue={''} className='text-center' style={{ 'border': '0 none', 'fontWeight': 'bold', 'outline': '0 none' }}
                                onChange={(e) => { setDesliga(e.target.value); setItens([]); }} >
                                <option value={''}>Desliga</option>
                                <option value="0">❌</option>
                                <option value="1">✔️</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {itens.map((itens) => {
                        return (
                            <tr key={itens.id}>
                                <td >
                                    <ButtonEdit nome={itens.nome} tag={itens.tag} dominio={itens.dominio} desliga={itens.desliga} id={itens.id} />
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