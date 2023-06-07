import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransversalAxis } from 'src/app/interfaces/transversalAxis.interface';
import { ActivityPT, WorkPlan } from 'src/app/interfaces/workplan.interface';
import { AxisService } from 'src/app/services/axis.service';
import { WorkplanService } from 'src/app/services/workplan.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent {
  private _form: FormGroup;
  private _acForm: FormGroup;
  private _workplans: WorkPlan[];
  private _activities: ActivityPT[];
  private _transversalAxis: TransversalAxis[];

  public constructor(
    private fb: FormBuilder,
    private workPlanService: WorkplanService,
    private toastr: ToastrService,
    private axisService: AxisService
  ) {
    this._form = this.fb.group({
      nombre: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      docente_apoyo: [1, [Validators.required]],
      cumplimiento: ['', [Validators.required]],
      observacion: ['', Validators.required],
      plan_trabajo: [0, Validators.required],
    });

    this._acForm = this.fb.group({
      activity: [1],
    });

    this._workplans = [];
    this._activities = [];
    this._transversalAxis = [];
  }

  public ngOnInit() {
    this.workPlanService.list().subscribe({
      next: (workplans) => {
        this._workplans = workplans;
      },
    });

    this.axisService.listTransversalAxis().subscribe({
      next: (axis) => {
        this._transversalAxis = axis;
      }
    })

    this.acForm.controls['activity'].valueChanges.subscribe({
      next: () => {
        this.listActivities(
          this._workplans[this.acForm.controls['activity'].value].id!
        );
      },
    });
  }

  get workplans(): WorkPlan[] {
    return this._workplans;
  }

  get transversalAxis(): TransversalAxis[] {
    return this._transversalAxis;
  }

  get activities(): ActivityPT[] {
    return this._activities;
  }

  get form(): FormGroup {
    return this._form;
  }

  get acForm(): FormGroup {
    return this._acForm;
  }

  public listActivities(id: number): void {
    this.workPlanService.listActivitys(id).subscribe({
      next: (activities) => {
        this._activities = activities;
      },
    });
  }

  public createActivity() {
    const activity: ActivityPT = {
      nombre: this._form.controls['nombre'].value,
      fecha_inicio: this._form.controls['fecha_inicio'].value,
      fecha_fin: this._form.controls['fecha_fin'].value,
      docente_apoyo: this._form.controls['docente_apoyo'].value,
      cumplimiento: this._form.controls['cumplimiento'].value,
      observacion: this._form.controls['observacion'].value,
    };

    const workplan = this.workplans[this._form.controls['plan_trabajo'].value].id!;

    this.workPlanService
      .createActivity(activity, workplan)
      .subscribe({
        next: () => {
          this._form.reset();
          this.toastr.success('Actividad creada con exito!');
        },
      });
  }
}
