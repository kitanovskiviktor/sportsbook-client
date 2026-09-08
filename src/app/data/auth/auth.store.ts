import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AuthService } from './auth.service';
import { AuthResponse, LoginRequest, RegisterRequest } from './models/auth.model';

interface AuthState {
  token: string | null;
  playerId: number | null;
  username: string | null;
  loading: boolean;
  error: string | null;
}

const stored = localStorage.getItem('auth');
const initialState: AuthState = stored
  ? { ...JSON.parse(stored), loading: false, error: null }
  : { token: null, playerId: null, username: null, loading: false, error: null };

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((state) => ({
    isLoggedIn: computed(() => !!state.token())
  })),

  withMethods((store, authService = inject(AuthService)) => {

    const persist = (res: AuthResponse) => {
      localStorage.setItem('auth', JSON.stringify({
        token: res.token, playerId: res.playerId, username: res.username
      }));
      patchState(store, {
        token: res.token, playerId: res.playerId, username: res.username,
        loading: false, error: null
      });
    };

    return {
      login: rxMethod<LoginRequest>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((req) =>
            authService.login(req).pipe(
              tapResponse({
                next: (res) => persist(res),
                error: (err: any) =>
                  patchState(store, { loading: false, error: err?.error?.message || 'Login failed' })
              })
            )
          )
        )
      ),

      register: rxMethod<RegisterRequest>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((req) =>
            authService.register(req).pipe(
              tapResponse({
                next: (res) => persist(res),
                error: (err: any) =>
                  patchState(store, { loading: false, error: err?.error?.message || 'Registration failed' })
              })
            )
          )
        )
      ),

      logout(): void {
        localStorage.removeItem('auth');
        patchState(store, { token: null, playerId: null, username: null, error: null });
      }
    };
  })
);