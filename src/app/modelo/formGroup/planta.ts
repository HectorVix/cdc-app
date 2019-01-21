import { FormBuilder, FormGroup } from '@angular/forms';
import { planta_Modelo } from '../../modelo/resumen/planta-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class planta_FormGroup {
    constructor() { }
    getPlantaFormGrup(row: planta_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'plantaId': '',
            //identificadores
            'codigoe': '',
            'nacion': '',
            'nombren': '',
            'nomcomunn': '',
            //taxonomía
            'comsubespn': '',
            'taxasimiln': '',
            'comidentn': '',
            'comtaxn': '',
            //status
            'rangog': '',
            'rangon': '',
            'aepeu': '',
            'cites': '',
            'uicn': '',
            'rastreolen': '',
            'protnacion': '',
            'malezan': '',
            'clasifinstn': '',
            'comstatn': '',
            //inventario
            'priinventn': '',
            'necinventn': '',
            'cominventn': '',
            'respropn': '',
            //ditribucion
            //'lista_distribucion1': '',
            //'lista_distribucion2': '',
            'elevminn': '', //number
            'elevmaxn': '', //number
            'disyuntn': '',
            'periferican': '',
            'comdistn': '',
            //habitat
            'marinon': '',
            'estuarinon': '',
            'fluvialn': '',
            'lacustren': '',
            'palustren': '',
            'terrestren': '',
            'comhabn': '',
            //ecología
            'comecoln': '',
            //fenología
            //1 línea
            'nenea1': '',
            'nenea2': '',
            'nenea3': '',
            'nenea4': '',

            'nmara1': '',
            'nmara2': '',
            'nmara3': '',
            'nmara4': '',

            'nmaya1': '',
            'nmaya2': '',
            'nmaya3': '',
            'nmaya4': '',

            'njula1': '',
            'njula2': '',
            'njula3': '',
            'njula4': '',

            'nseta1': '',
            'nseta2': '',
            'nseta3': '',
            'nseta4': '',

            'nnova1': '',
            'nnova2': '',
            'nnova3': '',
            'nnova4': '',

            //2 línea
            'neneb1': '',
            'neneb2': '',
            'neneb3': '',
            'neneb4': '',

            'nmarb1': '',
            'nmarb2': '',
            'nmarb3': '',
            'nmarb4': '',

            'nmayb1': '',
            'nmayb2': '',
            'nmayb3': '',
            'nmayb4': '',

            'njulb1': '',
            'njulb2': '',
            'njulb3': '',
            'njulb4': '',

            'nsetb1': '',
            'nsetb2': '',
            'nsetb3': '',
            'nsetb4': '',

            'nnovb1': '',
            'nnovb2': '',
            'nnovb3': '',
            'nnovb4': '',

            //3 línea
            'nfeba1': '',
            'nfeba2': '',
            'nfeba3': '',
            'nfeba4': '',

            'nabra1': '',
            'nabra2': '',
            'nabra3': '',
            'nabra4': '',

            'njuna1': '',
            'njuna2': '',
            'njuna3': '',
            'njuna4': '',

            'nagoa1': '',
            'nagoa2': '',
            'nagoa3': '',
            'nagoa4': '',

            'nocta1': '',
            'nocta2': '',
            'nocta3': '',
            'nocta4': '',

            'ndica1': '',
            'ndica2': '',
            'ndica3': '',
            'ndica4': '',

            //4 línea
            'nfebb1': '',
            'nfebb2': '',
            'nfebb3': '',
            'nfebb4': '',

            'nabrb1': '',
            'nabrb2': '',
            'nabrb3': '',
            'nabrb4': '',

            'njunb1': '',
            'njunb2': '',
            'njunb3': '',
            'njunb4': '',

            'nagob1': '',
            'nagob2': '',
            'nagob3': '',
            'nagob4': '',

            'noctb1': '',
            'noctb2': '',
            'noctb3': '',
            'noctb4': '',

            'ndicb1': '',
            'ndicb2': '',
            'ndicb3': '',
            'ndicb4': '',

            'comfenoln': '',
            //reproducción
            'comrepn': '',
            //manejo
            'commanejon': '',
            //campos opcionales
            'rcpnopc1': '',
            'rcpnopc2': '',
            'rcpnopc3': '',
            'rcpnopc4': '',
            'rcpnopc5': '',
            //mantenimiento del registro
            'codfuente': '',
            'cita': '',
            'transparen': '',
            'refg': '',
            'refn': '',
            'edicionn': '', //date
            'autoredn': '',
            'actualizan': '', //date
        });
    }
}