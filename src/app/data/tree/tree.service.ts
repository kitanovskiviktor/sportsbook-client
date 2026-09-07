import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SportTree } from './models/tree.model';

@Injectable({ providedIn: 'root' })
export class TreeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/tree';

  getTree(hours: number = 24): Observable<SportTree[]> {
    return this.http.get<SportTree[]>(`${this.apiUrl}?hours=${hours}`);
  }
}