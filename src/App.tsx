import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header.tsx';
import Pets from './components/Pets/Pets.tsx';
import { Divider, Text } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { getPetById, findByStatus } from './api/pet.service.ts';
function App() {
  const [byId, setById] = useState(false)
  const [byStatus, setByStatus] = useState(false)
  const {register, handleSubmit } = useForm()
  const [dataById, setDataById] = useState()
  const [dataByStatus, setDataByStatus] = useState()
    const onSubmit = (data:any) => {
        if(byId){
            getPetById(data.id).then(
              info => setDataById(info)
            )
            setById(false)
        }
        if(byStatus){
            findByStatus(data.select_status).then(
              info => setDataByStatus(info)
            )
            setByStatus(false)
        }
    }
  return (
    <div className="App">
      <Header register={register} onSubmit={onSubmit} handleSubmit={handleSubmit} setById={setById} setByStatus={setByStatus}></Header>
      <Divider></Divider>
      {(dataById || dataByStatus) ? <Pets setDataById={setDataById} setDataByStatus={setDataByStatus} dataById={dataById} dataByStatus={dataByStatus}></Pets> : <div className='placehold'><Text fontSize='4xl'>Начните поиск прямо сейчас!</Text></div>}
    </div>
  );
}

export default App;
