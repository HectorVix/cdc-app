import { Component, ViewChild, OnInit } from '@angular/core';
import {
  AccessibilityConfig,
  Action,
  AdvancedLayout,
  ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy,
  ButtonType,
  Description,
  DescriptionStrategy,
  DotsConfig,
  GalleryService,
  GridLayout,
  Image,
  ImageModalEvent,
  LineLayout,
  PlainGalleryConfig,
  PlainGalleryStrategy,
  PreviewConfig
} from 'angular-modal-gallery';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { foto_Modelo } from '../../modelo/fotoDatos/foto-datos';
import { FooterRowOutlet } from '@angular/cdk/table';
import { UsuarioService } from '../../servicios/usuario.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  //archivos
  @ViewChild('file') archivo;
  public archivos: Set<File> = new Set();
  public baseFotoModelo: Array<foto_Modelo> = new Array();
  private tam_inicial = 0;
  //Galeria
  imageIndex = 1;
  galleryId = 1;
  descripcionIndex = 0;
  public datosFotografias = [];
  //datos Foto
  descripcion: string = '';
  comentario: string = '';
  autor: string = '';
  fecha: NgbDateStruct;
  //imagenes
  imagenes: Image[] = [];
  fotoElemento: File;
  posicionarse = 1;
  //alertas
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  constructor(private galleryService: GalleryService, private usuarioService: UsuarioService, ) {
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
  }

  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  customPlainGalleryColumnConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  plainGalleryRow: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '80px', height: '80px' }, { length: 2, wrap: true }, 'flex-start')
  };
  plainGalleryRowSpaceAround: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '50px', height: '50px' }, { length: 2, wrap: true }, 'space-around')
  };
  plainGalleryRowATags: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '95px', height: '63px' }, { length: 4, wrap: true }, 'flex-start'),
    advanced: { aTags: true, additionalBackground: '50% 50%/cover' }
  };

  plainGalleryColumn: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.COLUMN,
    layout: new LineLayout({ width: '50px', height: '50px' }, { length: 3, wrap: true }, 'flex-start')
  };

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '80px', height: '80px' }, { length: 7, wrap: true })
  };

  dotsConfig: DotsConfig = {
    visible: false
  };

  customDescription: Description = {
    strategy: DescriptionStrategy.ALWAYS_VISIBLE,
    imageText: 'Look this image ',
    numberSeparator: ' of ',
    beforeTextDescription: ' => '
  };

  customDescriptionStyle: Description = {
    strategy: DescriptionStrategy.ALWAYS_VISIBLE,
    imageText: 'Look this image ',
    numberSeparator: ' of ',
    beforeTextDescription: ' => ',
    style: {
      bgColor: 'rgba(255,0,0,.5)',
      textColor: 'blue',
      marginTop: '3px',
      marginBottom: '0px',
      marginLeft: '5px',
      marginRight: '5px',
      position: 'absolute',
      top: '0px',
      height: '25px'
    }
  };
  customDescriptionHideIfEmpty: Description = {
    strategy: DescriptionStrategy.HIDE_IF_EMPTY,
    imageText: 'Look this image ',
    numberSeparator: ' of ',
    beforeTextDescription: ' => '
  };
  customFullDescription: Description = {
    strategy: DescriptionStrategy.ALWAYS_VISIBLE,
    customFullDescription: 'Custom description of the current visible image'
  };

  customFullDescriptionHidden: Description = {
    strategy: DescriptionStrategy.ALWAYS_HIDDEN,
    customFullDescription: 'Custom description of the current visible image'

  };


  personalizadoButtons: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      {
        className: 'delete-image',
        type: ButtonType.DELETE,
        title: 'Eliminar',
        fontSize: '30px'
      },
      {
        className: 'download-image',
        type: ButtonType.DOWNLOAD,
        title: 'Descargar',
        fontSize: '30px'
      },
      {
        className: 'close-image',
        type: ButtonType.CLOSE,
        title: 'Cerrar',
        fontSize: '30px'
      }
    ]
  };

  previewConfigOneImage: PreviewConfig = {
    visible: true,
    number: 1
  };
  previewConfigNoArrows: PreviewConfig = {
    visible: true,
    arrows: false
  };
  previewConfigNoClickable: PreviewConfig = {
    visible: true,
    clickable: false
  };
  previewConfigAlwaysCenter: PreviewConfig = {
    visible: true
  };

  previewConfigCustomSize: PreviewConfig = {
    visible: true,
    size: { width: '30px', height: '30px' }
  };
  accessibilityConfig: AccessibilityConfig = {
    backgroundAriaLabel: 'CUSTOM Modal gallery full screen background',
    backgroundTitle: 'CUSTOM background title',
    plainGalleryContentAriaLabel: 'CUSTOM Plain gallery content',
    plainGalleryContentTitle: 'CUSTOM plain gallery content title',
    modalGalleryContentAriaLabel: 'CUSTOM Modal gallery content',
    modalGalleryContentTitle: 'CUSTOM modal gallery content title',
    loadingSpinnerAriaLabel: 'CUSTOM The current image is loading. Please be patient.',
    loadingSpinnerTitle: 'CUSTOM The current image is loading. Please be patient.',
    mainContainerAriaLabel: 'CUSTOM Current image and navigation',
    mainContainerTitle: 'CUSTOM main container title',
    mainPrevImageAriaLabel: 'CUSTOM Previous image',
    mainPrevImageTitle: 'CUSTOM Previous image',
    mainNextImageAriaLabel: 'CUSTOM Next image',
    mainNextImageTitle: 'CUSTOM Next image',
    dotsContainerAriaLabel: 'CUSTOM Image navigation dots',
    dotsContainerTitle: 'CUSTOM dots container title',
    dotAriaLabel: 'CUSTOM Navigate to image number',
    previewsContainerAriaLabel: 'CUSTOM Image previews',
    previewsContainerTitle: 'CUSTOM previews title',
    previewScrollPrevAriaLabel: 'CUSTOM Scroll previous previews',
    previewScrollPrevTitle: 'CUSTOM Scroll previous previews',
    previewScrollNextAriaLabel: 'CUSTOM Scroll next previews',
    previewScrollNextTitle: 'CUSTOM Scroll next previews'
  };
  openImageModalRow(image: Image) {
    const index: number = this.getCurrentIndexCustomLayout(image, this.imagenes);
    this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(index, true) });
  }
  openImageModalRowDescription(image: Image) {
  }

  onButtonBeforeHook(event: ButtonEvent, index: number) {
    //si se eliminan varias seguidas o solo 1
    const posActual: number = this.getCurrentIndexCustomLayout(event.image, this.imagenes);
    if (!event || !event.button) {
      return;
    }
    if (event.button.type === ButtonType.DELETE) {
      this.imagenes = this.imagenes.filter((val: Image) => event.image && val.id !== event.image.id);
      var cont = 0;
      var datosFotos = [];
      var ordenNuevo = 0;
      switch (posActual) {
        case -1: break; // cuando se buguea la posActual es -1
        default: {
          for (let i = 0; i < this.datosFotografias.length; i++) {
            if (i != posActual) {//todos menos el que se elimino
              var baseFotoModelo = new foto_Modelo();
              baseFotoModelo = this.datosFotografias[i];
              datosFotos[ordenNuevo] = {
                descripcion: baseFotoModelo.descripcion,
                comentario: baseFotoModelo.comentario,
                autor: baseFotoModelo.autor,
                fecha: this.usuarioService.getFecha(baseFotoModelo.fecha),
                editado: true
              };
              ordenNuevo = ordenNuevo + 1;
            }
          }
          this.descripcionIndex = 0;
          this.datosFotografias = datosFotos;
          if (this.datosFotografias.length == 0) {
            this.nuevoDatosFotos();
          }
          this.archivos.forEach(archivo => {
            if (cont == posActual) {
              this.archivos.delete(archivo);
              this.archivo.nativeElement.value = "";
            }
            cont = cont + 1;
          });
        } break;
      }
    }
  }
  mostrar_Datos_PosActual(posActual) {
    if (this.datosFotografias.length > 0) {
      this.descripcionIndex = posActual;
      this.posicionarse = this.descripcionIndex + 1;
      var datoFotoModeloActual = new foto_Modelo();
      datoFotoModeloActual = this.datosFotografias[posActual];
      this.descripcion = datoFotoModeloActual.descripcion;
      this.comentario = datoFotoModeloActual.comentario;
      this.autor = datoFotoModeloActual.autor;
      this.fecha = this.usuarioService.getFecha(datoFotoModeloActual.fecha);
    }
  }

  onButtonAfterHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }

  }

  onCustomButtonBeforeHook(event: ButtonEvent, galleryId: number | undefined) {
    if (!event || !event.button) {
      return;
    }
  }

  onCustomButtonAfterHook(event: ButtonEvent, galleryId: number | undefined) {
    if (!event || !event.button) {
      return;
    }
  }

  onImageLoaded(event: ImageModalEvent) {
  }

  onVisibleIndex(event: ImageModalEvent) {
  }

  onIsFirstImage(event: ImageModalEvent) {
  }

  onIsLastImage(event: ImageModalEvent) {
  }

  onCloseImageModal(event: ImageModalEvent) {
    this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(-1, true) });
    this.customPlainGalleryColumnConfig = Object.assign({}, this.customPlainGalleryColumnConfig, { layout: new AdvancedLayout(-1, true) });
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(-1, true) });
  }

  onShowAutoCloseExample(event: ImageModalEvent, galleryId: number) {
    setTimeout(() => {
      this.galleryService.navigate.closed;
    }, 3000);
  }


  openModalViaService(id: number | undefined, index: number) {
    this.galleryService.openGallery(id, index);
  }

  trackById(index: number, item: Image) {
    return item.id;
  }

  private getCurrentIndexCustomLayout(image: Image, imagenes: Image[]): number {
    return image ? imagenes.indexOf(image) : -1;
  }
  //archivos
  agregarArchivos() {
    this.archivo.nativeElement.click();
  }
  onFilesAdded() {
    var archivos: { [key: string]: File } = this.archivo.nativeElement.files;
    for (let key in archivos) {
      if (!isNaN(parseInt(key))) {
        this.archivos.add(archivos[key]);
        this.agregarImagen(archivos[key]);
      }
    }

  }
  base64String = '';
  public agregarImagen(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (onLoadPhotoEvent: any) => {
      this.base64String = onLoadPhotoEvent.target.result;
      var imagen = new Image(0, {
        img: this.base64String,
        description: ''
      });
      const nuevaImagen: Image = new Image(this.imagenes.length - 1 + 1, imagen.modal, imagen.plain);
      this.imagenes = [...this.imagenes, nuevaImagen]
      this.nuevo_Editar_DatosFotos(this.imagenes.length - 1);
    }
  }
  public agregarImagenBusqueda(file: File, fotoModelo) {
    this.archivos.add(file);
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (onLoadPhotoEvent: any) => {
      this.base64String = onLoadPhotoEvent.target.result;
      var imagen = new Image(0, {
        img: this.base64String,
        description: ''
      });
      const nuevaImagen: Image = new Image(this.imagenes.length - 1 + 1, imagen.modal, imagen.plain);
      this.imagenes = [...this.imagenes, nuevaImagen]
    }
    this.datosFotografias[fotoModelo.posicion] = {
      descripcion: fotoModelo.descripcion,
      comentario: fotoModelo.comentario,
      autor: fotoModelo.autor,
      fecha: this.usuarioService.getFecha(fotoModelo.fecha),
      editado: true
    };
  }
  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }
  anterior() {
    if (this.descripcionIndex == 0) {
      this.nuevoDatosFotos();
      this.mostrar_Datos_PosActual(this.descripcionIndex);
    }
    else {
      this.nuevoDatosFotos();
      this.descripcionIndex = this.descripcionIndex - 1;
      this.mostrar_Datos_PosActual(this.descripcionIndex);
    }
  }
  siguiente() {
    if (this.descripcionIndex == this.imagenes.length - 1) {
      this.nuevoDatosFotos();
      this.mostrar_Datos_PosActual(this.descripcionIndex);
    }
    else {
      this.nuevoDatosFotos();
      this.descripcionIndex = this.descripcionIndex + 1;
      this.mostrar_Datos_PosActual(this.descripcionIndex);
    }
  }
  inicio() {
    this.mostrar_Datos_PosActual(0);
  }
  fin() {
    if (this.datosFotografias.length >= 1)
      this.mostrar_Datos_PosActual(this.datosFotografias.length - 1);
  }
  onChanges() {
    if (this.imagenes.length > 0) {
      this.datosFotografias[this.descripcionIndex] = {
        descripcion: this.descripcion,
        comentario: this.comentario,
        autor: this.autor,
        fecha: this.fecha,
        editado: true
      };
    }

  }
  nuevo_Editar_DatosFotos(index: number) {
    this.datosFotografias[index] = {
      descripcion: '',
      comentario: '',
      autor: '',
      fecha: '',
      editado: true
    };
  }
  nuevoDatosFotos() {
    this.descripcion = '';
    this.comentario = '';
    this.autor = '';
    this.fecha = null;
  }
  public mostrarDatosInicio(descripcion, comentario, autor, fecha) {
    this.descripcion = descripcion;
    this.comentario = comentario;
    this.autor = autor;
    this.fecha = this.usuarioService.getFecha(fecha);
  }
  public nuevo() {
    this.archivo.nativeElement.value = "";
    this.archivos = new Set();
    this.baseFotoModelo = new Array();
    this.tam_inicial = 0;
    //Galeria
    this.imageIndex = 1;
    this.galleryId = 1;
    this.descripcionIndex = 0;
    this.datosFotografias = [];
    //datos Foto
    this.descripcion = '';
    this.comentario = '';
    this.autor = '';
    this.fecha = null;
    this.imagenes = [];
    this.posicionarse = 1;
  }

  public getTam_final_ListaFotos() {
    return this.datosFotografias.length;
  }
  mostrar_Imagen_Posicion() {
    if (validarEntero(this.posicionarse) && this.posicionarse > 0 && this.posicionarse <= this.datosFotografias.length && this.datosFotografias.length >= 1 && this.datosFotografias.length >= 1)
      this.mostrar_Datos_PosActual(this.posicionarse - 1);
    else { this.changeSuccessMessage('Error: Ingresa un número valido. Por ejemplo 1 , 2 , 3 ... 4 ... 15 ... 70 ... , tambien debe estar dentro del rango del número de tu lista de fotos. ', 'primary'); }
  }
  //mensajes
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
}
function validarEntero(x) {
  if (Number.isInteger(x)) {
    return true;
  }
  return false;
}