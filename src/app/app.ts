import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantStore } from './data/tenant/tenant.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private tenantStore = inject(TenantStore);

  ngOnInit(): void {
    this.tenantStore.loadConfig();
  }
}
