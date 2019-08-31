import { Valor } from '../../modelo/select/overwiew-valor';
export class criterio_le {
  si_no: Valor[] = [
    { value: 'true', viewValue: 'Sí' },
    { value: 'false', viewValue: 'No' }
  ];
  rango_le: Valor[] = [
    { value: 'A', viewValue: 'Excelente' },
    { value: 'B', viewValue: 'Buena' },
    { value: 'C', viewValue: 'Marginal' },
    { value: 'D', viewValue: 'Pobre' },
    { value: 'X', viewValue: 'Destruida' }
  ];
  nacion: Valor[] = [];
  subnacion: Valor[] = [];
  municipio: Valor[] = [];
}

