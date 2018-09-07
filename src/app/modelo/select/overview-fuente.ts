 import {Valor} from '../../modelo/select/overwiew-valor';

  export class  criterio_ResumenesFuente {
    codfuente: Valor[] = [
      {value: 'A', viewValue: 'Articulo'},
      {value: 'C', viewValue: 'Trabajo de campo'},
      {value: 'F', viewValue: 'Fotos o ilustraciones'},
      {value: 'I', viewValue: 'Inédito'},
      {value: 'L', viewValue: 'Libro'},
      {value: 'M', viewValue: 'Mapas e imágenes'},
      {value: 'O', viewValue: 'Organizaciones'},
      {value: 'P', viewValue: 'Comunicaciones personales'},
      {value: 'R', viewValue: 'Revistas, periódicos y publicaciones'}
    ];

    publicacion_cdc: Valor[] = [
        {value: '1', viewValue: 'Sí'},
        {value: '0', viewValue: 'No'}
      ];

      valor: Valor[] = [
        {value: '1', viewValue: 'Documentos para LE, AM'},
        {value: '2', viewValue: 'Documentos para JE,RE y RCP RCV'},
        {value: '3', viewValue: 'Documentos sin datos'}

      ];
}