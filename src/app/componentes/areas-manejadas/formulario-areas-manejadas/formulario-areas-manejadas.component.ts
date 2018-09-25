import { Component, OnInit } from '@angular/core';
import { Elementos_AreasManejadas, CamposOpcionales } from '../../../modelo/tablas/tabla';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_areasManejadas } from '../../../modelo/select/overview-area';
import { UsuarioService } from '../../../servicios/usuario.service';
import { debounceTime } from 'rxjs/operators';
import { area_Modelo } from '../../../modelo/area/area-modelo';
@Component({
  selector: 'app-formulario-areas-manejadas',
  templateUrl: './formulario-areas-manejadas.component.html',
  styleUrls: ['./formulario-areas-manejadas.component.scss']
})
export class FormularioAreasManejadasComponent implements OnInit {
  source_Elementos_AreasManejadas: Elementos_AreasManejadas[];
  source_CamposOpcionales_AreasManejadas: CamposOpcionales[];
  areaManejoForm: FormGroup;
  criterio_areasManejadas = new criterio_areasManejadas();
  criterio_protasign = this.criterio_areasManejadas.protasign;
  criterio_accesopub = this.criterio_areasManejadas.accesopub;
  criterio_status = this.criterio_areasManejadas.status;
  criterio_si_no = this.criterio_areasManejadas.si_no;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;

  settings_Elementos_AreasManejadas = {
    columns: {
      codigoe: {
        title: 'CODIGOE'
      },
      nombres: {
        title: 'NOMBRES'
      },
      status: {
        title: 'STATUS'
      },
      codfuente: {
        title: 'CODFUENTE'
      }
    }
  };
  settings_CamposOpcionales_AreasManejadas = {
    columns: {
      datos: {
        title: 'DATOS'
      }
    }
  };

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.crear_areaManejoForm();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  crear_areaManejoForm() {
    this.areaManejoForm = this.fb.group({
      //página1
      //identificadores
      'codigoam': ['', Validators.required],
      'nombream': '',
      'sinam': '',
      'ammayor': '',
      'coddueno': '',
      'codsitio': '',
      'nomsitio': '',
      //localizadores
      'nacion': '',
      'subnacion': '',
      'subdivision': '',
      'nommapa': '',
      'codmapa': '',
      'nummarg': '',
      'lat': '',
      'long1': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      //decriptores
      'descripcion': '',
      'areatot1': '', //number
      'areatot2': '', //number
      'areasubnac1': '',//number
      'areasubnac2': '',//number
      'multisubnac':null, //boolean
      'limites':null,//boolean
      'continua':null,//boolean
      'involtnc':null, //boolean
      'comentario': '',
      //status
      'fechaesta': '',
      'protasign': '', //varchar(1)
      //manejo
      'administrador': '',
      'instadmin': '',
      'diradmin1': '',
      'diradmin2': '',
      'ciudadadmin': '',
      'subnacadmin': '',
      'codpostaladmin': '',
      'telefadminist': '',
      'accesopub': '', //varchar(1)
      'instcoop': '',
      'commanejo': '',
      //elementos
     // 'lista_elementos': '',// lista de codigoe,nombres, status y codfuente
      //campos opcionales
      'amopc1': '',
      'amopc2': '',
      'amopc3': '',
      'amopc4': '',
      'amopc5': '',
      //mantenimiento del registro
      'respdatos': '',
      'actualizar': ''
    });

  }
  guardarArea() {
    console.log(this.areaManejoForm.value);
    var area = new area_Modelo();
    var areasManejadasBase=this.setAreasManejadas(this.areaManejoForm.value);
    area.codigoam = this.areaManejoForm.get('codigoam').value;
    area.nombream='prueba1';
    area.nomsitio='tikal';
    area.coordo='35º25""';
    area.comentario='areas';
    area.commanejo='good';
    area.respdatos="benita";
    this.addArea(areasManejadasBase);

  }
  setAreasManejadas(datos:area_Modelo): area_Modelo {
    datos.fechaesta = this.usuarioService.toFormato(this.areaManejoForm.get('fechaesta').value);
    datos.actualizar = this.usuarioService.toFormato(this.areaManejoForm.get('actualizar').value);
    return datos;
  }
  //agrega una nueva area
  addArea(area:area_Modelo): void {
    this.usuarioService.addArea(area)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Se registro el area  :${resElemento.codigoam}.`, 'success');
          //  this.crearFormLocalizacion_Elemento();
        }, err => {
          this.changeSuccessMessage('No se pudo regitrar el area.', 'primary');
        });
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }

}
