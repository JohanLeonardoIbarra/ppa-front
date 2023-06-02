import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlmainComponent } from './plmain/plmain.component';
import { ViewWorkPlansComponent } from '../workplans/list-work-plans/list-work-plans.component';

import { ActivitiesComponent } from '../workplans/activities/activities.component';
import { AulaProjectViewComponent } from './aula-project-view/aula-project-view.component';
import { AulaProjectActivitiesComponent } from './activities/activities.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: PlmainComponent,
      },
      {
        path: 'workplans/view',
        component: ViewWorkPlansComponent,
      },
      {
        path: 'workplans/activity',
        component: ActivitiesComponent,
      },
      {
        path: 'projects/view',
        component: AulaProjectViewComponent
      },
      {
        path: 'projects/activity',
        component: AulaProjectActivitiesComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorLeaderRoutingModule {}
