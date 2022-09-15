import * as React from 'react';
import NavigateBar from '../../components/navbar/navbar.js';
import TabelaPC from '../../components/table/table.js';
import './index.css'

function Home() {
    return (
        <>
            <NavigateBar />
            <div className='tabelaPC'>
                <TabelaPC />
            </div>
        </>
    )
}

export default Home