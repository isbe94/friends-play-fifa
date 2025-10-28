import { useEffect, useState } from "react";
import type { Category, League, Team } from "../types";
import "./Settings.css";

type ActiveFilter = "league" | "category";

export default function Settings() {
  // --- Estados de datos ---
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // --- Estado de carga ---
  const [isLoading, setIsLoading] = useState(true);

  // --- Estados de selección ---
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // --- Estado para el filtro activo ---
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("league");

  const API_BASE = import.meta.env.VITE_API_FPF;
  const API_LOGO = import.meta.env.VITE_API_LOGO;

  // --- Carga de datos inicial ---
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [leaguesRes, teamsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/leagues`),
          fetch(`${API_BASE}/teams`),
          fetch(`${API_BASE}/categories`),
        ]);

        const leaguesData: League[] = await leaguesRes.json();
        const teamsData: Team[] = await teamsRes.json();
        const categoriesData: Category[] = await categoriesRes.json();

        setLeagues(leaguesData);
        setTeams(teamsData);
        setCategories(categoriesData);

        if (leaguesData.length > 0) {
          setSelectedLeagueId(leaguesData[0].idLeague);
          setActiveFilter("league");
        }
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [API_BASE]);

  // --- Filtrado de equipos  ---
  const filteredTeams = teams.filter((team) => {
    if (activeFilter === "league") {
      return team.league.idLeague === selectedLeagueId;
    }
    if (activeFilter === "category") {
      if (selectedCategoryId === null) {
        return team.category === null;
      }
      return team.category?.idCategory === selectedCategoryId;
    }
    return false;
  });

  // --- Handlers de selección (sin cambios) ---
  const handleLeagueSelect = (leagueId: number) => {
    setActiveFilter("league");
    setSelectedLeagueId(leagueId);
    setSelectedCategoryId(null);
    setSelectedTeam(null);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setActiveFilter("category");
    setSelectedCategoryId(categoryId);
    setSelectedLeagueId(null);
    setSelectedTeam(null);
  };

  // --- Handler de actualización de categoría ---
  const handleCategoryChange = async (newCategoryId: number | null) => {
    if (!selectedTeam) return;
    const currentSelectedTeamId = selectedTeam.idTeam;

    try {
      const res = await fetch(`${API_BASE}/teams/${currentSelectedTeamId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategoryId }),
      });

      if (res.ok) {
        const newCategory = newCategoryId
          ? categories.find((cat) => cat.idCategory === newCategoryId)
          : null;

        const updatedTeams = teams.map((team) =>
          team.idTeam === currentSelectedTeamId
            ? { ...team, category: newCategory as Category | null }
            : team
        );
        setTeams(updatedTeams);
        // --- Deselecciona el equipo después de la actualización ---
        setSelectedTeam(null);

        // const updatedSelectedTeam = updatedTeams.find(
        //   (t) => t.idTeam === currentSelectedTeamId
        // );
        // if (updatedSelectedTeam) {
        //   setSelectedTeam(updatedSelectedTeam);
        // }
      }
    } catch (error) {
      console.error("Error actualizando categoría:", error);
    }
  };

  // --- Renderizado del estado de carga ---
  if (isLoading) {
    return (
      <div className="settings-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
        </div>
      </div>
    );
  }

  // --- Renderizado principal del componente ---
  return (
    <div className="page-container settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Gestión de Equipos y Categorías</h1>
        <p className="settings-subtitle">
          Selecciona una liga, luego un equipo y finalmente asigna una nueva
          categoría.
        </p>
      </div>

      <div className="settings-main-grid">
        {/* Columna 1: Ligas */}
        <div className="settings-column">
          <div className="section-header leagues-header">
            {/* ... SVG Icon ... */}
            <h2 className="section-title">Ligas</h2>
            <span className="section-count">{leagues.length}</span>
          </div>
          <div className="item-list">
            {leagues.map((league) => (
              <div
                key={league.idLeague}
                onClick={() => handleLeagueSelect(league.idLeague)}
                className={`league-item ${
                  activeFilter === "league" &&
                  selectedLeagueId === league.idLeague
                    ? "selected"
                    : ""
                }`}
              >
                <img
                  src={`${API_LOGO}/${league.logoLeague}`}
                  alt={league.nameLeague}
                  className="league-logo"
                />
                <h3 className="league-name">{league.nameLeague}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Columna 2: Equipos */}
        <div className="settings-column">
          <div className="section-header teams-header">
            <h2 className="section-title">Equipos</h2>
            {(selectedLeagueId || selectedCategoryId) && (
              <span className="section-count">{filteredTeams.length}</span>
            )}
          </div>
          <div className="item-list">
            {!selectedLeagueId && selectedCategoryId === null ? (
              <div className="empty-state">
                <svg
                  className="empty-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                </svg>
                <h3 className="empty-title">Selecciona un filtro</h3>
                <p className="empty-description">
                  Elige una liga o categoría para ver los equipos.
                </p>
              </div>
            ) : filteredTeams.length === 0 ? (
              <div className="empty-state">
                <svg
                  className="empty-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                </svg>
                <h3 className="empty-title">No hay equipos</h3>
                {/* El texto cambia según el filtro activo */}
                <p className="empty-description">
                  {activeFilter === "league"
                    ? "Esta liga no tiene equipos registrados."
                    : "No hay equipos en esta categoría."}
                </p>
              </div>
            ) : (
              filteredTeams.map((team) => (
                <div
                  key={team.idTeam}
                  onClick={() => setSelectedTeam(team)}
                  className={`team-item ${
                    selectedTeam?.idTeam === team.idTeam ? "selected" : ""
                  }`}
                >
                  <div className="team-header">
                    <img
                      src={`${API_LOGO}/${team.logoTeam}`}
                      alt={team.nameTeam}
                      className="team-logo"
                    />
                    <h3 className="team-name">{team.nameTeam}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Columna 3: Categorías */}
        <div className="settings-column">
          <div className="section-header categories-header">
            <h2 className="section-title">Categorías</h2>
            <span className="section-count">{categories.length}</span>
          </div>
          <div className="item-list">
            {!selectedTeam ? (
              <>
                {categories.map((category) => (
                  <div
                    key={category.idCategory}
                    onClick={() => handleCategorySelect(category.idCategory)}
                    className={`category-item ${
                      activeFilter === "category" &&
                      selectedCategoryId === category.idCategory
                        ? "selected"
                        : ""
                    }`}
                  >
                    <img
                      src={`${API_LOGO}/${category.logoCategory}`}
                      alt={category.nameCategory}
                      className="category-logo"
                    />
                  </div>
                ))}
              </>
            ) : (
              // Categoría para asignar
              <>
                {categories.map((category) => {
                  const isSelected =
                    selectedTeam.category?.idCategory === category.idCategory;
                  return (
                    <div
                      key={category.idCategory}
                      onClick={() =>
                        handleCategoryChange(
                          isSelected ? null : category.idCategory
                        )
                      }
                      className={`category-item ${
                        isSelected ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`${API_LOGO}/${category.logoCategory}`}
                        alt={category.nameCategory}
                        className="category-logo"
                      />
                      {isSelected && (
                        <svg
                          className="check-icon"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
