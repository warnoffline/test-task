import React, {useState, useEffect} from "react";
import { Text, Button,
 } from '@chakra-ui/react'
import './Pets.css'
import PetCard from "../PetCard/PetCard.tsx";
function Pets({dataById, dataByStatus, setDataById, setDataByStatus}) {
    const [dataStatus, setDataStatus] = useState<any>({})
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        if (dataStatus && dataStatus.id) {
            const newData = [...dataByStatus];
            const index = newData.findIndex(item => item.id === dataStatus.id);
            newData[index] = dataStatus;
            setDataByStatus(newData);
        }
    }, [dataStatus]);
    
    let totalPages = 0;
    let displayedData:object[] = [];
    
    if (dataByStatus) {
        const some = Math.ceil(dataByStatus.length / pageSize);
        totalPages = some;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        displayedData = dataByStatus.slice(startIndex, endIndex);
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }
    console.log(dataById)
    return (  
        <div className="pets__center">
            {dataById && 
                <div className="pets__part">
                    <Text fontSize='4xl'>Результат поиска по ID:</Text>
                    <div className="pets__cards">
                        <PetCard setDataPetCard={setDataById} dataPetCard={dataById} ></PetCard>
                    </div>
                </div>
            }
            {dataByStatus && 
                <div className="pets__part">
                    <Text fontSize='4xl'>Результат поиска по статусу:</Text>
                    <div className="pets__cards">
                    {displayedData.map((data, index) => (
                        <PetCard setDataPetCard={setDataStatus} dataPetCard={data} ></PetCard>
                    ))}         
                    </div>
                    <div className="pets__pagination">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(pageNumber => (
                        <Button key={pageNumber} variant={page === pageNumber ? 'solid' : 'outline'} colorScheme='blue' onClick={() => handlePageChange(pageNumber)}>
                            {pageNumber}
                        </Button>
                    ))}
                    </div>
                </div>
            }
            
        </div>

        
    );
}

export default Pets;