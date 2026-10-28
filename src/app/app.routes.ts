import { Routes } from '@angular/router';
import { Chat } from './features/chat/chat';

export const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', component: Chat }
];