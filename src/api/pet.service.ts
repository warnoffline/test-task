import petApi from "./instance.ts";

export const getPetById = async (petId:number) => {
    try{
        const response = await petApi().getPetById(petId)
        return response.data
    } catch(error){
        console.log(error)
    }
}
export const addPet = async (newPet:object) => {
    try{
        const response = await petApi().addPet(newPet)
        return response.data
    } catch(error){
        console.log(error)
    }
}
export const findByStatus = async (petStatus:string) => {
    try{
        const response = await petApi().findByStatus(petStatus)
        return response.data
    } catch(error){
        console.log(error)
    }
}
export const changePet = async (newPet:object) => {
    try{
        const response = await petApi().changePet(newPet)
        return response.data
    } catch(error){
        console.log(error)
    }
}
export const deletePet = async (petId:number) => {
    try{
        const response = await petApi().deletePet(petId)
        return response.data
    } catch(error){
        console.log(error)
    }
}
