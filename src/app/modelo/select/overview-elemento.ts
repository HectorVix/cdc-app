import { Valor } from '../../modelo/select/overwiew-valor';
import { JwtHelperService } from '@auth0/angular-jwt';
export class criterio_elemento {
    clase: Valor[] = [
        { value: 'A', viewValue: 'Animal' },
        { value: 'P', viewValue: 'Planta' },
        { value: 'C', viewValue: 'Comunidad' },
        { value: 'L', viewValue: 'Lugares' },
        { value: 'O', viewValue: 'Otros' },
        { value: 'M', viewValue: 'Misceláneos' }
    ];
    tipo_comunidad: Valor[] = [
        { value: 'M', viewValue: 'Marinas' },
        { value: 'L', viewValue: 'Lacustrinas' },
        { value: 'R', viewValue: 'Riparias' },
        { value: 'P', viewValue: 'Palustrina' },
        { value: 'T', viewValue: 'Terrestres' },
        { value: 'S', viewValue: 'Subterráneas' }
    ];
    constructor() {
        this.filtrar_Area();
    }

    filtrar_Area() {
        var jwthelper = new JwtHelperService();
        var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
        switch (decodedToken.sub) {
            case "Botanica":
                this.clase = this.clase.filter((val) => val.value !== 'A');
                break;
            case "Zoologia":
                this.clase = this.clase.filter((val) => val.value !== 'P');
                break;
            default:
                break;
        }
    }
}