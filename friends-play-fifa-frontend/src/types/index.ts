export interface Player {
  id: string;
  namePlayer: string;
  points: number;
  matchesPlayed: number;
  wins: number;
  activeTournaments: number;
  favoriteTeam: string;
  image: string;
}

export interface Tournament {
  id: string;
  name: string;
  type: "kickoff" | "el-sol";
  players: string[]; // IDs de jugadores
  status: "active" | "completed" | "pending";
  createdAt: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  player1Id: string;
  player2Id: string;
  score1?: number;
  score2?: number;
  winnerId?: string;
  completed: boolean;
  createdAt: string;
}

export interface Team {
  idTeam: number;
  nameTeam: string;
  logoTeam: string;
  league: League; 
  category: Category | null;
}

export interface League {
  idLeague: number;
  nameLeague: string;
  logoLeague: string;
}

export interface Category {
  idCategory: number;
  nameCategory: string;
  logoCategory: string; 

}
