import { Component } from '@angular/core';
import { AulaProject } from 'src/app/interfaces/aulaProject.interface';
import { AulaProjectsService } from 'src/app/services/aula-projects.service';

@Component({
  selector: 'app-aula-projects',
  templateUrl: './aula-projects.component.html',
  styleUrls: ['./aula-projects.component.css'],
})
export class AulaProjectsComponent {
  private _aulaProjects: AulaProject[];

  public constructor(private aulaProjectsService: AulaProjectsService) {
    this._aulaProjects = [];
  }

  ngOnInit() {
    this.aulaProjectsService.list().subscribe({
      next: (aulaProjectsList) => (this._aulaProjects = aulaProjectsList),
    });
  }

  get aulaProjects(): AulaProject[] {
    return this._aulaProjects.filter((x, y) => y < 4)
  }
}
