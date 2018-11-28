export class foto_Modelo {
    descripcion: String;
    comentario: String;
    autor: String;
    fecha: Date;
    foto_Modelo() {
        this.descripcion = '';
        this.comentario = '';
        this.autor = '';
        this.fecha = new Date();
    }
}