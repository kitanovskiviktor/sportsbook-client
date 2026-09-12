import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantConfig } from './models/tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private http = inject(HttpClient);

  getConfig(): Observable<TenantConfig> {
    const domain = window.location.hostname;
    return this.http.get<TenantConfig>(`http://${domain}:8080/api/tenant/config`);
  }
}
