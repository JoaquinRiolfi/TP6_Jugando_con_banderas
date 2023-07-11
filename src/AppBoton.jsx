import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const AppBoton = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      const randomCountry = response.data.data[randomIndex];
      setImage(randomCountry.flag);
      setName(randomCountry.name.toUpperCase());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const submit = () => {
    const inputValue = document.getElementById("input").value.trim();
    if (inputValue.length === 0) {
      alert("Error: El campo no debe estar vacío");
    } else {
      if (inputValue.toUpperCase() === name) {
        setPoints(points + 10);
        setMessage("¡Has obtenido 10 puntos!");
      } else {
        setPoints(points - 1);
        setMessage("¡Oh no, has perdido 1 punto!");
      }
      fetchImage();
    }
  };

  if (isLoading) {
    return (
      <div className="Fondo">
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div className="Fondo">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="Text">
        <p><span>Adivina la bandera</span></p>
      </div>
      <div className="Imagen">
        <img src={image} alt="Bandera" height={350} width={700} />
      </div>
      <div className="Text-Puntos">
        <p>{message}</p>
        <p>Puntuación: {points}</p>
      </div>
      <div className="contenedor">
        <div className="Input">
          <input type="text" id="input" placeholder="Ingrese un país:" />
        </div>
        <br />
        <div className="button">
          <button type="submit" onClick={submit}>Enviar respuesta</button>
        </div>
      </div>
    </div>
  );
};

export default AppBoton;