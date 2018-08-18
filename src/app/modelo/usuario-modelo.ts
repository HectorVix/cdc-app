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
    constructor (){
        this.usuarioId=-1;
        this.nombre='';
        this.apellido='';
        this.usuario='';
        this.sexo='';
        this.fechaNacimiento=null;
        this.email='';
        this.contrasena='';
    }
}

export class Rol {
    rolId :      number;
    nombre:      string;
    usuarioList= null;
    constructor (){
        this.rolId=-1;
        this.nombre='';
    }

}
