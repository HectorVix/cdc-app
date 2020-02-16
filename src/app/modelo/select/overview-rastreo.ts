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
    { value: 'true', viewValue: 'Sí' },
    { value: 'false', viewValue: 'No' }
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
  tropico: Valor[] = [
    { value: 'C', viewValue: 'Cáncer' },
    { value: 'CP', viewValue: 'Capricornio' },

  ];
  reino: Valor[] = [
    { value: 'A', viewValue: 'Animalia' },
    { value: 'B', viewValue: 'Bacteria' },
    { value: 'Ch', viewValue: 'Chromista' },
    { value: 'F', viewValue: 'Fungi' },
    { value: 'I', viewValue: 'incertae sedis' },
    { value: 'PL', viewValue: 'Plantae' },
    { value: 'PR', viewValue: 'Protozoa' },
  ];
  phylum: Valor[] = [
    { value: 'C', viewValue: 'Cáncer' },
    { value: 'CP', viewValue: 'Capricornio' },

  ];
  ln_Nacion: Valor[] = [];
  ls_Subnacion: Valor[] = [];
}
