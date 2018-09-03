import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distribucion1_Resumen, Distribucion2_Resumen, CamposOpcionales } from '../../../modelo/tablas/tabla';


@Component({
  selector: 'app-caracterizacion-plantas-nacional',
  templateUrl: './caracterizacion-plantas-nacional.component.html',
  styleUrls: ['./caracterizacion-plantas-nacional.component.scss']
})
export class CaracterizacionPlantasNacionalComponent implements OnInit {
  caracterizacionPlantasNacionalForm: FormGroup;
  source_Distribucion1: Distribucion1_Resumen[];
  source_Distribucion2: Distribucion2_Resumen[];
  source_CamposOpcionales: CamposOpcionales[];

  settings_CamposOpcionales = {
    columns: {
      datos: {
        title: 'RCPN.OPC'
      }
    }
  };
  settings_distribucion1 = {
    columns: {
      codsubnac: {
        title: 'CODSUBNAC'
      },
      nomsubnac: {
        title: 'NOMSUBNAC'
      },
      statsubnac: {
        title: 'STATSUBNAC'
      }
    }
  };
  settings_distribucion2 = {
    columns: {
      codecoregn: {
        title: 'CODECORGN'
      },
      statecoregn: {
        title: 'STATECOREGN'
      },
      codcuencan: {
        title: 'CODCUENCAN'
      },
      statcuencan: {
        title: 'STATCUENCAN'
      }
    }
  };
  constructor(private fb: FormBuilder) {
    this.crearForm_CaracterizacionPlantasNacional();
  }

  ngOnInit() {
  }
  crearForm_CaracterizacionPlantasNacional() {
    this.caracterizacionPlantasNacionalForm = this.fb.group({
      //identificadores
      'codigoe': ['', Validators.required],
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
      'lista_distribucion1': '',
      'lista_distribucion2': '',
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
      //enero
      'nenea1': '', 'nenea2': '', 'nenea3': '', 'nenea4': '',
      'neneb1': '', 'neneb2': '', 'neneb3': '', 'neneb4': '',
      //febrero
      'nfeba1': '', 'nfeba2': '', 'nfeba3': '', 'nfeba4': '',
      'nfebb1': '', 'nfebb2': '', 'nfebb3': '', 'nfebb4': '',
      //marzo
      'nmara1': '', 'nmara2': '', 'nmara3': '', 'nmara4': '',
      'nmarb1': '', 'nmarb2': '', 'nmarb3': '', 'nmarb4': '',
      //abril
      'nabra1': '', 'nabra2': '', 'nabra3': '', 'nabra4': '',
      'nabrb1': '', 'nabrb2': '', 'nabrb3': '', 'nabrb4': '',
      //mayo
      'nmaya1': '','nmaya2': '','nmaya3': '','nmaya4': '',
      'nmayb1': '','nmayb2': '','nmayb3': '','nmayb4': '',
      //junio
      'njuna1': '','njuna2': '','njuna3': '','njuna4': '',
      'njunb1': '','njunb2': '','njunb3': '','njunb4': '',
      //julio
      'njula1': '','njula2': '','njula3': '','njula4': '',
      'njulb1': '','njulb2': '','njulb3': '','njulb4': '',
      //agosto
      'nagoa1': '','nagoa2': '','nagoa3': '','nagoa4': '',
      'nagob1': '','nagob2': '','nagob3': '','nagob4': '',
      //septiembre
      'nseta1': '','nseta2': '','nseta3': '','nseta4': '',
      'nsetb1': '','nsetb2': '','nsetb3': '','nsetb4': '',
      //octubre
      'nocta1': '','nocta2': '','nocta3': '','nocta4': '',
      'noctb1': '','noctb2': '','noctb3': '','noctb4': '',
      //noviembre
      'nnova1': '','nnova2': '','nnova3': '','nnova4': '',
      'nnovb1': '','nnovb2': '','nnovb3': '','nnovb4': '',
      //diciembre
      'ndica1': '','ndica2': '','ndica3': '','ndica4': '',
      'ndicb1': '','ndicb2': '','ndicb3': '','ndicb4': '',
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
