import React from 'react';
import { Select, Input, Button } from '@chakra-ui/react';
import './FindPets.css'

function FindPets({register, onSubmit, handleSubmit, setById, setByStatus}) {
    return (  
        <form onSubmit={handleSubmit(onSubmit)} className='find'>
            <div className='find_el'>
            <Select {...register('select_status')} variant='filled'>
                <option value="available">Доступный</option>
                <option value="pending">Рассматриваемый</option>
                <option value="sold">Продано</option>
            </Select>
            <Button type='submit' onClick={() => setByStatus(true)} colorScheme='messenger'>Найти по статусу</Button>
            </div>
            <div className='find_el'>
            <Input {...register('id')} placeholder='Найти по ID'/>
            <Button type='submit' onClick={() => setById(true)}>Найти по ID</Button>
            </div>
        </form>
    );
}

export default FindPets;