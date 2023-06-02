import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, isAuth, lockLogin } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'prefix',
    canMatch: [lockLogin],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pl',
    pathMatch: 'prefix',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./profesor-leader/profesor-leader.module').then(
        (m) => m.ProfesorLeaderModule
      ),
  },
  {
    path: '**',
    redirectTo: (isAuth()) ? 'pl' : 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
