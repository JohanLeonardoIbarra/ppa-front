import { Component } from '@angular/core';
import { WorkPlan } from 'src/app/interfaces/workplan.interface';
import { WorkplanService } from 'src/app/services/workplan.service';

@Component({
  selector: 'app-work-plans',
  templateUrl: './work-plans.component.html',
  styleUrls: ['./work-plans.component.css']
})
export class WorkPlansComponent {
  private _workPlans: WorkPlan[];
  public loaded: boolean;

  constructor(private workPlanService: WorkplanService) {
    this._workPlans = [];
    this.loaded = false;
  }

  public ngOnInit() {
    this.workPlanService.list().subscribe({
      next: (workplas) => {
        this._workPlans = workplas;
        this.loaded = true;
      },
    });
  }

  get workPlans() {
    return this._workPlans.filter((wp, i) => {
      return i < 4
    })
  }
}
