import { FormBuilder, FormGroup } from '@angular/forms';
import { vertebrado_Modelo } from '../../modelo/resumen/vertebrado-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class vertebrado_FormGroup {
    constructor() { }
    getPVertebradoFormGrup(row: vertebrado_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'vertebradoId': row.vertebradoId,
            //identificadores
            'codigoe': row.codigoe,
            'nacion': row.nacion,
            'nombreg': row.nombreg,
            'autor': row.autor,
            'nombren': row.nombren,
            'nomcomunn': row.nomcomunn,
            //taxonomía
            'clasetax': row.clasetax,
            'orden': row.orden,
            'familia': row.familia,
            'genero': row.genero,
            'comtaxg': row.comtaxg,
            'comsubespn': row.comsubespn,
            //status
            'rangog': row.rangog,
            'cites': row.cites,
            'uicn': row.uicn,
            'aepeu': row.aepeu,
            'fechaaepeu': fechaServicio.getFecha(row.fechaaepeu),//date
            'endemismo': row.endemismo,
            'comstatg': row.comstatg,
            'rangon': row.rangon,
            'protnacion': row.protnacion,
            'rastreolen': row.rastreolen,
            'espdeportn': row.espdeportn,
            'espcomern': row.espcomern,
            'pezdeport': row.pezdeport,
            'ndeportpro': row.ndeportpro,
            'cazapieln': row.cazapieln,
            'pesten': row.pesten,
            'comstatn': row.comstatn,
            //distribución
            //'lista_distribucion1': '',
            //'lista_distribucion2': '',
            'elevminn': row.elevminn,//Number 
            'elevmaxn': row.elevmaxn,//Number
            'comdistg': row.comdistg,
            'comdistn': row.comdistn,
            //migración
            'residente': row.residente,
            'miglocal': row.miglocal,
            'migdist': row.migdist,
            'repn': row.repn,
            'norepn': row.norepn,
            'transmign': row.transmign,
            'aparirregn': row.aparirregn,
            'mign': row.mign,
            'commigg': row.commigg,
            'commign': row.commign,
            //habitat
            'marino': row.marino,
            'estuarino': row.estuarino,
            'fluvial': row.fluvial,
            'lacustre': row.lacustre,
            'palustre': row.palustre,
            'terrestre': row.terrestre,
            'subterran': row.subterran,
            'factorespe': row.factorespe,
            'comhabg': row.comhabg,
            'comhabrep': row.comhabrep,
            'comhabn': row.comhabn,
            //hábitos alimenticios
            'habitosalim': row.habitosalim,
            'comalimg': row.comalimg,
            'comalimn': row.comalimn,
            //ecología
            'comecolg': row.comecolg,
            'comecoln': row.comecoln,
            //fenología-Estacionalidad
            'fenologia': row.fenologia,
            'nenea': row.nenea, 'nabra': row.nabra, 'njula': row.njula, 'nocta': row.nocta,
            'neneb': row.neneb, 'nabrb': row.nabrb, 'njulb': row.njulb, 'noctb': row.noctb,
            'nfeba': row.nfeba, 'nmaya': row.nmaya, 'nagoa': row.nagoa, 'nnova': row.nnova,
            'nfebb': row.nfebb, 'nmayb': row.nmayb, 'nagob': row.nagob, 'nnovb': row.nnovb,
            'nmara': row.nmara, 'njuna': row.njuna, 'nseta': row.nseta, 'ndica': row.ndica,
            'nmarb': row.nmarb, 'njunb': row.njunb, 'nsetb': row.nsetb, 'ndicb': row.ndicb,
            'comfenolg': row.comfenolg,
            'comfenoln': row.comfenoln,
            //reproducción
            'colrep': row.colrep,
            'comrepg': row.comrepg,
            'comrepn': row.comrepn,
            //manejo
            'commanejog': row.commanejog,
            'commanejon': row.commanejon,
            //atributos misceláneos
            'usoeconom': row.usoeconom,
            'longitud': row.longitud,
            'peso': row.peso,
            //campos opcionales
            'rcvnopc1': row.rcvnopc1,
            'rcvnopc2': row.rcvnopc2,
            'rcvnopc3': row.rcvnopc3,
            'rcvnopc4': row.rcvnopc4,
            'rcvnopc5': row.rcvnopc5,
            //referencias
            'refg': row.refg,
            'refn': row.refn,
            //matenimiento del registro
            'ediciong': fechaServicio.getFecha(row.ediciong), //date
            'actualizag': fechaServicio.getFecha(row.actualizag), //date
            'edicionn': fechaServicio.getFecha(row.edicionn),  //date
            'actualizan': fechaServicio.getFecha(row.actualizan)//date
        });
    }
}