import axios from 'axios'

const BASE_URL = 'https://petstore.swagger.io/v2'

const apiClient = axios.create({
    baseURL: BASE_URL
})

const petApi = () => {
    return {
        getPetById: (petId:number) => {
            return apiClient.get(`/pet/${petId}`)
        },
        addPet: (newPet:object) => {
            return apiClient.post(`/pet`, newPet)
        },
        findByStatus: (petStatus:string) => {
            return apiClient.get(`/pet/findByStatus?status=${petStatus}`)
        },
        changePet: (newPet:object) => {
            return apiClient.put(`/pet`, newPet)
        },
        deletePet: (petId:number) => {
            return apiClient.delete(`/pet/${petId}`)
        }
    }
}

export default petApi