import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { sitio_Modelo } from '../../modelo/sitio/sitio-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class sitio_FormGroup {
    constructor() { }
    getSitioFormGrup(row: sitio_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        /**
         * Los ♦ representan los mat-select el resto salvo localizacionId se valida su tamaño  
         */
        return fb.group({
            'sitioId': row.sitioId,
            //página1
            //identificadores
            'codsitio': new FormControl(row.codsitio, [Validators.maxLength(10), Validators.required]),
            'nomsitio': new FormControl(row.nomsitio, Validators.maxLength(60)),
            'sinsitio': new FormControl(row.sinsitio, Validators.maxLength(120)),
            //localizadores
            'nacion': new FormControl(row.nacion, Validators.maxLength(60)),
            'subnacion': new FormControl(row.subnacion, Validators.maxLength(60)),
            'siteresp': new FormControl(row.siteresp, Validators.maxLength(60)),
            'lat': new FormControl(row.lat, Validators.maxLength(10)),
            'long1': new FormControl(row.long1, Validators.maxLength(10)),//palabra reservada en Java
            'coords': new FormControl(row.coords, Validators.maxLength(10)),
            'coordn': new FormControl(row.coordn, Validators.maxLength(10)),
            'coorde': new FormControl(row.coorde, Validators.maxLength(10)),
            'coordo': new FormControl(row.coordo, Validators.maxLength(10)),
            'direccion': new FormControl(row.direccion, Validators.maxLength(120)),
            //descripción del sitio/diseño
            'descrito': new FormControl(row.descrito, Validators.maxLength(120)),
            'mapasitio': row.mapasitio,//♦
            'fechamapa': fechaServicio.getFecha(row.fechamapa),
            'dibujante': new FormControl(row.dibujante, Validators.maxLength(60)),
            'justlimite': new FormControl(row.justlimite, Validators.maxLength(120)),
            'areaprisec1': row.areaprisec1,//Number
            'areaprisec2': row.areaprisec2,//Number
            'areapri1': row.areapri1,//Number
            'areapri2': row.areapri2,//Number
            'areatotal1': row.areatotal1,//Number
            'areatotal2': row.areatotal2,//Number
            'comsitio': new FormControl(row.comsitio, Validators.maxLength(120)),
            /**
             * Página 2
             * Importancia del sitio 
             */
            'rangoant': row.rangoant,//♦
            'comrango': new FormControl(row.comrango, Validators.maxLength(120)),
            'impdivbiol': row.impdivbiol,//♦
            'comdivbiol': new FormControl(row.comdivbiol, Validators.maxLength(120)),
            'impnodivbiol': row.impnodivbiol,//♦
            'comnodivbiol': new FormControl(row.comnodivbiol, Validators.maxLength(120)),
            'urgencia': row.urgencia,//♦
            'comurgencia': new FormControl(row.comurgencia, Validators.maxLength(120)),
            //bienes raíces y protección
            'intenccons': new FormControl(row.intenccons, Validators.maxLength(120)),
            'numlotes': row.numlotes,//Number
            'costestprot1': row.costestprot1,//Number
            'costestprot2': row.costestprot2,//Number
            'coddesig': new FormControl(row.coddesig, Validators.maxLength(10)),
            'designacion': new FormControl(row.designacion, Validators.maxLength(10)),
            'comprot': new FormControl(row.comprot, Validators.maxLength(120)),
            //administración
            'comusotierra': new FormControl(row.comusotierra, Validators.maxLength(120)),
            'compeligrnat': new FormControl(row.compeligrnat, Validators.maxLength(120)),
            'comexoticas': new FormControl(row.comexoticas, Validators.maxLength(120)),
            'usotierraf': new FormControl(row.usotierraf, Validators.maxLength(120)),
            'necinform': new FormControl(row.necinform, Validators.maxLength(120)),
            'necmanejo': new FormControl(row.necmanejo, Validators.maxLength(120)),
            'comam': new FormControl(row.comam, Validators.maxLength(120)),
            //campos opcionales
            'rbsopc1': new FormControl(row.rbsopc1, Validators.maxLength(60)),
            'rbsopc2': new FormControl(row.rbsopc2, Validators.maxLength(60)),
            'rbsopc3': new FormControl(row.rbsopc3, Validators.maxLength(60)),
            'rbsopc4': new FormControl(row.rbsopc4, Validators.maxLength(60)),
            'rbsopc5': new FormControl(row.rbsopc5, Validators.maxLength(120)),
            //mantenimiento del registro
            'respdatos': new FormControl(row.respdatos, Validators.maxLength(10)),
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }
}