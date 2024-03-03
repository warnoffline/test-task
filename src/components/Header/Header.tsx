import React from 'react';
import AddPet from '../AddPet/AddPet.tsx';
import './Header.css'
import FindPets from '../FindPets/FindPets.tsx';

function Header({register, onSubmit, handleSubmit, setById, setByStatus}) {
    return (  
        <header className='header_head'>
            <FindPets register={register} onSubmit={onSubmit} handleSubmit={handleSubmit} setById={setById} setByStatus={setByStatus}/>
            <AddPet/>
        </header>
    );
}

export default Header;