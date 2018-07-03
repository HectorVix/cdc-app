export class UsuarioModelo {
usuarioId:number;    
nombre: string;
apellido: string;
usuario: string;
sexo: string;
fechaNacimiento:Date;    
email: string;
contrasena: string;
rolrolid : Rol;
}

export class Rol {
    rolId :number;
    nombre: string;
    usuarioList=null;

}
