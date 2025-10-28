// src/components/Dashboard.tsx
import React from 'react';
import StatCard from './StatCard'; // Reutilizamos tu StatCard
import { useUser } from '../context/UserContext';
import './Dashboard.css'; // Usaremos un archivo de estilos nuevo y limpio
import { FaGamepad, FaTrophy } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <div className="page-container">
      {/* 1. Header de la página */}
      <header className="page-header">
        <h1 className="page-title">¡Hola, {user.namePlayer}! 👋</h1>
        <p className="page-subtitle">Aquí tienes un resumen de tu actividad en los torneos FIFA.</p>
      </header>

      {/* 2. Grid de Estadísticas */}
      <div className="stats-grid">
        <StatCard title="Total Puntos" value={user.points} icon="🎯" />
        <StatCard title="Partidos Jugados" value={user.matchesPlayed} icon="🎮" />
        <StatCard title="Victorias"
          value={user.wins}
          icon="🏆"
        />
        <StatCard title="Torneos Activos" value={user.activeTournaments} icon="👥" />
      </div>

      {/* 3. Grid de Contenido Principal (Partidos y Torneos) */}
      <div className="dashboard-main-grid">
        {/* Columna de Partidos Recientes */}
        <div className="content-card">
          <div className="card-header">
            <FaGamepad className="card-icon" />
            <h2 className="card-title">Partidos Recientes</h2>
          </div>
          <div className="card-body">
            <div className="empty-state">
              <div className="empty-icon">🎮</div>
              <p className="empty-title">No hay partidos recientes</p>
              <p className="empty-description">¡Únete a un torneo para empezar a jugar!</p>
            </div>
          </div>
        </div>

        {/* Columna de Torneos Activos */}
        <div className="content-card">
          <div className="card-header">
            <FaTrophy className="card-icon" />
            <h2 className="card-title">Torneos Activos</h2>
          </div>
          <div className="card-body">
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <p className="empty-title">No hay torneos activos</p>
              <p className="empty-description">Crea o únete a un nuevo torneo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;