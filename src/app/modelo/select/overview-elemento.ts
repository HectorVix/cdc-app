import { Valor } from '../../modelo/select/overwiew-valor';
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
}