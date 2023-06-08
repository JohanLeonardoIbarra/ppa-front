import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import {
  ActivityAP,
  ActivityAPCreation,
  AulaProject,
} from 'src/app/interfaces/aulaProject.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { TransversalAxisType } from 'src/app/interfaces/transversalAxis.interface';
import { AulaProjectsService } from 'src/app/services/aula-projects.service';
import { AxisService } from 'src/app/services/axis.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class AulaProjectActivitiesComponent {
  private _form: FormGroup;
  private _acForm: FormGroup;
  private _aulaProjects: AulaProject[];
  private _axisTypes: TransversalAxisType[];
  private _activities: ActivityAP[];
  private _students: Student[];

  public selectedStudents: Student[];

  public constructor(
    private fb: FormBuilder,
    private aulaProjectService: AulaProjectsService,
    private axisService: AxisService,
    private studentsService: StudentsService
  ) {
    this._form = this.fb.group({
      nombre: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      docente_apoyo: [1, [Validators.required]],
      cumplimiento: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
      proyecto_aula: [1, [Validators.required]],
      studentCode: [''],
    });

    this._acForm = fb.group({
      activity: [1],
    });

    this._aulaProjects = [];
    this._axisTypes = [];
    this._activities = [];
    this.selectedStudents = [];
    this._students = [];
  }

  public ngOnInit() {
    this.aulaProjectService.list().subscribe({
      next: (aulaProjects) => {
        this._aulaProjects = aulaProjects;
      },
    });

    this.axisService.listTransversalAxisTypes().subscribe({
      next: (axisTypes) => (this._axisTypes = axisTypes),
    });

    this._form.controls['studentCode'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => this.studentsService.list(value))
      )
      .subscribe({
        next: (students) => {
          this._students = students;
        },
      });

    this.acForm.controls['activity'].valueChanges.subscribe({
      next: () => {
        this.listActivities(
          this._aulaProjects[this.acForm.controls['activity'].value].id!
        );
      },
    });
  }

  get aulaProjects(): AulaProject[] {
    return this._aulaProjects;
  }

  get form(): FormGroup {
    return this._form;
  }

  get acForm(): FormGroup {
    return this._acForm;
  }

  get axisTypes(): TransversalAxisType[] {
    return this._axisTypes;
  }

  get activities(): ActivityAP[] {
    return this._activities;
  }

  get students(): Student[] {
    return this._students;
  }

  public addStudent(student: Student) {
    if (
      !this.selectedStudents.some(
        (actual) => actual.correo_electronico == student.correo_electronico
      )
    ) {
      this.selectedStudents.push(student);
      this._form.controls['studentCode'].setValue('');
      this._students = [];
    }
  }

  public removeStudent(student: Student) {
    this.selectedStudents = this.selectedStudents.filter(
      (value) => value.correo_electronico != student.correo_electronico
    );
  }

  public createActivity() {
    if (!this.form.valid) return;

    const activity: ActivityAP = {
      nombre: this._form.controls['nombre'].value,
      fecha_inicio: this._form.controls['fecha_inicio'].value,
      fecha_fin: this._form.controls['fecha_fin'].value,
      cumplimiento: this._form.controls['cumplimiento'].value,
      observacion: this._form.controls['observacion'].value,
    };

    const body: ActivityAPCreation = {
      actividadPA: activity,
      estudiantes: this.selectedStudents.map((student) => student.codigo),
    };

    const aulaProject = this._form.controls['proyecto_aula'].value;

    this.aulaProjectService.createActivity(body, aulaProject).subscribe({
      next: () => {
        this._form.reset();
      },
    });
  }

  public listActivities(id: number): void {
    this.aulaProjectService.listActivities(id).subscribe({
      next: (activities) => {
        this._activities = activities;
      },
    });
  }
}
