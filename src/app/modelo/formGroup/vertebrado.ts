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
            'codigoe': new FormControl(row.codigoe, Validators.maxLength(10)),
            'nacion': new FormControl(row.nacion, Validators.maxLength(10)),
            'nombreg': new FormControl(row.nombreg, Validators.maxLength(10)),
            'autor': new FormControl(row.autor, Validators.maxLength(10)),
            'nombren': new FormControl(row.nombren, Validators.maxLength(10)),
            'nomcomunn': new FormControl(row.nomcomunn, Validators.maxLength(10)),
            //taxonomía
            'clasetax': new FormControl(row.clasetax, Validators.maxLength(10)),
            'orden': new FormControl(row.orden, Validators.maxLength(10)),
            'familia': new FormControl(row.familia, Validators.maxLength(10)),
            'genero': new FormControl(row.genero, Validators.maxLength(10)),
            'comtaxg': new FormControl(row.comtaxg, Validators.maxLength(10)),
            'comsubespn': new FormControl(row.comsubespn, Validators.maxLength(10)),
            //status
            'rangog': new FormControl(row.rangog, Validators.maxLength(10)),
            'cites': new FormControl(row.cites, Validators.maxLength(10)),
            'uicn': new FormControl(row.uicn, Validators.maxLength(10)),
            'aepeu': new FormControl(row.aepeu, Validators.maxLength(10)),
            'fechaaepeu': fechaServicio.getFecha(row.fechaaepeu),//date
            'endemismo': new FormControl(row.endemismo, Validators.maxLength(10)),
            'comstatg': new FormControl(row.comstatg, Validators.maxLength(10)),
            'rangon': new FormControl(row.rangon, Validators.maxLength(10)),
            'protnacion': new FormControl(row.protnacion, Validators.maxLength(10)),
            'rastreolen': new FormControl(row.rastreolen, Validators.maxLength(10)),
            'espdeportn': new FormControl(row.espdeportn, Validators.maxLength(10)),
            'espcomern': new FormControl(row.espcomern, Validators.maxLength(10)),
            'pezdeport': new FormControl(row.pezdeport, Validators.maxLength(10)),
            'ndeportpro': new FormControl(row.ndeportpro, Validators.maxLength(10)),
            'cazapieln': new FormControl(row.cazapieln, Validators.maxLength(10)),
            'pesten': new FormControl(row.pesten, Validators.maxLength(10)),
            'comstatn': new FormControl(row.comstatn, Validators.maxLength(10)),
            //distribución
            'elevminn': row.elevminn,//Number 
            'elevmaxn': row.elevmaxn,//Number
            'comdistg': new FormControl(row.comdistg, Validators.maxLength(10)),
            'comdistn': new FormControl(row.comdistn, Validators.maxLength(10)),
            //migración
            'residente': new FormControl(row.residente, Validators.maxLength(10)),
            'miglocal': new FormControl(row.miglocal, Validators.maxLength(10)),
            'migdist': new FormControl(row.migdist, Validators.maxLength(10)),
            'repn': new FormControl(row.repn, Validators.maxLength(10)),
            'norepn': new FormControl(row.norepn, Validators.maxLength(10)),
            'transmign': new FormControl(row.transmign, Validators.maxLength(10)),
            'aparirregn': new FormControl(row.aparirregn, Validators.maxLength(10)),
            'mign': new FormControl(row.mign, Validators.maxLength(10)),
            'commigg': new FormControl(row.commigg, Validators.maxLength(10)),
            'commign': new FormControl(row.commign, Validators.maxLength(10)),
            //habitat
            'marino': new FormControl(row.marino, Validators.maxLength(10)),
            'estuarino': new FormControl(row.estuarino, Validators.maxLength(10)),
            'fluvial': new FormControl(row.fluvial, Validators.maxLength(10)),
            'lacustre': new FormControl(row.lacustre, Validators.maxLength(10)),
            'palustre': new FormControl(row.palustre, Validators.maxLength(10)),
            'terrestre': new FormControl(row.terrestre, Validators.maxLength(10)),
            'subterran': new FormControl(row.subterran, Validators.maxLength(10)),
            'factorespe': new FormControl(row.factorespe, Validators.maxLength(10)),
            'comhabg': new FormControl(row.comhabg, Validators.maxLength(10)),
            'comhabrep': new FormControl(row.comhabrep, Validators.maxLength(10)),
            'comhabn': new FormControl(row.comhabn, Validators.maxLength(10)),
            //hábitos alimenticios
            'habitosalim': new FormControl(row.habitosalim, Validators.maxLength(10)),
            'comalimg': new FormControl(row.comalimg, Validators.maxLength(10)),
            'comalimn': new FormControl(row.comalimn, Validators.maxLength(10)),
            //ecología
            'comecolg': new FormControl(row.comecolg, Validators.maxLength(10)),
            'comecoln': new FormControl(row.comecoln, Validators.maxLength(10)),

            //fenología-Estacionalidad
            'fenologia': new FormControl(row.fenologia, Validators.maxLength(10)),
            'nenea': new FormControl(row.nenea, Validators.maxLength(10)),
            'nabra': new FormControl(row.nabra, Validators.maxLength(10)),
            'njula': new FormControl(row.njula, Validators.maxLength(10)),
            'nocta': new FormControl(row.nocta, Validators.maxLength(10)),

            'neneb': new FormControl(row.neneb, Validators.maxLength(10)),
            'nabrb': new FormControl(row.nabrb, Validators.maxLength(10)),
            'njulb': new FormControl(row.njulb, Validators.maxLength(10)),
            'noctb': new FormControl(row.noctb, Validators.maxLength(10)),

            'nfeba': new FormControl(row.nfeba, Validators.maxLength(10)),
            'nmaya': new FormControl(row.nmaya, Validators.maxLength(10)),
            'nagoa': new FormControl(row.nagoa, Validators.maxLength(10)),
            'nnova': new FormControl(row.nnova, Validators.maxLength(10)),

            'nfebb': new FormControl(row.nfebb, Validators.maxLength(10)),
            'nmayb': new FormControl(row.nmayb, Validators.maxLength(10)),
            'nagob': new FormControl(row.nagob, Validators.maxLength(10)),
            'nnovb': new FormControl(row.nnovb, Validators.maxLength(10)),

            'nmara': new FormControl(row.nmara, Validators.maxLength(10)),
            'njuna': new FormControl(row.njuna, Validators.maxLength(10)),
            'nseta': new FormControl(row.nseta, Validators.maxLength(10)),
            'ndica': new FormControl(row.ndica, Validators.maxLength(10)),

            'nmarb': new FormControl(row.nmarb, Validators.maxLength(10)),
            'njunb': new FormControl(row.njunb, Validators.maxLength(10)),
            'nsetb': new FormControl(row.nsetb, Validators.maxLength(10)),
            'ndicb': new FormControl(row.ndicb, Validators.maxLength(10)),

            'comfenolg': new FormControl(row.comfenolg, Validators.maxLength(10)),
            'comfenoln': new FormControl(row.comfenoln, Validators.maxLength(10)),
            //reproducción
            'colrep': new FormControl(row.colrep, Validators.maxLength(60)),
            'comrepg': new FormControl(row.comrepg, Validators.maxLength(10)),
            'comrepn': new FormControl(row.comrepn, Validators.maxLength(10)),
            //manejo
            'commanejog': new FormControl(row.commanejog, Validators.maxLength(120)),
            'commanejon': new FormControl(row.commanejon, Validators.maxLength(120)),
            //atributos misceláneos
            'usoeconom': new FormControl(row.usoeconom, Validators.maxLength(10)),
            'longitud': row.longitud,//Number
            'peso': row.peso,//Number
            //campos opcionales
            'rcvnopc1': new FormControl(row.rcvnopc1, Validators.maxLength(120)),
            'rcvnopc2': new FormControl(row.rcvnopc2, Validators.maxLength(120)),
            'rcvnopc3': new FormControl(row.rcvnopc3, Validators.maxLength(120)),
            'rcvnopc4': new FormControl(row.rcvnopc4, Validators.maxLength(120)),
            'rcvnopc5': new FormControl(row.rcvnopc5, Validators.maxLength(120)),
            //referencias
            'refg': new FormControl(row.refg, Validators.maxLength(60)),
            'refn': new FormControl(row.refn, Validators.maxLength(60)),
            //matenimiento del registro
            'ediciong': fechaServicio.getFecha(row.ediciong), //date
            'actualizag': fechaServicio.getFecha(row.actualizag), //date
            'edicionn': fechaServicio.getFecha(row.edicionn),  //date
            'actualizan': fechaServicio.getFecha(row.actualizan)//date
        });
    }
}