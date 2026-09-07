import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { EventDetail } from './pages/event-detail/event-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'event/:id', component: EventDetail },
];
