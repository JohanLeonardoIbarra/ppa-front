import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, timeout, timer } from 'rxjs';
import { TransversalAxis } from 'src/app/interfaces/transversalAxis.interface';
import { WorkPlan } from 'src/app/interfaces/workplan.interface';
import { AxisService } from 'src/app/services/axis.service';
import { WorkplanService } from 'src/app/services/workplan.service';

@Component({
  selector: 'app-list-work-plans',
  templateUrl: './list-work-plans.component.html',
  styleUrls: ['./list-work-plans.component.css'],
})
export class ViewWorkPlansComponent {
  private _form!: FormGroup;
  private _workplans: WorkPlan[];
  private _transversalAxis: TransversalAxis[];

  public constructor(
    private fb: FormBuilder,
    private workPlanService: WorkplanService,
    private axixService: AxisService,
    private toastr: ToastrService
  ) {
    this._workplans = [];
    this._transversalAxis = [];
  }

  public ngOnInit() {
    this._form = this.fb.group({
      anio: [2023],
      id_eje_transversal: [1],
      cierre: [''],
    });

    this.workPlanService.list().subscribe({
      next: (workplans) => {
        this._workplans = workplans;
      },
    });

    this.axixService.listTransversalAxis().subscribe({
      next: (transversalAxisList) =>
        (this._transversalAxis = transversalAxisList),
    });
  }

  get workplans(): WorkPlan[] {
    return this._workplans
  }

  get form(): FormGroup {
    return this._form;
  }

  get transversalAxis(): TransversalAxis[] {
    return this._transversalAxis;
  }

  public createWorkPlan() {
    const workPlan: WorkPlan = {
      anio: this._form.controls['anio'].value,
      id_eje_transversal: this._form.controls['id_eje_transversal'].value,
      cierre: this._form.controls['cierre'].value,
    };

    this.workPlanService.create(workPlan).subscribe({
      next: () => {
        this._form.reset();
        this.workPlanService.list().subscribe({
          next: (workplans) => {
            this._workplans = workplans;
          },
        });
        this.toastr.success('Plan de trabajo creado con exito!')
      },
    });
  }
}
