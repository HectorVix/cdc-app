import { Valor } from '../../modelo/select/overwiew-valor';
export class criterio_areasManejadas {
    protasign: Valor[] = [
        { value: '1', viewValue: 'Protegido' },
        { value: '2', viewValue: 'Semiprotegido' },
        { value: '3', viewValue: 'Desprotegido' }
    ];
    accesopub: Valor[] = [
        { value: 'C', viewValue: 'Cerrado' },
        { value: 'A', viewValue: 'Abierto' },
        { value: 'R', viewValue: 'Restringido' }

    ];
    status: Valor[] = [
        { value: 'P', viewValue: 'Probablemente está presente.' },
        { value: 'S', viewValue: 'Presente todo el año y se reproduce' },
        { value: 'R', viewValue: 'Presente temporal, en época de reproducción' },
        { value: 'T', viewValue: 'Presente como un elemento transitorio, no reproductivo' },
        { value: '?', viewValue: 'No hay información disponible sobre su presencia o ausencia' }

    ];
    si_no: Valor[] = [
        { value: '1', viewValue: 'Sí' },
        { value: '0', viewValue: 'No' }
    ];
}