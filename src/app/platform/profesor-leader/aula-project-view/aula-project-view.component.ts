import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AulaProject, Grade } from 'src/app/interfaces/aulaProject.interface';
import { TransversalAxis, TransversalAxisType } from 'src/app/interfaces/transversalAxis.interface';
import { AulaProjectsService } from 'src/app/services/aula-projects.service';
import { AxisService } from 'src/app/services/axis.service';

@Component({
  selector: 'app-aula-project-view',
  templateUrl: './aula-project-view.component.html',
  styleUrls: ['./aula-project-view.component.css'],
})
export class AulaProjectViewComponent {
  private _form: FormGroup;
  private _transversalAxis: TransversalAxis[];
  private _axisTypes: TransversalAxisType[];
  private _grades: Grade[];
  private _aulaProjects: AulaProject[];

  public constructor(private fb: FormBuilder, private axixService: AxisService, private aulaProjectsService: AulaProjectsService) {
    this._form = fb.group({
      nombre: [''],
      id_eje_transversal: [1],
      tipo_eje: [0],
      fecha_inicio: [''],
      fecha_fin: [''],
      docente_lider: [1],
      grado: [1],
      cierre: [''],
    });

    this._transversalAxis = [];
    this._axisTypes = [];
    this._grades = [];
    this._aulaProjects = [];
  }

  ngOnInit() {
    this.axixService.listTransversalAxis().subscribe({
      next: axisList => this._transversalAxis = axisList
    });

    this.axixService.listTransversalAxisTypes().subscribe({
      next: types => this._axisTypes = types
    })

    this.aulaProjectsService.grades().subscribe({
      next: gradesList => this._grades = gradesList
    })

    this.aulaProjectsService.list().subscribe({
      next: aulaProjectsList => this._aulaProjects = aulaProjectsList
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  get transversalAxis(): TransversalAxis[] {
    return this._transversalAxis;
  }

  get axisTypes(): TransversalAxisType[] {
    return this._axisTypes.filter(type => {
      return (
        type.id_eje_transversal == this._form.controls['id_eje_transversal'].value
      );
    });
  }

  get grades(): Grade[] {
    return this._grades;
  }

  get aulaProjects(): AulaProject[] {
    return this._aulaProjects;
  }

  getAxis(id: number) {
    return this.transversalAxis.filter((x) => x.id == id).shift();
  }

  getGrade(id: number) {
    return this.grades.filter(x => x.id == id).shift();
  }

  createAulaProject() {
    const aulaProject: AulaProject = {
      nombre: this._form.controls['nombre'].value,
      id_eje_transversal: this._form.controls['id_eje_transversal'].value,
      tipo_eje: this._form.controls['tipo_eje'].value,
      fecha_inicio: this._form.controls['fecha_inicio'].value,
      fecha_fin: this._form.controls['fecha_fin'].value,
      docente_lider: this._form.controls['docente_lider'].value,
      grado: this._form.controls['grado'].value,
      cierre: this._form.controls['cierre'].value,
    };

    this.aulaProjectsService.create(aulaProject).subscribe({
      next: () => {
        console.log(true)
      }
    })
  }
}
