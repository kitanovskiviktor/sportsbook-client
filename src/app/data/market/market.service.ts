import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Market } from './models/market.model';

@Injectable({ providedIn: 'root' })
export class MarketService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/markets';

  getMarketsByEvent(eventId: number): Observable<Market[]> {
    return this.http.get<Market[]>(`${this.apiUrl}/by-event/${eventId}`);
  }
}