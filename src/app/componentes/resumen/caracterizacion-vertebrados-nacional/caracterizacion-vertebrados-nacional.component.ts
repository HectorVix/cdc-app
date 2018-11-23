import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Distribucion1_Resumen, Distribucion2_Resumen, CamposOpcionales } from '../../../modelo/tablas/tabla';
@Component({
  selector: 'app-caracterizacion-vertebrados-nacional',
  templateUrl: './caracterizacion-vertebrados-nacional.component.html',
  styleUrls: ['./caracterizacion-vertebrados-nacional.component.scss']
})
export class CaracterizacionVertebradosNacionalComponent implements OnInit {
  caracterizacionVertebradosNacional: FormGroup;
  source_Distribucion1: Distribucion1_Resumen[];
  source_Distribucion2: Distribucion2_Resumen[];
  source_CamposOpcionales: CamposOpcionales[];

  settings_CamposOpcionales = {
    columns: {
      datos: {
        title: 'RCVN.OPC'
      }
    }
  };
  settings_Distribucion1 = {
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
  settings_Distribucion2 = {
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
  selected = new FormControl(0);
  constructor(private fb: FormBuilder) {
    this.crearForm_caracterizacionVertebradosNacional();
  }

  ngOnInit() {
  }
  crearForm_caracterizacionVertebradosNacional() {
    this.caracterizacionVertebradosNacional = this.fb.group({
      //identificadores
      'codigoe': ['', Validators.required],
      'nacion': '',
      'nombreg': '',
      'autor': '',
      'nombren': '',
      'nomcomunn': '',
      //taxonomía
      'clasetax': '',
      'orden': '',
      'familia': '',
      'genero': '',
      'comtaxg': '',
      'comsubespn': '',
      //status
      'rangog': '',
      'cites': '',
      'uicn': '',
      'aepeu': '',
      'fechaaepeu': '',//date
      'endemismo': '',
      'comstatg': '',
      'rangon': '',
      'protnacion': '',
      'rastreolen': '',
      'espdeportn': '',
      'espcomern': '',
      'pezdeport': '',
      'ndeportpro': '',
      'cazapieln': '',
      'pesten': '',
      'comstatn': '',
      //distribución
      'lista_distribucion1': '',
      'lista_distribucion2': '',
      'elevminn': '',
      'elevmaxn': '',
      'comdistg': '',
      'comdistn': '',
      //migración
      'residente': '',
      'miglocal': '',
      'migdist': '',
      'repn': '',
      'norepn': '',
      'transmign': '',
      'aparirregn': '',
      'mign': '',
      'commigg': '',
      'commign': '',
      //habitat
      'marino': '',
      'estuarino': '',
      'fluvial': '',
      'lacustre': '',
      'palustre': '',
      'terrestre': '',
      'subterran': '',
      'factorespe': '',
      'comhabg': '',
      'comhabrep': '',
      'comhabn': '',
      //hábitos alimenticios
      'habitosalim': '',
      'comalimg': '',
      'comalimn': '',
      //ecología
      'comecolg': '',
      'comecoln': '',
      //fenología-Estacionalidad
      'fenologia': '',
      'nenea': '', 'nabra': '', 'njula': '', 'nocta': '',
      'neneb': '', 'nabrb': '', 'njulb': '', 'noctb': '',
      'nfeba': '', 'nmaya': '', 'nagoa': '', 'nnova': '',
      'nfebb': '', 'nmayb': '', 'nagob': '', 'nnovb': '',
      'nmara': '', 'njuna': '', 'nseta': '', 'ndica': '',
      'nmarb': '', 'njunb': '', 'nsetb': '', 'ndicb': '',
      'comfenolg': '',
      'comfenoln': '',
      //reproducción
      'colrep': '',
      'comrepg': '',
      'comrepn': '',
      //manejo
      'commanejog': '',
      'commanejon': '',
      //atributos misceláneos
      'usoeconom': '',
      'longitud': '',
      'peso': '',
      //campos opcionales
      'rcvnopc1': '',
      'rcvnopc2': '',
      'rcvnopc3': '',
      'rcvnopc4': '',
      'rcvnopc5': '',
      //referencias
      'refg': '',
      'refn': '',
      //matenimiento del registro
      'ediciong': '', //date
      'actualizag': '', //date
      'edicionn': '',  //date
      'actualizan': ''//date
    });
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  tabPagina2() {
    this.selected.setValue(1);
  }
  tabPagina3() {
    this.selected.setValue(2);
  }
  tabPagina4() {
    this.selected.setValue(3);
  }
  tabPagina5() {
    this.selected.setValue(4);
  }
}
