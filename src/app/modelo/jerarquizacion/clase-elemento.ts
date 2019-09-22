export class clase_Elemento {
    clase_elemento: String;
    clase_Nombre(val): void {
        switch (val) {
            case "A": { this.clase_elemento = 'Animal'; } break;
            case "P": { this.clase_elemento = 'Planta'; } break;
            case "C": { this.clase_elemento = 'Comunidad'; } break;
            case "L": { this.clase_elemento = 'Lugares'; } break;
            case "O": { this.clase_elemento = 'Otros'; } break;
            case "M": { this.clase_elemento = 'Misceláneos'; } break;
        }
    }
    get valor_Clase() { return this.clase_elemento; }

}