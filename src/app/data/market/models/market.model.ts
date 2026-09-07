import { Outcome } from "./outcome.model";

export interface Market {
  id: number;
  eventId: number;
  marketTypeId: number;
  marketTypeName: string;
  outcomes: Outcome[];
}