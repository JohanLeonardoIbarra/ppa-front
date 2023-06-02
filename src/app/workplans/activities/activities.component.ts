import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityPT, WorkPlan } from 'src/app/interfaces/workplan.interface';
import { WorkplanService } from 'src/app/services/workplan.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent {
  private _form!: FormGroup;
  private _workplans: WorkPlan[];

  public constructor(
    private fb: FormBuilder,
    private workPlanService: WorkplanService
  ) {
    this._workplans = [];
  }

  public ngOnInit() {
    this._form = this.fb.group({
      nombre: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      docente_apoyo: 1,
      cumplimiento: [''],
      observacion: [''],
      plan_trabajo: 0,
    });

    this.workPlanService.list().subscribe({
      next: (workplans) => {
        this._workplans = workplans;
      },
    });
  }

  get workplans(): WorkPlan[] {
    return this._workplans;
  }

  get form(): FormGroup {
    return this._form;
  }

  public createActivity() {
    const activity: ActivityPT = {
      nombre: this._form.controls['nombre'].value,
      fecha_inicio: this._form.controls['fecha_inicio'].value,
      fecha_fin: this._form.controls['fecha_fin'].value,
      docente_apoyo: this._form.controls['docente_apoyo'].value,
      cumplimiento: this._form.controls['cumplimiento'].value,
      observacion: this._form.controls['observacion'].value,
      plan_trabajo: this._form.controls['plan_trabajo'].value,
    };

    this.workPlanService.createActivity(activity).subscribe({
      next: () => {
        this._form.reset();
      },
    });
  }
}
