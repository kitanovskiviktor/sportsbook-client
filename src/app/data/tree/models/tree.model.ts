export interface EventTree {
  id: number;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: string;
}

export interface LeagueTree {
  id: number;
  name: string;
  events: EventTree[];
}

export interface CategoryTree {
  id: number;
  name: string;
  leagues: LeagueTree[];
}

export interface SportTree {
  id: number;
  name: string;
  categories: CategoryTree[];
}