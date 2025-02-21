import React, { useEffect, useState } from 'react';
import { Plant } from '../types/Plant';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/api';

const SinglePlant: React.FC = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [plant, setPlant] = useState<Plant | null>(null);

    const [kategoria, setKategoria] = useState("");

    useEffect(() =>{
        const fetchPlant = async () =>{
            try{
               const response = await apiClient.get(`/novenyek/${id}`);
               setPlant(response.data);
               setKategoria(response.data.kategoria);
            } catch (err: any)
            {
                alert("Hiba a fetchelésnél: " + err);
            }
        }
        fetchPlant();
    }, [id]);

    const updateCategory = async () =>{

        const updatedPlant ={
            ...plant,
            kategoria: kategoria
        } as Plant;
        try{
            await apiClient.put(`/novenyek/${id}`, updatedPlant);
            alert("Sikeres frissítés!");
        } catch (err: any)
        {
            alert("Hiba a frissítésnél: "  + err);
        }
    };

    const deletePlant = async () => {
        try{
            await apiClient.delete(`/novenyek/${id}`);
            alert("Sikeres törlés!");
            navigate("/novenyek");
        } catch (err: any)
        {
            alert("Hiba a törlésnél: " + err);
        }
    };

    return (
        <div>
            <h1>Növény {id}</h1>

            <div>
                <p>{plant?.nev}</p>
                <p>{plant?.ar}</p>
                <p>{plant?.evelo}</p>
                <input type="text" placeholder={kategoria} onChange={(e) => setKategoria(e.target.value)} />
                <button onClick={updateCategory}>
                    Frissít
                </button>
                <div>
                    <button onClick={deletePlant}>
                        Törlés
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SinglePlant;