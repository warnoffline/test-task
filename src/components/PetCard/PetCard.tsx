import React,{useEffect, useState} from "react";
import './PetCard.css'
import { useForm } from 'react-hook-form'
import { changePet,deletePet } from "../../api/pet.service.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { PetSchema } from "../AddPet/validatonSchema.ts";
import { Card, CardBody,CardHeader, Text,CardFooter, Tag, Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Editable, EditablePreview, Button, EditableInput,
    Input} from '@chakra-ui/react'
function PetCard({dataPetCard, setDataPetCard }) {
    const {register, handleSubmit, formState: {errors}} = useForm({ resolver: yupResolver(PetSchema) })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [countPhoto, setCountPhoto] = useState<string[]>([])
    const [lengthPhotos, setLengthPhotos] = useState<any>()
    const handlePhotos = () => {
        const newTag: string = `Item ${countPhoto.length + 1}`;
        if(countPhoto.length < 5){
            setCountPhoto([...countPhoto, newTag]);
        }
      };
      
    const onSubmit = (data:any) => {
        const arr:any = []
        const oldArr:any = [...dataPetCard.tags];
        oldArr.map((item, index) => {
            arr.push({
                "id": index || item.id,
                "name": data[`name_tags_${index}`] || item.name
            })
        })
        const newPhotos:any = []
        const oldPhotos:any = [...dataPetCard.photoUrls];

        oldPhotos.map((item, index) => {
            newPhotos.push(item)
        })
        countPhoto.map((item, index) => {
            newPhotos.push(data[`photoUrls_${index}`])
        })
        
        const newPet = {
            "id": dataPetCard.id,
            "category": {
                "id": Date.now(),
                "name": data.name_category
            },
            "name": data.name,
            "photoUrls": newPhotos,
            "tags": arr,
            "status": data.select
        }
        changePet(newPet).then(
            info => setDataPetCard(info)
        )
        onClose();
        setCountPhoto([]);
    }
    
    const handleDeleteButton = () => {
        deletePet(dataPetCard.id).then(
            info => {
                window.location.reload()
            }
        )
        onClose();
    }
    const handleDeleteTag = (id) => {
        const updatedTags = [...dataPetCard.tags];
        updatedTags.splice(id, 1);
        setDataPetCard({ ...dataPetCard, tags: updatedTags });
    }
    return (  
        <>
        <Card onClick={onOpen} className="pet__card">
        <CardHeader>
            {dataPetCard?.photoUrls && <img className="card__image" src={dataPetCard?.photoUrls[0]} alt="" /> }
            
            <Text fontSize='3xl' fontWeight='bold'>{dataPetCard?.name}</Text>
            <Text color='blue' fontSize='sm'>id: {dataPetCard?.id}</Text>
        </CardHeader>
        <CardBody>
            <Text fontSize='2xl'>Категория: {dataPetCard?.category?.name}</Text>
        </CardBody>
        {dataPetCard && dataPetCard.tags && dataPetCard.tags.length > 0 && (
  <CardFooter className="pet__card__footer">
    {dataPetCard.tags.map(tag => (
      <Tag colorScheme="blue">{tag?.name}</Tag>
    ))}
  </CardFooter>
)}
    </Card>
    <Modal size='4xl' isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <form onSubmit={handleSubmit(onSubmit)}>
    <ModalContent className="modal__content__change">
      <ModalHeader>Изменение животного</ModalHeader>
      <ModalCloseButton />
      <ModalBody className='modal__body__change'>
        <div className="change_pet_images">
        {dataPetCard?.photoUrls && dataPetCard?.photoUrls.map((item, index) => 
           <div className="card__image__modal">
             <img className="card__img__into" src={item} alt=""/>
           </div>
      ) }</div>
      {
            countPhoto.map((tag,index) => (
                // @ts-ignore: Unreachable code error
                <Input key={index} variant='filled' placeholder="Ссылка на фото" {...register(`photoUrls_${index}`)} /> 
            ))             
        }
      <Button onClick={handlePhotos} colorScheme="blue">Добавить фото</Button>
      
        <Text fontSize='2xl'>Имя:</Text>
      {
        dataPetCard?.name ? (
            <Editable defaultValue={dataPetCard?.name}>
                <EditablePreview />
                <EditableInput {...register(`name`)}/>
            </Editable>
            ) : (
                <Input {...register(`name`)} />
            )
        }
        <p className="error">{errors?.name?.message}</p>
      <Text fontSize='2xl'>Категория:</Text>
      {
        dataPetCard?.category?.name ? (
            
            <Editable defaultValue={dataPetCard?.category?.name}>
                <EditablePreview />
                
                <EditableInput {...register(`name_category`)} />
            </Editable>
            ) : (
                <Input {...register(`name_category`)} />
            )
            
        }
        <p className="error">{errors?.name_category?.message}</p>
      <Text fontSize='2xl'>Статус:</Text>
      <Select defaultValue={dataPetCard?.status} variant='filled' {...register('select')}>
                <option value="available">Доступен</option>
                <option value="pending">Рассматривается</option>
                <option value="sold">Продано</option>
        </Select>
      {dataPetCard?.tags.length > 0 && <Text fontSize='2xl'>Теги:</Text>}
      <div className="tags_change_modal">
      {dataPetCard && dataPetCard?.tags.map((tag, index) => 
                (
                    <div className="tags_change">
                    <Editable  defaultValue={tag?.name}>
                    <EditablePreview />
                    {/* @ts-ignore */}
                    <EditableInput {...register(`name_tags_${index}`)}/>
                </Editable>
                <Button onClick={() => handleDeleteTag(index)} colorScheme="red"><img src="./trash.svg" alt="" /></Button>
                    </div>
                ))}
                </div>
      </ModalBody>
      <ModalFooter className="foot">
        <Button type='submit' colorScheme='green' mr={3}>Сохранить</Button>
        <Button colorScheme="orange" onClick={handleDeleteButton} mr={3}>Удалить</Button>
        <Button colorScheme='red' mr={3} onClick={onClose}>
          Закрыть
        </Button>
      </ModalFooter>
    </ModalContent>
    </form>
  </Modal>
  </>
    );
}

export default PetCard;