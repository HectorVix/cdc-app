export class documento_Naturaleza {
    valor: String;
    naturaleza_Documento(val: String): void {
        switch (val) {
            case "A":
                this.valor = "Articulo";
                break;
            case "C":
                this.valor = "Trabajo de campo";
                break;
            case "F":
                this.valor = "Fotos o ilustraciones";
                break;
            case "I":
                this.valor = "Inédito";
                break;
            case "L":
                this.valor = "Libro";
                break;
            case "M":
                this.valor = "Mapas e imágene";
                break;
            case "O":
                this.valor = "Organizaciones";
                break;
            case "P":
                this.valor = "Comunicaciones personales";
                break;
            case "R":
                this.valor = "Revistas, periódicos y publicaciones";
                break;
            default:
                this.valor = "";
                break;
        }
    }
    get valor_NaturalezaDocumento() { return this.valor };
}