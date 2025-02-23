import React, { useEffect, useState } from 'react';
import { Plant } from '../types/Plant';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/api';
import '../css/main.css';

const SinglePlant: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [ar, setAr] = useState<number>(0);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const response = await apiClient.get(`/novenyek/${id}`);
                setPlant(response.data);
                setAr(response.data.ar);
            } catch (err: any) {
                alert('Hiba a fetchelésnél: ' + err);
            }
        };
        fetchPlant();
    }, [id]);

    const updatePrice = async () => {
        const updatedPlant = {
            ...plant,
            ar: ar,
        } as Plant;

        try {
            await apiClient.put(`/novenyek/${id}`, updatedPlant);
            alert('Sikeres frissítés!');
        } catch (err: any) {
            alert('Hiba a frissítésnél: ' + err);
        }
    };

    const deletePlant = async () => {
        try {
            await apiClient.delete(`/novenyek/${id}`);
            alert('Sikeres törlés!');
            navigate('/novenyek');
        } catch (err: any) {
            alert('Hiba a törlésnél: ' + err);
        }
    };

    return (
        <div>
            <h1>Növény {id}</h1>

            <div className="single-container">
                <p>Név: {plant?.nev}</p>
                <p>Évelő?: {plant?.evelo ? 'Igen' : 'Nem'}</p>
                <p>Kategória: {plant?.kategoria}</p>
                <input
                    type="number"
                    placeholder="Új ár"
                    value={ar}
                    onChange={(e) => setAr(Number(e.target.value))}
                />
                <button onClick={updatePrice}>Frissít</button>
                <div>
                    <button onClick={deletePlant}>Törlés</button>
                </div>
            </div>
        </div>
    );
};

export default SinglePlant;
