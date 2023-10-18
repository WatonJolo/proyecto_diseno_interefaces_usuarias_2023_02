import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from './GlobalStateContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';

const HomePage = () => {
  const { globalState: sprintSurveyData } = useGlobalState('sprintSurvey');

  const calculateAverage = (responses) => {
    if (responses.length === 0) return 0;
    const sum = responses.reduce((acc, response) => acc + response, 0);
    return sum / responses.length;
  };

  // Agrupa los datos por fecha y calcula el promedio
  const groupedData = {};
  sprintSurveyData.forEach((response) => {
    const date = response.date;
    const value = parseFloat(calculateAverage(response.values).toFixed(2));
    if (groupedData[date]) {
      groupedData[date].push(value);
    } else {
      groupedData[date] = [value];
    }
  });

  const chartDataSprintSurvey = Object.keys(groupedData).map((date) => ({
    date,
    value: (
      groupedData[date].reduce((acc, value) => acc + value, 0) / groupedData[date].length
    ).toFixed(2),
  }));

  // Función para obtener el mensaje de calificación del Sprint
  const getSprintRatingMessage = (value) => {
    if (value >= 4) {
      return 'Fue un Sprint Eficiente';
    } else if (value >= 3) {
      return 'Fue un Sprint Decente';
    } else {
      return 'Fue un Sprint Deficiente';
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <a className="navbar-brand">Chocobito</a>
        <label htmlFor="menu-toggle" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </label>
        <nav className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <label htmlFor="evaluacionDropdown" className="nav-link dropdown-label">
                EVALUACION
              </label>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/Satisfaccion">Satisfacción</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/Resumen">Resumen</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <div className="content">
        {/* Aplica la clase "centered-container" para centrar el contenido */}
        <h2>Evaluación de estado de Salud del Equipo</h2>
        <div className="centered-container">
          {chartDataSprintSurvey.length > 0 ? (
            <>
              <BarChart width={600} height={400} data={chartDataSprintSurvey}>
                <XAxis dataKey="date" type="category" angle={0} textAnchor="middle" />
                <YAxis domain={[0, 5]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="rgba(75, 192, 192, 0.6}" />
              </BarChart>
            </>
          ) : (
            <p>Aun no hay evaluación del Sprint</p>
          )}
        </div>
        {chartDataSprintSurvey.length > 0 && (
          <div>
            <p>Mensajes de calificación por fecha:</p>
            <ul>
              {chartDataSprintSurvey.map((data) => (
                <li key={data.date}>
                  {data.date}: {getSprintRatingMessage(parseFloat(data.value))}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
