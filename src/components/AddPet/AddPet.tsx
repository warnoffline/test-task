import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { getPetById, addPet } from "../../api/pet.service.ts";
import './AddPet.css'
import { PetSchema } from "./validatonSchema.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, 
    useDisclosure,
    Input,
    Select
  } from '@chakra-ui/react'
function AddPet() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {register, handleSubmit, reset, formState: {errors}} = useForm({ resolver: yupResolver(PetSchema) })
    const [countTags, setCountTags] = useState<string[]>([]);
    const [photo, setPhoto]:any = useState([])
    const [countPhoto, setCountPhoto] = useState<string[]>([])
    const handlePhotos = () => {
        const newTag: string = `Item ${countPhoto.length + 1}`;
        if(countPhoto.length < 8){
            setCountPhoto([...countPhoto, newTag]);
        }
      };
      
    const handleTags = () => {
        const newTag: string = `Item ${countTags.length + 1}`;
        if(countTags.length < 10){
          setCountTags([...countTags, newTag]);
        }
      };
    const onSubmit = (data:any) => {
        const arr:any = []
        const formData = new FormData();
        formData.append('photoUrls', photo)
        countTags.map((item, index) => {
            arr.push({
                "id": index,
                "name": data[`name_tags_${index}`]
            })
        })
        const newPhotos:any = []
        countPhoto.map((item, index) => {
          newPhotos.push(data[`photoUrls_${index}`])
        })
        const newPet = {
            "id": Date.now(),
            "category": {
                "id": Date.now(),
                "name": data.name_category
            },
            "name": data.name,
            "photoUrls": newPhotos,
            "tags": arr,
            "status": data.select
        }
        addPet(newPet)
        onClose()
        reset();
        setCountTags([]);
        setCountPhoto([]);
        window.location.reload()
    }
    return <> 
        <Button className='btn_create' colorScheme='green' mt={4} onClick={onOpen}>
        Создать
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>  
          <ModalHeader>Создать животное</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal__body">
            <label htmlFor="name">Имя</label>
            <Input variant='filled' placeholder='Имя' {...register('name')} />
            <p className="error">{errors?.name?.message}</p>
            <label htmlFor="name_category">Категория</label>
            <Input variant='filled' placeholder='Категория' {...register('name_category')} />
            <p className="error">{errors?.name_category?.message}</p>
            <label>Статус</label>
            <Select variant='filled' {...register('select')}>
                <option value="available">Доступен</option>
                <option value="pending">Рассматривается</option>
                <option value="sold">Продано</option>
            </Select>
            {countPhoto.length > 0 && <label>Загрузить фото</label>}
            {countPhoto.map((item, index) => (
              // @ts-ignore: Unreachable code error
              <Input variant='filled' {...register(`photoUrls_${index}`)} placeholder="Ссылка на фото"/>
            ))}
            <Button onClick={handlePhotos} variant='ghost' colorScheme="blue">Добавить фото</Button>
            {countTags.length > 0 ? <label htmlFor="name_tags">Тег</label> : ''}
            <div className="tags">
            {
                countTags.map((tag,index) => (
                    // @ts-ignore: Unreachable code error
                    <Input key={index} variant='filled' placeholder='Тег' {...register(`name_tags_${index}`)} /> 
                ))             
            }
            </div>
          </ModalBody>
          <ModalFooter className="foot">
          <Button colorScheme='blue' onClick={() => handleTags()} mr={3}>Добавить тег</Button>
            <Button colorScheme="green" mr={3} type="submit">
                Добавить
            </Button>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>;
}

export default AddPet;