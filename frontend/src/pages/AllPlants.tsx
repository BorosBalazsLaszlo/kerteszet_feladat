import React, { useEffect, useState } from 'react';
import { Plant } from '../types/Plant';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/api';
import '../css/main.css';

function AllPlants() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [nev, setNev] = useState('');
    const [ar, setAr] = useState(0);
    const [kategoria, setKategoria] = useState('Fa');
    const [evelo, setEvelo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await apiClient.get('/novenyek');
                setPlants(response.data);
            } catch (err: any) {
                alert('Hiba a fetchelésnél: ' + err);
            }
        };
        fetchPlants();
    }, []);

    const viewHandler = (id: number) => {
        navigate(`/novenyek/${id}`);
    };

    const postPlant = async () => {
        const newPlant = {
            nev,
            ar,
            kategoria,
            evelo: evelo ? 1 : 0,
        } as Plant;

        try {
            await apiClient.post('/novenyek', newPlant);
            alert('Sikeres hozzáadás!');
        } catch (err: any) {
            alert('Hiba a hozzáadásnál: ' + err);
        }
    };

    return (
        <div className="container">
            <h1>Összes növény</h1>
            <table>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Ár</th>
                        <th>Kategória</th>
                        <th>Évelő</th>
                        <th>Megtekintés</th>
                    </tr>
                </thead>
                <tbody>
                    {plants.map((plant) => (
                        <tr key={plant.id}>
                            <td>{plant.nev}</td>
                            <td>{plant.ar}</td>
                            <td>{plant.kategoria}</td>
                            <td>{plant.evelo ? 'Igen' : 'Nem'}</td>
                            <td>
                                <button onClick={() => viewHandler(plant.id)}>Megtekintés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="form-container">
                <h2>Adj hozzá egy növényt!</h2>
                <div className="input-container">
                    <input type="text" placeholder="Név" onChange={(e) => setNev(e.target.value)} />
                    <input
                        type="number"
                        placeholder="Ár"
                        onChange={(e) => setAr(Number(e.target.value))}
                    />
                    <select onChange={(e) => setKategoria(e.target.value)}>
                        <option value="Fa">Fa</option>
                        <option value="Virág">Virág</option>
                        <option value="Bokor">Bokor</option>
                    </select>
                    <label>
                        Évelő?
                        <input type="checkbox" onChange={(e) => setEvelo(e.target.checked)} />
                    </label>
                </div>
                <button onClick={postPlant}>Hozzáad</button>
            </div>
        </div>
    );
}

export default AllPlants;
