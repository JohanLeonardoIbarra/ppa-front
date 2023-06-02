import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityAP, AulaProject } from 'src/app/interfaces/aulaProject.interface';
import { ActivityPT, WorkPlan } from 'src/app/interfaces/workplan.interface';
import { AulaProjectsService } from 'src/app/services/aula-projects.service';
import { WorkplanService } from 'src/app/services/workplan.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class AulaProjectActivitiesComponent {
  private _form!: FormGroup;
  private _aulaProjects: AulaProject[];

  public constructor(
    private fb: FormBuilder,
    private aulaProjectService: AulaProjectsService
  ) {
    this._aulaProjects = [];
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

    this.aulaProjectService.list().subscribe({
      next: (aulaProjects) => {
        this._aulaProjects = aulaProjects;
      },
    });
  }

  get aulaProjects(): AulaProject[] {
    return this._aulaProjects;
  }

  get form(): FormGroup {
    return this._form;
  }

  public createActivity() {
    const activity: ActivityAP = {
      nombre: this._form.controls['nombre'].value,
      fecha_inicio: this._form.controls['fecha_inicio'].value,
      fecha_fin: this._form.controls['fecha_fin'].value,
      cumplimiento: this._form.controls['cumplimiento'].value,
      observacion: this._form.controls['observacion'].value,
      proyecto_aula: this._form.controls['proyecto_aula'].value,
    };

    this.aulaProjectService.createActivity(activity).subscribe({
      next: () => {
        this._form.reset();
      },
    });
  }
}
