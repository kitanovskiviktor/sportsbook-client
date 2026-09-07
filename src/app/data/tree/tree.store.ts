import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { TreeService } from './tree.service';
import { SportTree } from './models/tree.model';

interface TreeState {
  tree: SportTree[];
  loading: boolean;
  error: string | null;
}

const initialState: TreeState = {
  tree: [],
  loading: false,
  error: null
};

export const TreeStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((state) => ({
    hasData: computed(() => state.tree().length > 0),
    sportsCount: computed(() => state.tree().length)
  })),

  withMethods((store, treeService = inject(TreeService)) => ({

    loadTree: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((hours) =>
          treeService.getTree(hours).pipe(
            tapResponse({
              next: (tree) => patchState(store, { tree, loading: false }),
              error: (err: Error) =>
                patchState(store, { error: err.message, loading: false })
            })
          )
        )
      )
    )
  }))
);