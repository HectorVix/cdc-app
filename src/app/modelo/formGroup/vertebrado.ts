import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { vertebrado_Modelo } from '../../modelo/resumen/vertebrado-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class vertebrado_FormGroup {
    constructor() { }
    getVertebradoFormGrup(row: vertebrado_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'vertebradoId': row.vertebradoId,
            //identificadores
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10), Validators.required]),
            'nacion': new FormControl(row.nacion, Validators.maxLength(60)),
            'nombreg': new FormControl(row.nombreg, Validators.maxLength(60)),
            'autor': new FormControl(row.autor, Validators.maxLength(60)),
            'nombren': new FormControl(row.nombren, Validators.maxLength(60)),
            'nomcomunn': new FormControl(row.nomcomunn, Validators.maxLength(60)),
            //taxonomía
            'clasetax': new FormControl(row.clasetax, Validators.maxLength(60)),
            'orden': new FormControl(row.orden, Validators.maxLength(60)),
            'familia': new FormControl(row.familia, Validators.maxLength(60)),
            'genero': new FormControl(row.genero, Validators.maxLength(60)),
            'comtaxg': new FormControl(row.comtaxg, Validators.maxLength(120)),
            'comsubespn': new FormControl(row.comsubespn, Validators.maxLength(120)),
            //status
            'rangog': new FormControl({ value: row.rangog, disabled: true }), //representativo
            'cites': new FormControl({ value: row.cites, disabled: true }),//representativo
            'uicn': new FormControl({ value: row.uicn, disabled: true }),//representativo
            'aepeu': new FormControl({ value: row.aepeu, disabled: true }),//representativo
            'fechaaepeu': new FormControl({ value: fechaServicio.get_Fecha(row.fechaaepeu), disabled: true }),//date representativo 
            'endemismo': new FormControl({ value: row.endemismo, disabled: true }),//representativo
            'comstatg': new FormControl(row.comstatg, Validators.maxLength(120)),
            'rangon': new FormControl({ value: row.rangon, disabled: true }),//representativo
            'protnacion': new FormControl({ value: row.protnacion, disabled: true }),//representativo
            'rastreolen': new FormControl({ value: row.rastreolen, disabled: true }),//representativo
            'espdeportn': new FormControl(row.espdeportn, Validators.maxLength(10)),
            'espcomern': new FormControl(row.espcomern, Validators.maxLength(10)),
            'pezdeport': new FormControl(row.pezdeport, Validators.maxLength(10)),
            'ndeportpro': new FormControl(row.ndeportpro, Validators.maxLength(10)),
            'cazapieln': new FormControl(row.cazapieln, Validators.maxLength(10)),
            'pesten': new FormControl(row.pesten, Validators.maxLength(10)),
            'comstatn': new FormControl(row.comstatn, Validators.maxLength(120)),
            //distribución
            'elevminn': row.elevminn,//Number 
            'elevmaxn': row.elevmaxn,//Number
            'comdistg': new FormControl(row.comdistg, Validators.maxLength(120)),
            'comdistn': new FormControl(row.comdistn, Validators.maxLength(120)),
            //migración
            'residente': new FormControl(row.residente, Validators.maxLength(10)),
            'miglocal': new FormControl(row.miglocal, Validators.maxLength(10)),
            'migdist': new FormControl(row.migdist, Validators.maxLength(10)),
            'repn': new FormControl(row.repn, Validators.maxLength(10)),
            'norepn': new FormControl(row.norepn, Validators.maxLength(10)),
            'transmign': new FormControl(row.transmign, Validators.maxLength(10)),
            'aparirregn': new FormControl(row.aparirregn, Validators.maxLength(10)),
            'mign': new FormControl(row.mign, Validators.maxLength(10)),
            'commigg': new FormControl(row.commigg, Validators.maxLength(120)),
            'commign': new FormControl(row.commign, Validators.maxLength(120)),
            //habitat
            'marino': new FormControl(row.marino, Validators.maxLength(120)),
            'estuarino': new FormControl(row.estuarino, Validators.maxLength(120)),
            'fluvial': new FormControl(row.fluvial, Validators.maxLength(120)),
            'lacustre': new FormControl(row.lacustre, Validators.maxLength(120)),
            'palustre': new FormControl(row.palustre, Validators.maxLength(120)),
            'terrestre': new FormControl(row.terrestre, Validators.maxLength(120)),
            'subterran': new FormControl(row.subterran, Validators.maxLength(10)),
            'factorespe': new FormControl(row.factorespe, Validators.maxLength(120)),
            'comhabg': new FormControl(row.comhabg, Validators.maxLength(120)),
            'comhabrep': new FormControl(row.comhabrep, Validators.maxLength(120)),
            'comhabn': new FormControl(row.comhabn, Validators.maxLength(120)),
            //hábitos alimenticios
            'habitosalim': new FormControl(row.habitosalim, Validators.maxLength(120)),
            'comalimg': new FormControl(row.comalimg, Validators.maxLength(120)),
            'comalimn': new FormControl(row.comalimn, Validators.maxLength(120)),
            //ecología
            'comecolg': new FormControl(row.comecolg, Validators.maxLength(120)),
            'comecoln': new FormControl(row.comecoln, Validators.maxLength(120)),

            //fenología-Estacionalidad
            'fenologia': new FormControl(row.fenologia, Validators.maxLength(120)),
            'nenea': new FormControl(row.nenea, Validators.maxLength(2)),
            'nabra': new FormControl(row.nabra, Validators.maxLength(2)),
            'njula': new FormControl(row.njula, Validators.maxLength(2)),
            'nocta': new FormControl(row.nocta, Validators.maxLength(2)),

            'neneb': new FormControl(row.neneb, Validators.maxLength(2)),
            'nabrb': new FormControl(row.nabrb, Validators.maxLength(2)),
            'njulb': new FormControl(row.njulb, Validators.maxLength(2)),
            'noctb': new FormControl(row.noctb, Validators.maxLength(2)),

            'nfeba': new FormControl(row.nfeba, Validators.maxLength(2)),
            'nmaya': new FormControl(row.nmaya, Validators.maxLength(2)),
            'nagoa': new FormControl(row.nagoa, Validators.maxLength(2)),
            'nnova': new FormControl(row.nnova, Validators.maxLength(2)),

            'nfebb': new FormControl(row.nfebb, Validators.maxLength(2)),
            'nmayb': new FormControl(row.nmayb, Validators.maxLength(2)),
            'nagob': new FormControl(row.nagob, Validators.maxLength(2)),
            'nnovb': new FormControl(row.nnovb, Validators.maxLength(2)),

            'nmara': new FormControl(row.nmara, Validators.maxLength(2)),
            'njuna': new FormControl(row.njuna, Validators.maxLength(2)),
            'nseta': new FormControl(row.nseta, Validators.maxLength(2)),
            'ndica': new FormControl(row.ndica, Validators.maxLength(2)),

            'nmarb': new FormControl(row.nmarb, Validators.maxLength(2)),
            'njunb': new FormControl(row.njunb, Validators.maxLength(2)),
            'nsetb': new FormControl(row.nsetb, Validators.maxLength(2)),
            'ndicb': new FormControl(row.ndicb, Validators.maxLength(2)),

            'comfenolg': new FormControl(row.comfenolg, Validators.maxLength(120)),
            'comfenoln': new FormControl(row.comfenoln, Validators.maxLength(120)),
            //reproducción
            'colrep': new FormControl(row.colrep, Validators.maxLength(10)),
            'comrepg': new FormControl(row.comrepg, Validators.maxLength(120)),
            'comrepn': new FormControl(row.comrepn, Validators.maxLength(120)),
            //manejo
            'commanejog': new FormControl(row.commanejog, Validators.maxLength(120)),
            'commanejon': new FormControl(row.commanejon, Validators.maxLength(120)),
            //atributos misceláneos
            'usoeconom': new FormControl(row.usoeconom, Validators.maxLength(120)),
            'longitud': row.longitud,//Number
            'peso': row.peso,//Number
            //campos opcionales
            'rcvnopc1': new FormControl(row.rcvnopc1, Validators.maxLength(60)),
            'rcvnopc2': new FormControl(row.rcvnopc2, Validators.maxLength(60)),
            'rcvnopc3': new FormControl(row.rcvnopc3, Validators.maxLength(60)),
            'rcvnopc4': new FormControl(row.rcvnopc4, Validators.maxLength(60)),
            'rcvnopc5': new FormControl(row.rcvnopc5, Validators.maxLength(120)),
            //referencias
            'refg': new FormControl(row.refg, Validators.maxLength(120)),
            'refn': new FormControl(row.refn, Validators.maxLength(120)),
            //mantenimiento del registro
            'ediciong': fechaServicio.get_Fecha(row.ediciong), //date
            'actualizag': fechaServicio.get_Fecha(row.actualizag), //date
            'edicionn': fechaServicio.get_Fecha(row.edicionn),  //date
            'actualizan': fechaServicio.get_Fecha(row.actualizan)//date
        });
    }
}