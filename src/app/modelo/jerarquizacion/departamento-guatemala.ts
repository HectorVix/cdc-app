export class departamento_Guatemala {
    subnacion: String;
    departamentoGuatemala(val): void {
        switch (val) {
            case "1": { this.subnacion = 'Guatemala'; } break;
            case "2": { this.subnacion = 'El Progreso'; } break;
            case "3": { this.subnacion = 'Sacatepequez'; } break;
            case "4": { this.subnacion = 'Chimaltenango'; } break;
            case "5": { this.subnacion = 'Escuintla'; } break;
            case "6": { this.subnacion = 'Santa Rosa'; } break;
            case "7": { this.subnacion = 'Solola'; } break;
            case "8": { this.subnacion = 'Totonicapan'; } break;
            case "9": { this.subnacion = 'Quetzaltenango'; } break;
            case "10": { this.subnacion = 'Suchitepequez'; } break;
            case "11": { this.subnacion = 'Retalhuleu'; } break;
            case "12": { this.subnacion = 'San Marcos'; } break;
            case "13": { this.subnacion = 'Huehuetenango'; } break;
            case "14": { this.subnacion = 'El Quiche'; } break;
            case "15": { this.subnacion = 'Baja Verapaz'; } break;
            case "16": { this.subnacion = 'Alta Verapaz'; } break;
            case "17": { this.subnacion = 'El Peten'; } break;
            case "18": { this.subnacion = 'Izabal'; } break;
            case "19": { this.subnacion = 'Zacapa'; } break;
            case "20": { this.subnacion = 'Chiquimula'; } break;
            case "21": { this.subnacion = 'Jalapa'; } break;
            case "22": { this.subnacion = 'Jutiapa'; } break;
        }
    }
    get valor_DepartamentoGuatemala() { return this.subnacion; }
}