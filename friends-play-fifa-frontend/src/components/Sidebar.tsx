import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdLogout,
  MdEqualizer,
  MdEvent,
  MdSportsEsports,
} from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const { logout, user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
           <img src="/football.svg" alt="FriendsPlayFifa Logo" className="logo-image" />
          <span>FriendsPlayFifa</span>
        </h1>
      </div>
      <div className="sidebar-profile">
        <img
          src={
            user?.image ||
            `https://ui-avatars.com/api/?name=${user?.namePlayer}&background=10B981&color=fff`
          }
          alt="Avatar"
          className="profile-avatar"
        />
        <span className="profile-name">{user?.namePlayer}</span>
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink to="/" className="nav-link">
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tournaments" className="nav-link">
            <FaTrophy />
            <span>Torneos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/matches" className="nav-link">
            <MdSportsEsports />
            <span>Partidos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" className="nav-link">
            <MdEqualizer />
            <span>Estadísticas</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className="nav-link">
            <MdEvent />
            <span>Calendario</span>
          </NavLink>
        </li>
      </ul>
      <ul className="nav-menu bottom-menu">
        <li>
          <NavLink to="/perfil" className="nav-link">
            <MdPerson />
            <span>Perfil</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="nav-link">
            <MdSettings />
            <span>Ajustes</span>
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-link logout-button">
            <MdLogout />
            <span>Salir</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
