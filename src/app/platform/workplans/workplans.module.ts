import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewWorkPlansComponent } from './list-work-plans/list-work-plans.component';
import { WorkPlansComponent } from './work-plans/work-plans.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ViewWorkPlansComponent,
    WorkPlansComponent,
    ActivitiesComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [ViewWorkPlansComponent, WorkPlansComponent, ActivitiesComponent],
})
export class WorkplansModule {}
