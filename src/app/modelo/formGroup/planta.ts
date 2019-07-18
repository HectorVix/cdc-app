import { FormBuilder, FormGroup, FormControl,  Validators} from '@angular/forms';
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
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10),Validators.required]),
            'nacion': new FormControl(row.nacion, Validators.maxLength(60)),
            'nombren': new FormControl(row.nombren, Validators.maxLength(60)),
            'nomcomunn': new FormControl(row.nomcomunn, Validators.maxLength(60)),
            //taxonomía
            'comsubespn': new FormControl(row.comsubespn, Validators.maxLength(120)),
            'taxasimiln': new FormControl(row.taxasimiln, Validators.maxLength(120)),
            'comidentn': new FormControl(row.comidentn, Validators.maxLength(120)),
            'comtaxn': new FormControl(row.comtaxn, Validators.maxLength(120)),
            //status
            'rangog': new FormControl(row.rangog, Validators.maxLength(10)),
            'rangon': new FormControl(row.rangon, Validators.maxLength(10)),
            'aepeu': new FormControl(row.aepeu, Validators.maxLength(10)),
            'cites': new FormControl(row.cites, Validators.maxLength(10)),
            'uicn': new FormControl(row.uicn, Validators.maxLength(10)),
            'rastreolen': new FormControl(row.rastreolen, Validators.maxLength(10)),
            'protnacion': new FormControl(row.protnacion, Validators.maxLength(10)),
            'malezan': new FormControl(row.clasifinstn, Validators.maxLength(60)),
            'clasifinstn': new FormControl(row.clasifinstn, Validators.maxLength(60)),
            'comstatn': new FormControl(row.comstatn, Validators.maxLength(120)),
            //inventario
            'priinventn': new FormControl(row.priinventn, Validators.maxLength(10)),
            'necinventn': new FormControl(row.necinventn, Validators.maxLength(120)),
            'cominventn': new FormControl(row.cominventn, Validators.maxLength(120)),
            'respropn': new FormControl(row.respropn, Validators.maxLength(60)),
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
            /**
             *  Las posibles soluciones para hacer mas eficiente estos campos son:
             * 1: Crear una matriz de 6x16 y validar sobre ella
             * 2: Juntar todo en json y validar sobre esto en el servicio
             * 3: Validar campo por campo "es la solucion actual" usando el sistema clásico (es funcional y aprueba de fallos) 
             *      se deja esta solución para tener una base sobre la cual trabajar e ir mejorando.
             * 4: Arbol de decisión segun sea el mes o meses a validar  para este caso se debe validar la linea del tiempo y mostrar los 
             *      campos a llenar segun se requiera (existen o existieron elementos en años ateriores útil para sacar predicciones).
             * **/
            //1 línea
            'nenea1': new FormControl(row.nenea1, Validators.maxLength(2)),
            'nenea2': new FormControl(row.nenea2, Validators.maxLength(2)),
            'nenea3': new FormControl(row.nenea3, Validators.maxLength(2)),
            'nenea4': new FormControl(row.nenea4, Validators.maxLength(2)),

            'nmara1': new FormControl(row.nmara1, Validators.maxLength(2)),
            'nmara2': new FormControl(row.nmara2, Validators.maxLength(2)),
            'nmara3': new FormControl(row.nmara3, Validators.maxLength(2)),
            'nmara4': new FormControl(row.nmara4, Validators.maxLength(2)),

            'nmaya1': new FormControl(row.nmaya1, Validators.maxLength(2)),
            'nmaya2': new FormControl(row.nmaya2, Validators.maxLength(2)),
            'nmaya3': new FormControl(row.nmaya3, Validators.maxLength(2)),
            'nmaya4': new FormControl(row.nmaya4, Validators.maxLength(2)),

            'njula1': new FormControl(row.njula1, Validators.maxLength(2)),
            'njula2': new FormControl(row.njula2, Validators.maxLength(2)),
            'njula3': new FormControl(row.njula3, Validators.maxLength(2)),
            'njula4': new FormControl(row.njula4, Validators.maxLength(2)),

            'nseta1': new FormControl(row.nseta1, Validators.maxLength(2)),
            'nseta2': new FormControl(row.nseta2, Validators.maxLength(2)),
            'nseta3': new FormControl(row.nseta3, Validators.maxLength(2)),
            'nseta4': new FormControl(row.nseta4, Validators.maxLength(2)),

            'nnova1': new FormControl(row.nnova1, Validators.maxLength(2)),
            'nnova2': new FormControl(row.nnova2, Validators.maxLength(2)),
            'nnova3': new FormControl(row.nnova3, Validators.maxLength(2)),
            'nnova4': new FormControl(row.nnova4, Validators.maxLength(2)),

            //2 línea
            'neneb1': new FormControl(row.neneb1, Validators.maxLength(2)),
            'neneb2': new FormControl(row.neneb2, Validators.maxLength(2)),
            'neneb3': new FormControl(row.neneb3, Validators.maxLength(2)),
            'neneb4': new FormControl(row.neneb4, Validators.maxLength(2)),

            'nmarb1': new FormControl(row.nmarb1, Validators.maxLength(2)),
            'nmarb2': new FormControl(row.nmarb2, Validators.maxLength(2)),
            'nmarb3': new FormControl(row.nmarb3, Validators.maxLength(2)),
            'nmarb4': new FormControl(row.nmarb4, Validators.maxLength(2)),

            'nmayb1': new FormControl(row.nmayb1, Validators.maxLength(2)),
            'nmayb2': new FormControl(row.nmayb2, Validators.maxLength(2)),
            'nmayb3': new FormControl(row.nmayb3, Validators.maxLength(2)),
            'nmayb4': new FormControl(row.nmayb4, Validators.maxLength(2)),

            'njulb1': new FormControl(row.njulb1, Validators.maxLength(2)),
            'njulb2': new FormControl(row.njulb2, Validators.maxLength(2)),
            'njulb3': new FormControl(row.njulb3, Validators.maxLength(2)),
            'njulb4': new FormControl(row.njulb4, Validators.maxLength(2)),

            'nsetb1': new FormControl(row.nsetb1, Validators.maxLength(2)),
            'nsetb2': new FormControl(row.nsetb2, Validators.maxLength(2)),
            'nsetb3': new FormControl(row.nsetb3, Validators.maxLength(2)),
            'nsetb4': new FormControl(row.nsetb4, Validators.maxLength(2)),

            'nnovb1': new FormControl(row.nnovb1, Validators.maxLength(2)),
            'nnovb2': new FormControl(row.nnovb2, Validators.maxLength(2)),
            'nnovb3': new FormControl(row.nnovb3, Validators.maxLength(2)),
            'nnovb4': new FormControl(row.nnovb4, Validators.maxLength(2)),

            //3 línea
            'nfeba1': new FormControl(row.nfeba1, Validators.maxLength(2)),
            'nfeba2': new FormControl(row.nfeba2, Validators.maxLength(2)),
            'nfeba3': new FormControl(row.nfeba3, Validators.maxLength(2)),
            'nfeba4': new FormControl(row.nfeba4, Validators.maxLength(2)),

            'nabra1': new FormControl(row.nabra1, Validators.maxLength(2)),
            'nabra2': new FormControl(row.nabra2, Validators.maxLength(2)),
            'nabra3': new FormControl(row.nabra3, Validators.maxLength(2)),
            'nabra4': new FormControl(row.nabra4, Validators.maxLength(2)),

            'njuna1': new FormControl(row.njuna1, Validators.maxLength(2)),
            'njuna2': new FormControl(row.njuna2, Validators.maxLength(2)),
            'njuna3': new FormControl(row.njuna3, Validators.maxLength(2)),
            'njuna4': new FormControl(row.njuna4, Validators.maxLength(2)),

            'nagoa1': new FormControl(row.nagoa1, Validators.maxLength(2)),
            'nagoa2': new FormControl(row.nagoa2, Validators.maxLength(2)),
            'nagoa3': new FormControl(row.nagoa3, Validators.maxLength(2)),
            'nagoa4': new FormControl(row.nagoa4, Validators.maxLength(2)),

            'nocta1': new FormControl(row.nocta1, Validators.maxLength(2)),
            'nocta2': new FormControl(row.nocta2, Validators.maxLength(2)),
            'nocta3': new FormControl(row.nocta3, Validators.maxLength(2)),
            'nocta4': new FormControl(row.nocta4, Validators.maxLength(2)),

            'ndica1': new FormControl(row.ndica1, Validators.maxLength(2)),
            'ndica2': new FormControl(row.ndica2, Validators.maxLength(2)),
            'ndica3': new FormControl(row.ndica3, Validators.maxLength(2)),
            'ndica4': new FormControl(row.ndica4, Validators.maxLength(2)),

            //4 línea
            'nfebb1': new FormControl(row.nfebb1, Validators.maxLength(2)),
            'nfebb2': new FormControl(row.nfebb2, Validators.maxLength(2)),
            'nfebb3': new FormControl(row.nfebb3, Validators.maxLength(2)),
            'nfebb4': new FormControl(row.nfebb4, Validators.maxLength(2)),

            'nabrb1': new FormControl(row.nabrb1, Validators.maxLength(2)),
            'nabrb2': new FormControl(row.nabrb2, Validators.maxLength(2)),
            'nabrb3': new FormControl(row.nabrb3, Validators.maxLength(2)),
            'nabrb4': new FormControl(row.nabrb4, Validators.maxLength(2)),

            'njunb1': new FormControl(row.njunb1, Validators.maxLength(2)),
            'njunb2': new FormControl(row.njunb2, Validators.maxLength(2)),
            'njunb3': new FormControl(row.njunb3, Validators.maxLength(2)),
            'njunb4': new FormControl(row.njunb4, Validators.maxLength(2)),

            'nagob1': new FormControl(row.nagob1, Validators.maxLength(2)),
            'nagob2': new FormControl(row.nagob2, Validators.maxLength(2)),
            'nagob3': new FormControl(row.nagob3, Validators.maxLength(2)),
            'nagob4': new FormControl(row.nagob4, Validators.maxLength(2)),

            'noctb1': new FormControl(row.noctb1, Validators.maxLength(2)),
            'noctb2': new FormControl(row.noctb2, Validators.maxLength(2)),
            'noctb3': new FormControl(row.noctb3, Validators.maxLength(2)),
            'noctb4': new FormControl(row.noctb4, Validators.maxLength(2)),

            'ndicb1': new FormControl(row.ndicb1, Validators.maxLength(2)),
            'ndicb2': new FormControl(row.ndicb2, Validators.maxLength(2)),
            'ndicb3': new FormControl(row.ndicb3, Validators.maxLength(2)),
            'ndicb4': new FormControl(row.ndicb4, Validators.maxLength(2)),

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
            'codfuente': new FormControl(row.codfuente, Validators.maxLength(10)),
            'cita': new FormControl(row.cita, Validators.maxLength(60)),
            'transparen': new FormControl(row.transparen, Validators.maxLength(10)),
            'refg': new FormControl(row.refg, Validators.maxLength(120)),
            'refn': new FormControl(row.refn, Validators.maxLength(120)),
            'edicionn': fechaServicio.getFecha(row.edicionn), //date
            'autoredn': new FormControl(row.autoredn, Validators.maxLength(10)),
            'actualizan': fechaServicio.getFecha(row.actualizan), //date
        });
    }
}