import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Market } from './models/market.model';
import { MarketService } from './market.service';

interface MarketState {
  markets: Market[];
  loading: boolean;
  error: string | null;
}

const initialState: MarketState = { markets: [], loading: false, error: null };

export const MarketStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, marketService = inject(MarketService)) => ({
    loadMarkets: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((eventId) =>
          marketService.getMarketsByEvent(eventId).pipe(
            tapResponse({
              next: (markets) => patchState(store, { markets, loading: false }),
              error: (err: Error) => patchState(store, { error: err.message, loading: false })
            })
          )
        )
      )
    )
  }))
);