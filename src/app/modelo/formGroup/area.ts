import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { area_Modelo } from '../../modelo/area/area-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
// import { retryWhen } from 'rxjs/operators';
export class area_FormGroup {
    constructor() { }
    getAreaFormGrup(row: area_Modelo): FormGroup {
        if (row.multisubnac == undefined)
            row.multisubnac = null;
        if (row.limites == undefined)
            row.limites = null;
        if (row.continua == undefined)
            row.continua = null;
        if (row.involtnc == undefined)
            row.involtnc = null;
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        /**
         * Los ♦ representan los mat-select el resto salvo localizacionId se valida su tamaño  
         */
        return fb.group({
            'areaId': row.areaId,
            //página1
            //identificadores
            'codigoam': new FormControl(row.codigoam, Validators.maxLength(10)),
            'nombream': new FormControl(row.nombream, Validators.maxLength(10)),
            'sinam': new FormControl(row.sinam, Validators.maxLength(10)),
            'ammayor': new FormControl(row.ammayor, Validators.maxLength(10)),
            'coddueno': new FormControl(row.coddueno, Validators.maxLength(10)),
            'codsitio': new FormControl(row.codsitio, Validators.maxLength(10)),
            'nomsitio': new FormControl(row.nomsitio, Validators.maxLength(10)),
            //localizadores
            'nacion': new FormControl(row.nacion, Validators.maxLength(10)),
            'subnacion': new FormControl(row.subnacion, Validators.maxLength(10)),
            'subdivision': new FormControl(row.subdivision, Validators.maxLength(10)),
            'nommapa': new FormControl(row.nommapa, Validators.maxLength(10)),
            'codmapa': new FormControl(row.codmapa, Validators.maxLength(10)),
            'nummarg': new FormControl(row.nummarg, Validators.maxLength(10)),
            'lat': new FormControl(row.lat, Validators.maxLength(10)),
            'long1': new FormControl(row.long1, Validators.maxLength(10)),//palabra reservada en Java (long)
            'coords': new FormControl(row.coords, Validators.maxLength(10)),
            'coordn': new FormControl(row.coordn, Validators.maxLength(10)),
            'coorde': new FormControl(row.coorde, Validators.maxLength(10)),
            'coordo': new FormControl(row.coordo, Validators.maxLength(10)),
            //decriptores
            'descripcion': new FormControl(row.descripcion, Validators.maxLength(10)),
            'areatot1': row.areatot1, //number
            'areatot2': row.areatot2, //number
            'areasubnac1': row.areasubnac1,//number
            'areasubnac2': row.areasubnac2,//number
            'multisubnac': row.multisubnac, //boolean ♦
            'limites': row.limites,//boolean ♦
            'continua': row.continua,//boolean ♦
            'involtnc': row.involtnc, //boolean ♦
            'comentario': new FormControl(row.comentario, Validators.maxLength(10)),
            //status
            'fechaesta': fechaServicio.getFecha(row.fechaesta),
            'protasign': row.protasign, //varchar(1) ♦
            /**
             * Página 2 
             * Manejo
             */
            'administrador': new FormControl(row.administrador, Validators.maxLength(10)),
            'instadmin': new FormControl(row.instadmin, Validators.maxLength(10)),
            'diradmin1': new FormControl(row.diradmin1, Validators.maxLength(10)),
            'diradmin2': new FormControl(row.diradmin2, Validators.maxLength(10)),
            'ciudadadmin': new FormControl(row.ciudadadmin, Validators.maxLength(10)),
            'subnacadmin': new FormControl(row.subnacadmin, Validators.maxLength(10)),
            'codpostaladmin': new FormControl(row.codpostaladmin, Validators.maxLength(10)),
            'telefadminist': new FormControl(row.telefadminist, Validators.maxLength(10)),
            'accesopub': row.accesopub, //varchar(1) ♦
            'instcoop': new FormControl(row.instcoop, Validators.maxLength(10)),
            'commanejo': new FormControl(row.commanejo, Validators.maxLength(10)),
            //elementos               
            //campos opcionales
            'amopc1': new FormControl(row.amopc1, Validators.maxLength(10)),
            'amopc2': new FormControl(row.amopc2, Validators.maxLength(10)),
            'amopc3': new FormControl(row.amopc3, Validators.maxLength(10)),
            'amopc4': new FormControl(row.amopc4, Validators.maxLength(10)),
            'amopc5': new FormControl(row.amopc5, Validators.maxLength(10)),
            //mantenimiento del registro
            'respdatos': new FormControl(row.respdatos, Validators.maxLength(10)),
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }
}