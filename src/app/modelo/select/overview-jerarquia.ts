import {Valor} from '../../modelo/select/overwiew-valor';
export class criterio_Jerarquizacion {
  lgn_lestim: Valor[] = [
    {value: 'A', viewValue: '0 - 5 localizaciones conocidas'},
    {value: 'B', viewValue: '6 - 20 localizaciones conocidas'},
    {value: 'C', viewValue: '21 - 100 localizaciones conocidas'},
    {value: 'D', viewValue: '100 o más localizaciones conocidas'}
  ];
  lgn_abund: Valor[] = [
    {value: 'A', viewValue: '< 1000 individuos (PE Y AE), 1000 hectáreas (CN), 30 Km a lo largo de un río (CN)'},
    {value: 'B', viewValue: '6 - 20 localizaciones conocidas'},
    {value: 'C', viewValue: '21 - 100 localizaciones conocidas'},
    {value: 'D', viewValue: '100 o más localizaciones conocidas'}
  ];
  lg_dist: Valor[] = [
    {value: 'A', viewValue: 'Endémica de un país, departamento grande o región; una área < 260 km²'},
    {value: 'B', viewValue: 'Edémica regional; una área de 260 - 26,000 km²'},
    {value: 'C', viewValue: 'Moderadamente ampia pero dispersa; una área de 26,000 - 2,600,000 km'},
    {value: 'D', viewValue: 'Amplia; una área > 2,600,000 km²'}
  ];
  ln_dist: Valor[] = [
    {value: 'A', viewValue: 'Muy limitada; porcentaje de territorio nacional < 3%'},
    {value: 'B', viewValue: 'Limitada; porcentaje de territorio nacional 3 - 10%'},
    {value: 'C', viewValue: 'Moderadamente amplia; porcentaje de territorio nacional 10 - 50%'},
    {value: 'D', viewValue: 'Amplia; porcentaje de territorio nacional > 50%'}
  ];
  lgn_leprot: Valor[] = [
    {value: 'A', viewValue: 'Ninguna LE protegida (hasta dónde se conoce)'},
    {value: 'B', viewValue: 'Por lo menos una LE protegida'},
    {value: 'C', viewValue: 'Varias LE protegidas'},
    {value: 'D', viewValue: 'Muchas LE protegidas'},
    {value: 'I', viewValue: 'Se ignora'}
  ];
  lgn_amenaz: Valor[] = [
    {value: 'A', viewValue: 'Muy amenazado: El elemento es directamente explotado o amenazado por causas naturalez o por el hombre'},
    {value: 'B', viewValue: 'Moderadamente amenazado: El habitat o comunidad se presta para usos alternos que amenazan al elemento'},
    {value: 'C', viewValue: 'Ligeramente amenazado: El habitat o comunidad se protege ya que no se presta para usos que amenazan al elemento'},
    {value: 'D', viewValue: 'Sin amenaza'}
  ];
  lg_fragil: Valor[] = [
    {value: 'A', viewValue: 'Muy frágil (murciélago en cueva de maternidad)'},
    {value: 'B', viewValue: 'Frágil (Felis spp.)'},
    {value: 'C', viewValue: 'Bastante resistente (perezoso de tres dedos)'},
    {value: 'D', viewValue: 'Resistente (algunas ardillas)'}

  ];
  lg_rango: Valor[] = [
    {value: 'G1', viewValue: 'G1'},
    {value: 'G2', viewValue: 'G2'},
    {value: 'G3', viewValue: 'G3'},
    {value: 'G4', viewValue: 'G4'},
    {value: 'G5', viewValue: 'G5'},
    {value: 'GU', viewValue: 'GU'},
    {value: 'GH', viewValue: 'GH'},
    {value: 'GX', viewValue: 'GX'}
   
  ];
  ln_rango: Valor[] = [
    {value: 'N1', viewValue: 'G1'},
    {value: 'N2', viewValue: 'N2'},
    {value: 'N3', viewValue: 'N3'},
    {value: 'N4', viewValue: 'N4'},
    {value: 'N5', viewValue: 'N5'},
    {value: 'NA', viewValue: 'NA'},
    {value: 'NE', viewValue: 'NE'},
    {value: 'NH', viewValue: 'NH'},
    {value: 'NN', viewValue: 'NN'},
    {value: 'NR', viewValue: 'NR'},
    {value: 'NRF', viewValue: 'NRF'},
    {value: 'NU', viewValue: 'NU'},
    {value: 'NX', viewValue: 'NX'}
  ];
}




   