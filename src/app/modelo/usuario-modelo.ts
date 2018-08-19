export class UsuarioModelo {
    usuarioId:       Number;
    nombre:          String;
    apellido:        String;
    usuario:         String;
    sexo:            String;
    fechaNacimiento: Date;
    email:           String;
    contrasena:      String;
    accionList =null;
    fuenteList=null;
    elementoList=null;
    contactosList=null;
    rolrolid :       Rol;

}

export class Rol {
    rolId :      number;
    nombre:      string;
    usuarioList= null;

}
