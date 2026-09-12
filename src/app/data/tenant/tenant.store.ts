import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { TenantService } from './tenant.service';
import { TenantConfig } from './models/tenant.model';

interface TenantState {
  config: TenantConfig | null;
}

const initialState: TenantState = { config: null };

export const TenantStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, tenantService = inject(TenantService)) => ({
    loadConfig: rxMethod<void>(
      pipe(
        switchMap(() =>
          tenantService.getConfig().pipe(
            tapResponse({
              next: (config) => {
                patchState(store, { config });
                applyBranding(config);
              },
              error: () => patchState(store, { config: null })
            })
          )
        )
      )
    )
  }))
);

function applyBranding(config: TenantConfig): void {
  document.documentElement.style.setProperty('--brand-primary', config.primaryColor);
  document.title = config.brandName;
}