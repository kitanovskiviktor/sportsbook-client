import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { EventDetail } from './pages/event-detail/event-detail';
import { Auth } from './pages/auth/auth';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'event/:id', component: EventDetail },
  { path: 'auth', component: Auth },
];
