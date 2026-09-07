import { computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';

interface TreeSelectionState {
  selectedLeagues: Record<number, boolean>;
}

const initialState: TreeSelectionState = {
  selectedLeagues: {}
};

export const TreeSelectionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((state) => ({
    selectedLeagueIds: computed(() =>
      Object.keys(state.selectedLeagues())
        .filter(id => state.selectedLeagues()[+id])
        .map(id => +id)
    )
  })),

  withMethods((store) => ({
    toggleLeague(leagueId: number): void {
      const current = store.selectedLeagues();
      patchState(store, {
        selectedLeagues: { ...current, [leagueId]: !current[leagueId] }
      });
    },

    setLeagues(leagueIds: number[], value: boolean): void {
      const current = { ...store.selectedLeagues() };
      leagueIds.forEach(id => current[id] = value);
      patchState(store, { selectedLeagues: current });
    },

    clear(): void {
      patchState(store, { selectedLeagues: {} });
    }
  }))
);