export interface AulaProject {
  id?: number;
  nombre: string;
  id_eje_transversal: number;
  tipo_eje: number;
  fecha_inicio: string;
  fecha_fin: string;
  docente_lider: number;
  grado: number;
  cierre: string;
}

export interface Grade {
  id?: number;
  titular: string;
  descripcion: string;
}

export interface ActivityAP {
  id?: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  cumplimiento: string;
  observacion: string;
}

export interface ActivityAPCreation {
  actividadPA: ActivityAP;
  estudiantes: number[];
}
