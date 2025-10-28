// src/components/Login.tsx
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface Team {
  idTeam: number;
  nameTeam: string;
}

type FormType = "login" | "register";

const Login: React.FC = () => {
  const [formType, setFormType] = useState<FormType>("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState<number | "">("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const { login } = useUser();
  const navigate = useNavigate();

  // Cargar equipos (solo necesario en registro, pero lo cargamos siempre para simplicidad)
  useEffect(() => {
    const fetchTeams = async () => {
      const url = `${import.meta.env.VITE_API_FPF}/teams`;
      console.log("🔍 URL de teams:", url);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_FPF}/teams`);
        const data = await res.json();
        setTeams(data);
        if (data.length > 0 && formType === "register") {
          setFavoriteTeam(data[0].idTeam);
        }
      } catch (err) {
        console.error("Error al cargar equipos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [formType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_FPF}/players/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namePlayer: name.trim(),
          password: password.trim(),
        }),
      });

      if (res.ok) {
        const userData = await res.json();
        login(userData);
        navigate("/");
      } else {
        const error = await res.json();
        alert("Error: " + (error.message || "Credenciales incorrectas"));
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim() || !favoriteTeam) return;

    // Validación de contraseña (opcional en frontend, ya la tienes en backend)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "La contraseña debe tener 8-20 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)."
      );
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_FPF}/players/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namePlayer: name.trim(),
          password: password.trim(),
          favoriteTeam: Number(favoriteTeam),
          image: "",
        }),
      });

      if (res.ok) {
        const userData = await res.json();
        login(userData);
        navigate("/");
      } else {
        const error = await res.json();
        alert(
          "Error al registrarse: " + (error.message || "Inténtalo de nuevo")
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  if (loading && formType === "register") {
    return (
      <div className="login-container">
        <p>Cargando equipos...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>⚽ FIFA Torneos</h1>

        {/* Pestañas */}
        <div className="tabs">
          <button
            className={formType === "login" ? "tab-active" : "tab"}
            onClick={() => {
              setFormType("login");
              setName("");
              setPassword("");
            }}
          >
            Iniciar sesión
          </button>
          <button
            className={formType === "register" ? "tab-active" : "tab"}
            onClick={() => {
              setFormType("register");
              setName("");
              setPassword("");
              if (teams.length > 0) setFavoriteTeam(teams[0].idTeam);
            }}
          >
            Registrarse
          </button>
        </div>

        {formType === "login" ? (
          <form onSubmit={handleLogin}>
            <p>Ingresa tus credenciales</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="login-input"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="login-input"
              required
            />
            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <p>Crea tu cuenta</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="login-input"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (8-20 caracteres)"
              className="login-input"
              required
              minLength={8}
              maxLength={20}
            />
            <select
              value={favoriteTeam}
              onChange={(e) => setFavoriteTeam(Number(e.target.value))}
              className="login-input"
              // required
            >
              <option value="">Selecciona tu equipo favorito</option>
              {teams.map((team) => (
                <option key={team.idTeam} value={team.idTeam}>
                  {team.nameTeam}
                </option>
              ))}
            </select>
            <button type="submit" className="login-button">
              Crear cuenta
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
