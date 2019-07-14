import { FormBuilder, FormGroup } from '@angular/forms';
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
            'codigoe': row.codigoe,
            'nacion': row.nacion,
            'nombren': row.nombren,
            'nomcomunn': row.nomcomunn,
            //taxonomía
            'comsubespn': row.comsubespn,
            'taxasimiln': row.taxasimiln,
            'comidentn': row.comidentn,
            'comtaxn': row.comtaxn,
            //status
            'rangog': row.rangog,
            'rangon': row.rangon,
            'aepeu': row.aepeu,
            'cites': row.cites,
            'uicn': row.uicn,
            'rastreolen': row.rastreolen,
            'protnacion': row.protnacion,
            'malezan': row.malezan,
            'clasifinstn': row.clasifinstn,
            'comstatn': row.comstatn,
            //inventario
            'priinventn': row.priinventn,
            'necinventn': row.necinventn,
            'cominventn': row.cominventn,
            'respropn': row.respropn,
            //ditribucion
            'elevminn': row.elevminn, //number
            'elevmaxn': row.elevmaxn, //number
            'disyuntn': row.disyuntn,
            'periferican': row.periferican,
            'comdistn': row.comdistn,
            //habitat
            'marinon': row.marinon,
            'estuarinon': row.estuarinon,
            'fluvialn': row.fluvialn,
            'lacustren': row.lacustren,
            'palustren': row.palustren,
            'terrestren': row.terrestren,
            'comhabn': row.comhabn,
            //ecología
            'comecoln': row.comecoln,
            //fenología
            //1 línea
            'nenea1': row.nenea1,
            'nenea2': row.nenea2,
            'nenea3': row.nenea3,
            'nenea4': row.nenea4,

            'nmara1': row.nmara1,
            'nmara2': row.nmara2,
            'nmara3': row.nmara3,
            'nmara4': row.nmara4,

            'nmaya1': row.nmaya1,
            'nmaya2': row.nmaya2,
            'nmaya3': row.nmaya3,
            'nmaya4': row.nmaya4,

            'njula1': row.njula1,
            'njula2': row.njula2,
            'njula3': row.njula3,
            'njula4': row.njula4,

            'nseta1': row.nseta1,
            'nseta2': row.nseta2,
            'nseta3': row.nseta3,
            'nseta4': row.nseta4,

            'nnova1': row.nnova1,
            'nnova2': row.nnova2,
            'nnova3': row.nnova3,
            'nnova4': row.nnova4,

            //2 línea
            'neneb1': row.neneb1,
            'neneb2': row.neneb2,
            'neneb3': row.neneb3,
            'neneb4': row.neneb4,

            'nmarb1': row.nmarb1,
            'nmarb2': row.nmarb2,
            'nmarb3': row.nmarb3,
            'nmarb4': row.nmarb4,

            'nmayb1': row.nmayb1,
            'nmayb2': row.nmayb2,
            'nmayb3': row.nmayb3,
            'nmayb4': row.nmayb4,

            'njulb1': row.njulb1,
            'njulb2': row.njulb2,
            'njulb3': row.njulb3,
            'njulb4': row.njulb4,

            'nsetb1': row.nsetb1,
            'nsetb2': row.nsetb2,
            'nsetb3': row.nsetb3,
            'nsetb4': row.nsetb4,

            'nnovb1': row.nnovb1,
            'nnovb2': row.nnovb2,
            'nnovb3': row.nnovb3,
            'nnovb4': row.nnovb4,

            //3 línea
            'nfeba1': row.nfeba1,
            'nfeba2': row.nfeba2,
            'nfeba3': row.nfeba3,
            'nfeba4': row.nfeba4,

            'nabra1': row.nabra1,
            'nabra2': row.nabra2,
            'nabra3': row.nabra3,
            'nabra4': row.nabra4,

            'njuna1': row.njuna1,
            'njuna2': row.njuna2,
            'njuna3': row.njuna3,
            'njuna4': row.njuna4,

            'nagoa1': row.nagoa1,
            'nagoa2': row.nagoa2,
            'nagoa3': row.nagoa3,
            'nagoa4': row.nagoa4,

            'nocta1': row.nocta1,
            'nocta2': row.nocta2,
            'nocta3': row.nocta3,
            'nocta4': row.nocta4,

            'ndica1': row.ndica1,
            'ndica2': row.ndica2,
            'ndica3': row.ndica3,
            'ndica4': row.ndica4,

            //4 línea
            'nfebb1': row.nfebb1,
            'nfebb2': row.nfebb2,
            'nfebb3': row.nfebb3,
            'nfebb4': row.nfebb4,

            'nabrb1': row.nabrb1,
            'nabrb2': row.nabrb2,
            'nabrb3': row.nabrb3,
            'nabrb4': row.nabrb4,

            'njunb1': row.njunb1,
            'njunb2': row.njunb2,
            'njunb3': row.njunb3,
            'njunb4': row.njunb4,

            'nagob1': row.nagob1,
            'nagob2': row.nagob2,
            'nagob3': row.nagob3,
            'nagob4': row.nagob4,

            'noctb1': row.noctb1,
            'noctb2': row.noctb2,
            'noctb3': row.noctb3,
            'noctb4': row.noctb4,

            'ndicb1': row.ndicb1,
            'ndicb2': row.ndicb2,
            'ndicb3': row.ndicb3,
            'ndicb4': row.ndicb4,

            'comfenoln': row.comfenoln,
            //reproducción
            'comrepn': row.comrepn,
            //manejo
            'commanejon': row.commanejon,
            //campos opcionales
            'rcpnopc1': row.rcpnopc1,
            'rcpnopc2': row.rcpnopc2,
            'rcpnopc3': row.rcpnopc3,
            'rcpnopc4': row.rcpnopc4,
            'rcpnopc5': row.rcpnopc5,
            //mantenimiento del registro
            'codfuente': row.codfuente,
            'cita': row.cita,
            'transparen': row.transparen,
            'refg': row.refg,
            'refn': row.refn,
            'edicionn': fechaServicio.getFecha(row.edicionn), //date
            'autoredn': row.autoredn,
            'actualizan': fechaServicio.getFecha(row.actualizan), //date
        });
    }
}