import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { EventResponse } from './models/event.model';
import { EventService } from './event.service';

interface EventState {
  events: EventResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = { events: [], loading: false, error: null };

export const EventStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, eventService = inject(EventService)) => ({
    loadEvents: rxMethod<{ leagueIds: number[]; hours: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ leagueIds, hours }) =>
          eventService.getEventsByLeagues(leagueIds, hours).pipe(
            tapResponse({
              next: (events) => patchState(store, { events, loading: false }),
              error: (err: Error) => patchState(store, { error: err.message, loading: false })
            })
          )
        )
      )
    ),
    clearEvents(): void {
      patchState(store, { events: [] });
    }
  }))
);