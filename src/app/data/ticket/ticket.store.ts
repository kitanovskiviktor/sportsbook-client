import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { PlaceBetRequest, TicketResponse } from './models/ticket.model';
import { TicketService } from './ticket.service';

interface TicketState {
  placing: boolean;
  message: string | null;
  messageType: 'success' | 'error' | null;
  playerTickets: TicketResponse[];
}

const initialState: TicketState = {
  placing: false,
  message: null,
  messageType: null,
  playerTickets: [],
};

export const TicketStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, ticketService = inject(TicketService)) => ({
    placeTicket: rxMethod<PlaceBetRequest>(
      pipe(
        tap(() => patchState(store, { placing: true, message: null, messageType: null })),
        switchMap((request) =>
          ticketService.placeBet(request).pipe(
            tapResponse({
              next: () =>
                patchState(store, {
                  placing: false,
                  message: 'Bet placed successfully!',
                  messageType: 'success',
                }),
              error: (err: any) =>
                patchState(store, {
                  placing: false,
                  message: err?.error?.message || 'Failed to place bet',
                  messageType: 'error',
                }),
            }),
          ),
        ),
      ),
    ),

    loadPlayerTickets: rxMethod<void>(
      pipe(
        switchMap(() =>
          ticketService.getPlayerTickets().pipe(
            tapResponse({
              next: (tickets) => patchState(store, { playerTickets: tickets }),
              error: () => patchState(store, { playerTickets: [] }),
            }),
          ),
        ),
      ),
    ),

    clearMessage(): void {
      patchState(store, { message: null, messageType: null });
    },
  })),
);
