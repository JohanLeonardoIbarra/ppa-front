export interface User {
  cedula: string;
  nombre: string;
  apellido: string;
  numero_telefono: string;
  correo_electronico: string;
  password: string;
}

export interface Login {
  correo_electronico: string;
  password: string;
}

export interface Token {
  token: string;
}
