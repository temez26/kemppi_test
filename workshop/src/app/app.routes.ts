import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { RoundsComponent } from './rounds/rounds.component';

export const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  },
  {
    path: 'rounds',
    component: RoundsComponent,
  },
];
