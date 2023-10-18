import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from './GlobalStateContext';

// Estilos
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const contentStyle = {
  textAlign: 'center',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  background: 'rgba(75, 192, 192, 0.6)',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const questionStyle = {
  marginBottom: '10px',
  fontSize: '22px',
};

const selectStyle = {
  margin: '10px 50px',
  fontSize: '20px',
};

const dateSelectorStyle = {
  fontSize: '20px',
  width: '20%',
  marginBottom: '5px',
  textAlign: 'center',
};

const Resumen = () => {
  const { globalState: resumenData, setGlobalState: setResumenData } = useGlobalState('resumen');

  const [currentDate, setCurrentDate] = useState('');
  const [currentRespuestas, setCurrentRespuestas] = useState([1, 1, 1, 1, 1]);

  const questions = [
    '¿1?',
    '¿2?',
    '¿3?',
    '¿4?',
    '¿5?',
  ];

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleRespuestasChange = (index, value) => {
    const updatedRespuestas = [...currentRespuestas];
    updatedRespuestas[index] = value;
    setCurrentRespuestas(updatedRespuestas);
  };

  const saveRespuestas = () => {
    if (!currentDate) {
      alert('Por favor, ingresa la fecha antes de guardar las respuestas.');
      return;
    }

    const newRespuestas = {
      date: currentDate,
      values: [...currentRespuestas],
    };

    setResumenData([...resumenData, newRespuestas]);

    setCurrentRespuestas([1, 1, 1, 1, 1]);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1>Encuesta de Satisfacción del Sprint</h1>
        <div>
          <input
            type="date"
            style={dateSelectorStyle}
            value={currentDate}
            onChange={handleDateChange}
          />
        </div>
        <ol>
          {questions.map((question, index) => (
            <div key={index} style={questionStyle}>
              <span>{question}</span>
              <br />
              <select
                style={selectStyle}
                value={currentRespuestas[index]}
                onChange={(e) => handleRespuestasChange(index, parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </ol>
        <button style={buttonStyle} onClick={saveRespuestas}>
          Guardar Respuestas
        </button>
        <Link to="/">
          <button style={buttonStyle}>Ir a la página de inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default Resumen;
