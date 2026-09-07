import { computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { BetSelection } from './models/bet-selection.model';

interface BetslipState {
  selections: BetSelection[];
  stake: number;
}

const initialState: BetslipState = { selections: [], stake: 0 };

export const BetslipStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((state) => ({
    totalOdds: computed(() =>
      state.selections().reduce((acc, s) => acc * s.odds, 1)
    ),
    count: computed(() => state.selections().length),
    potentialWin: computed(() => {
      const total = state.selections().reduce((acc, s) => acc * s.odds, 1);
      return state.stake() * total;
    })
  })),

  withMethods((store) => ({
    addSelection(selection: BetSelection): void {
      const current = store.selections();

      const existingFromEvent = current.find(s => s.eventId === selection.eventId);
      if (existingFromEvent) {
        if (existingFromEvent.outcomeId === selection.outcomeId) {
          patchState(store, {
            selections: current.filter(s => s.outcomeId !== selection.outcomeId)
          });
        } else {
          patchState(store, {
            selections: current
              .filter(s => s.eventId !== selection.eventId)
              .concat(selection)
          });
        }
        return;
      }

      patchState(store, { selections: [...current, selection] });
    },

    removeSelection(outcomeId: number): void {
      patchState(store, {
        selections: store.selections().filter(s => s.outcomeId !== outcomeId)
      });
    },

    setStake(stake: number): void {
      patchState(store, { stake });
    },

    clear(): void {
      patchState(store, { selections: [], stake: 0 });
    }
  }))
);