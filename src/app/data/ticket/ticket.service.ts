import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceBetRequest, TicketResponse } from './models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/tickets';

  placeBet(request: PlaceBetRequest): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(this.apiUrl, request);
  }

  getPlayerTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.apiUrl}/player`);
  }
}