import { Valor } from '../../modelo/select/overwiew-valor';

export class criterio_re {
  disttax: Valor[] = [
    { value: 'A', viewValue: 'Genero o familia monotípica' },
    { value: 'B', viewValue: 'Genero pequeño (2-5 especies)' },
    { value: 'C', viewValue: 'Genero intermedio (6-20 especies)' },
    { value: 'D', viewValue: 'Genero grande (21+ especies)' }
  ];

  dudatax: Valor[] = [
    { value: 'A', viewValue: 'Indudablemente una especie válida' },
    { value: 'B', viewValue: 'Posiblemente no válida como especie pero si como subespecie' },
    { value: 'C', viewValue: 'Probablemente no sea diferente a ningún nivel taxonómico' }
  ];

  rangog: Valor[] = [
    { value: 'G1', viewValue: 'G1' },
    { value: 'G2', viewValue: 'G2' },
    { value: 'G3', viewValue: 'G3' },
    { value: 'G4', viewValue: 'G4' },
    { value: 'G5', viewValue: 'G5' },
    { value: 'GU', viewValue: 'GU' },
    { value: 'GH', viewValue: 'GH' },
    { value: 'GX', viewValue: 'GX' }
  ];
  rangon: Valor[] = [
    { value: 'N1', viewValue: 'N1' },
    { value: 'N2', viewValue: 'N2' },
    { value: 'N3', viewValue: 'N3' },
    { value: 'N4', viewValue: 'N4' },
    { value: 'N5', viewValue: 'N5' },
    { value: 'NA', viewValue: 'NA' },
    { value: 'NE', viewValue: 'NE' },
    { value: 'NH', viewValue: 'NH' },
    { value: 'NN', viewValue: 'NN' },
    { value: 'NR', viewValue: 'NR' },
    { value: 'NRF', viewValue: 'NRF' },
    { value: 'NU', viewValue: 'NU' },
    { value: 'NX', viewValue: 'NX' }
  ];
  compu_manual: Valor[] = [
    { value: 'C', viewValue: 'Computarizado' },
    { value: 'M', viewValue: 'Manual' }
  ];
  cites: Valor[] = [
    { value: '1', viewValue: 'Apéndice I' },
    { value: '2', viewValue: 'Apéndice II' },
    { value: '3', viewValue: 'Apéndice III' }
  ];
  iucn: Valor[] = [
    { value: 'EX', viewValue: 'En peligro' },
    { value: 'V', viewValue: 'Vulnerable' },
    { value: 'R', viewValue: 'Rara' },
    { value: 'I', viewValue: 'Indeterminada' },
    { value: 'K', viewValue: 'Insuficientemente conocida' },
    { value: 'O', viewValue: 'Fuera de peligro' },
    { value: 'NT', viewValue: 'No está en peligro (endémicas)' }
  ];
  si_no: Valor[] = [
    { value: '1', viewValue: 'Sí' },
    { value: '0', viewValue: 'No' }
  ];
  endemismo: Valor[] = [
    { value: 'S', viewValue: 'Endémico a jurisdicción CDC sub-nacional' },
    { value: 'N', viewValue: 'Endémico nacional' },
    { value: 'M', viewValue: 'multinacional,no edémico' }
  ];
  listacdc: Valor[] = [
    { value: 'S', viewValue: 'SÍ' },
    { value: 'P', viewValue: 'Propuesta para la lista pero no está siendo activamente inventariado' },
    { value: 'N', viewValue: 'No está siendo activamente inventariado, no concierne, locamente abundante, exótica, etc.' }
  ];
}
