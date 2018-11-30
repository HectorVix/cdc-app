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
  descripcion: string ="";
  comentario: string = ' ';
  autor: string = '';
  fecha: Date;
  public estadoEditar=false;



  constructor(private galleryService: GalleryService) {
  }

  ngOnInit() {
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

  imagenes: Image[] = [];
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
    if (!event || !event.button) {
      return;
    }
    if (event.button.type === ButtonType.DELETE) {
      this.imagenes = this.imagenes.filter((val: Image) => event.image && val.id !== event.image.id);
      console.log('onVisibleIndex result:' + index);
      var cont = 0;
      this.archivos.forEach(archivo => {

        if (cont == index) {
          this.archivos.delete(archivo);
          this.archivo.nativeElement.value = "";
          console.log("foto:", archivo.name, 'pos:', cont);

        }
        cont = cont + 1;
      });
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
  agregarImagen(file: File) {
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
  }
  anterior() {
    if (this.descripcionIndex == 0) {
      this.nuevoDatosFotos()
      this.setDatosFotos(this.descripcionIndex);
    }
    else {
      this.nuevoDatosFotos()
      this.descripcionIndex = this.descripcionIndex - 1;
      this.setDatosFotos(this.descripcionIndex);
    }
  }
  siguiente() {
    if (this.descripcionIndex == this.imagenes.length - 1) {
      this.nuevoDatosFotos()
      this.setDatosFotos(this.descripcionIndex);
    }
    else {
      this.nuevoDatosFotos()
      this.descripcionIndex = this.descripcionIndex + 1;
      this.setDatosFotos(this.descripcionIndex);
    }
  }

  onChanges() {
    this.estadoEditar=true;
    if (this.imagenes.length > 0) {
      this.datosFotografias[this.descripcionIndex] = {
        descripcion: this.descripcion,
        comentario: this.comentario,
        autor: this.autor,
        fecha: this.fecha,
      };
    }

  }
  setDatosFotos(index: number) {
    if (this.imagenes.length > 0) {
      if (this.datosFotografias[index]) {
        var datos = new foto_Modelo();
        datos = this.datosFotografias[index];
        this.descripcion = datos.descripcion;
        this.comentario = datos.comentario;
        this.autor = datos.autor;
        this.fecha = datos.fecha;
      }
    }
  }
  nuevoDatosFotos() {
    this.descripcion = '';
    this.comentario = '';
    this.autor = '';
    this.fecha = new Date();
  }
}
