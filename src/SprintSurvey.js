import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from './GlobalStateContext';

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

const SprintSurvey = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentResponse, setCurrentResponse] = useState([1, 1, 1, 1, 1]);

  const questions = [
    '¿Cómo calificarías la comunicación y la colaboración en el equipo durante este sprint?',
    '¿Qué tan efectivas fueron las reuniones diarias de seguimiento del sprint para ti?',
    '¿Cómo evaluarías la calidad del trabajo entregado durante este sprint?',
    '¿Qué tan satisfecho estás con la gestión de las tareas y la asignación de trabajo en este sprint?',
    '¿Qué tan satisfecho estás con la capacidad del equipo para superar obstáculos y cumplir el tiempo del sprint?',
  ];

  const { globalState, setGlobalState } = useGlobalState('sprintSurvey'); // Utiliza el contexto global para sprintSurvey

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...currentResponse];
    updatedResponses[index] = value;
    setCurrentResponse(updatedResponses);
  };

  const saveResponses = () => {
    if (!currentDate) {
      alert('Por favor, ingresa la fecha antes de guardar las respuestas.');
      return; // No continúa si la fecha está vacía
    }

    const newResponse = {
      date: currentDate,
      values: [...currentResponse],
    };

    // Actualiza el contexto global con las nuevas respuestas
    setGlobalState([...globalState, newResponse]);

    setCurrentResponse([1, 1, 1, 1, 1]);
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
                value={currentResponse[index]}
                onChange={(e) => handleResponseChange(index, parseInt(e.target.value))}
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
        <button style={buttonStyle} onClick={saveResponses}>
          Guardar Respuestas
        </button>
        <Link to="/">
          <button style={buttonStyle}>Ir a la página de inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default SprintSurvey;

