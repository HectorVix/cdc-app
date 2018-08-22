export interface Jerarquia {
  value: string;
  viewValue: string;
}

export class criterio_Jerarquizacion {
  lgn_lestim: Jerarquia[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
}