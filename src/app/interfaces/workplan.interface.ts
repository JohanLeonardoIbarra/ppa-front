export interface WorkPlan {
  id?: number;
  anio: number;
  id_eje_transversal: number;
  actividad_pt?: number;
  cierre?: string;
}

export interface ActivityPT {
  id?: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  docente_apoyo: number;
  cumplimiento: number;
  observacion: string;
}
