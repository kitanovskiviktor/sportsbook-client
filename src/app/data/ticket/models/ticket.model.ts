export interface PlaceBetSelection {
  outcomeId: number;
  odds: number;
}

export interface PlaceBetRequest {
  stake: number;
  selections: PlaceBetSelection[];
}

export interface TicketSelectionResponse {
  outcomeId: number;
  eventId: number;
  homeTeam: string;
  awayTeam: string;
  marketName: string;
  outcomeName: string;
  eventStatus: string;
  oddsAtPlacement: number;
}

export interface TicketResponse {
  id: number;
  stake: number;
  totalOdds: number;
  potentialPayout: number;
  status: string;
  placedAt: string;
  selections: TicketSelectionResponse[];
}