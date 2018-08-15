export class UsuarioModelo {
    usuarioId:       Number;
    nombre:          String;
    apellido:        String;
    usuario:         String;
    sexo:            String;
    fechaNacimiento: Date;
    email:           String;
    contrasena:      String;
    rolrolid :       Rol;
}

export class Rol {
    rolId :      number;
    nombre:      string;
    usuarioList= null;

}
