import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

export const routes: Routes = [
  { path: 'detalhes/:id', component: DetalhesComponent },
  { path: 'home', component: ListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListComponent },
];
