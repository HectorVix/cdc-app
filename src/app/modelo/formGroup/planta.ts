import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { planta_Modelo } from '../../modelo/resumen/planta-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class planta_FormGroup {
    constructor() { }
    getPlantaFormGrup(row: planta_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'plantaId': row.plantaId,
            //identificadores
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10), Validators.required]),
            'nacion': new FormControl(row.nacion, Validators.maxLength(60)),
            'nombren': new FormControl(row.nombren, Validators.maxLength(60)),
            'nomcomunn': new FormControl(row.nomcomunn, Validators.maxLength(60)),
            //taxonomía
            'comsubespn': new FormControl(row.comsubespn, Validators.maxLength(120)),
            'taxasimiln': new FormControl(row.taxasimiln, Validators.maxLength(120)),
            'comidentn': new FormControl(row.comidentn, Validators.maxLength(120)),
            'comtaxn': new FormControl(row.comtaxn, Validators.maxLength(120)),
            //status
            'rangog': new FormControl(row.rangog, Validators.maxLength(6)),
            'rangon': new FormControl(row.rangon, Validators.maxLength(6)),
            'aepeu': new FormControl(row.aepeu, Validators.maxLength(10)),
            'cites': new FormControl(row.cites, Validators.maxLength(3)),
            'uicn': new FormControl(row.uicn, Validators.maxLength(2)),
            'rastreolen': new FormControl(row.rastreolen, Validators.maxLength(10)),
            'protnacion': new FormControl(row.protnacion, Validators.maxLength(4)),
            'malezan': new FormControl(row.clasifinstn, Validators.maxLength(60)),
            'clasifinstn': new FormControl(row.clasifinstn, Validators.maxLength(60)),
            'comstatn': new FormControl(row.comstatn, Validators.maxLength(120)),
            //inventario
            'priinventn': new FormControl(row.priinventn, Validators.maxLength(10)),
            'necinventn': new FormControl(row.necinventn, Validators.maxLength(120)),
            'cominventn': new FormControl(row.cominventn, Validators.maxLength(120)),
            'respropn': new FormControl(row.respropn, Validators.maxLength(10)),
            //ditribucion
            'elevminn': row.elevminn, //number
            'elevmaxn': row.elevmaxn, //number
            'disyuntn': new FormControl(row.disyuntn, Validators.maxLength(10)),
            'periferican': new FormControl(row.periferican, Validators.maxLength(10)),
            'comdistn': new FormControl(row.comdistn, Validators.maxLength(120)),
            //habitat
            'marinon': new FormControl(row.marinon, Validators.maxLength(10)),
            'estuarinon': new FormControl(row.estuarinon, Validators.maxLength(10)),
            'fluvialn': new FormControl(row.fluvialn, Validators.maxLength(10)),
            'lacustren': new FormControl(row.lacustren, Validators.maxLength(10)),
            'palustren': new FormControl(row.palustren, Validators.maxLength(10)),
            'terrestren': new FormControl(row.terrestren, Validators.maxLength(10)),
            'comhabn': new FormControl(row.comhabn, Validators.maxLength(120)),
            //ecología
            'comecoln': new FormControl(row.comecoln, Validators.maxLength(120)),
            
            'comfenoln': new FormControl(row.comfenoln, Validators.maxLength(120)),
            //reproducción
            'comrepn': new FormControl(row.comrepn, Validators.maxLength(120)),
            //manejo
            'commanejon': new FormControl(row.commanejon, Validators.maxLength(120)),
            //campos opcionales
            'rcpnopc1': new FormControl(row.rcpnopc1, Validators.maxLength(60)),
            'rcpnopc2': new FormControl(row.rcpnopc2, Validators.maxLength(60)),
            'rcpnopc3': new FormControl(row.rcpnopc3, Validators.maxLength(60)),
            'rcpnopc4': new FormControl(row.rcpnopc4, Validators.maxLength(60)),
            'rcpnopc5': new FormControl(row.rcpnopc5, Validators.maxLength(120)),
            //mantenimiento del registro
            'codfuente': new FormControl(row.codfuente, Validators.maxLength(99)),
            'cita': new FormControl(row.cita, Validators.maxLength(1)),//representativo
            'transparen': new FormControl(row.transparen, Validators.maxLength(10)),
            'refg': new FormControl(row.refg, Validators.maxLength(120)),
            'refn': new FormControl(row.refn, Validators.maxLength(120)),
            'edicionn': fechaServicio.get_Fecha(row.edicionn), //date
            'autoredn': new FormControl(row.autoredn, Validators.maxLength(10)),
            'actualizan': fechaServicio.get_Fecha(row.actualizan), //date
        });
    }
}