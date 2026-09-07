import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventResponse } from './models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/events';

  getEventsByLeagues(leagueIds: number[], hours: number): Observable<EventResponse[]> {
    return this.http.post<EventResponse[]>(
      `${this.apiUrl}/by-leagues?hours=${hours}`,
      leagueIds
    );
  }
}