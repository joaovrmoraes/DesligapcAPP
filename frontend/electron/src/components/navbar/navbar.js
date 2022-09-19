import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import './navbar.css'
import BotaoModal from '../button/button';

function NavigateBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <span className='logo'>BRANYL MONITOR 🖥️</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="justify-content-end teste2">

                    <Nav.Link href="#features" className='cadastro'>
                        <BotaoModal />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigateBar;