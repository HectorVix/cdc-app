import { Valor } from '../../modelo/select/overwiew-valor';
import { JerarquizacionService } from '../../servicios/jerarquizacion/jerarquizacion.service';

export class criterio_Jerarquizacion {
  lgn_lestim: Valor[] = [
    { value: 'A', viewValue: '0 - 5 Localizaciones conocidas' },
    { value: 'B', viewValue: '6 - 20 Localizaciones conocidas' },
    { value: 'C', viewValue: '21 - 100 Localizaciones conocidas' },
    { value: 'D', viewValue: '100 o más Localizaciones conocidas' }
  ];
  lgn_abund: Valor[] = [
    { value: 'A', viewValue: '< 1000 Individuos (PE Y AE), 1000 hectáreas (CN), 30 Km a lo largo de un río (CN)' },
    { value: 'B', viewValue: '6 - 20 Localizaciones conocidas' },
    { value: 'C', viewValue: '21 - 100 Localizaciones conocidas' },
    { value: 'D', viewValue: '100 o más Localizaciones conocidas' }
  ];
  lg_dist: Valor[] = [
    { value: 'A', viewValue: 'Endémica de un país, departamento grande o región; una área < 260 km²' },
    { value: 'B', viewValue: 'Edémica regional; un área de 260 - 26,000 km²' },
    { value: 'C', viewValue: 'Moderadamente amplia pero dispersa; un área de 26,000 - 2,600,000 km²' },
    { value: 'D', viewValue: 'Amplia; un área > 2,600,000 km²' }
  ];
  ln_dist: Valor[] = [
    { value: 'A', viewValue: 'Muy limitada; porcentaje de territorio nacional < 3%' },
    { value: 'B', viewValue: 'Limitada; porcentaje de territorio nacional 3 - 10%' },
    { value: 'C', viewValue: 'Moderadamente amplia; porcentaje de territorio nacional 10 - 50%' },
    { value: 'D', viewValue: 'Amplia; porcentaje de territorio nacional > 50%' }
  ];
  lgn_leprot: Valor[] = [
    { value: 'A', viewValue: 'Ninguna LE protegida (hasta dónde se conoce)' },
    { value: 'B', viewValue: 'Por lo menos una LE protegida' },
    { value: 'C', viewValue: 'Varias LE protegidas' },
    { value: 'D', viewValue: 'Muchas LE protegidas' },
    { value: 'I', viewValue: 'Se ignora' }
  ];
  lgn_amenaz: Valor[] = [
    { value: 'A', viewValue: 'Muy amenazado: El elemento es directamente explotado o amenazado por causas naturalez o por el hombre' },
    { value: 'B', viewValue: 'Moderadamente amenazado: El habitat o comunidad se presta para usos alternos que amenazan al elemento' },
    { value: 'C', viewValue: 'Ligeramente amenazado: El habitat o comunidad se protege ya que no se presta para usos que amenazan al elemento' },
    { value: 'D', viewValue: 'Sin amenaza' }
  ];
  lg_fragil: Valor[] = [
    { value: 'A', viewValue: 'Muy frágil (murciélago en cueva de maternidad)' },
    { value: 'B', viewValue: 'Frágil (Felis spp.)' },
    { value: 'C', viewValue: 'Bastante resistente (perezoso de tres dedos)' },
    { value: 'D', viewValue: 'Resistente (algunas ardillas)' }

  ];
  //Catalogos
  lg_rango: Valor[] = [];
  ln_rango: Valor[] = [];
  ls_rango: Valor[] = [];

  //ln_Nacion: Valor[] = [];
  ls_Subnacion: Valor[] = [];
  ls_Municipio: Valor[] = [];

}