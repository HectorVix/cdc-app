import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  //archivos
  @ViewChild('file') archivo;
  public archivos: Set<File> = new Set();
  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
  }
 //Galeria
 imageIndex = 1;
 galleryId = 1;
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

 buttonsConfigDefault: ButtonsConfig = {
   visible: true,
   strategy: ButtonsStrategy.DEFAULT
 };
 buttonsConfigSimple: ButtonsConfig = {
   visible: true,
   strategy: ButtonsStrategy.SIMPLE
 };
 buttonsConfigAdvanced: ButtonsConfig = {
   visible: true,
   strategy: ButtonsStrategy.ADVANCED
 };
 buttonsConfigFull: ButtonsConfig = {
   visible: true,
   strategy: ButtonsStrategy.FULL
 };
 customButtonsConfigExtUrlNewTab: ButtonsConfig = {
   visible: true,
   strategy: ButtonsStrategy.CUSTOM,
   buttons: [
     {
       className: 'ext-url-image',
       type: ButtonType.EXTURL,
       extUrlInNewTab: true
     },
     {
       className: 'download-image',
       type: ButtonType.DOWNLOAD
     },
     {
       className: 'close-image',
       type: ButtonType.CLOSE
     }
   ]
 };

 customButtonsFontAwesomeConfig: ButtonsConfig = {
   visible: true,
   strategy: ButtonsStrategy.CUSTOM,
   buttons: [
     {
       className: 'fas fa-plus white',
       type: ButtonType.CUSTOM,
       ariaLabel: 'custom plus aria label',
       title: 'custom plus title',
       fontSize: '20px'
     },
     {
       className: 'fas fa-times white',
       type: ButtonType.CLOSE,
       ariaLabel: 'custom close aria label',
       title: 'custom close title',
       fontSize: '20px'
     },
     {
       className: 'fas fa-download white',
       type: ButtonType.DOWNLOAD,
       ariaLabel: 'custom download aria label',
       title: 'custom download title',
       fontSize: '20px'
     },
     {
       className: 'fas fa-external-link-alt white',
       type: ButtonType.EXTURL,
       ariaLabel: 'custom exturl aria label',
       title: 'custom exturl title',
       fontSize: '20px'
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
   console.log('Opening modal gallery from custom plain gallery row, with image: ', image);
   const index: number = this.getCurrentIndexCustomLayout(image, this.imagenes);
   this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(index, true) });
 }
 openImageModalRowDescription(image: Image) {
   console.log('Opening modal gallery from custom plain gallery row and description, with image: ', image);
   // const index: number = this.getCurrentIndexCustomLayout(image, this.imagenesRect);
   // this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
 }

 onButtonBeforeHook(event: ButtonEvent) {
   console.log('onButtonBeforeHook ', event);
   if (!event || !event.button) {
     return;
   }
   if (event.button.type === ButtonType.DELETE) {
     console.log('delete in app with imagenes count ' + this.imagenes.length);
     this.imagenes = this.imagenes.filter((val: Image) => event.image && val.id !== event.image.id);
   }
 }

 onButtonAfterHook(event: ButtonEvent) {
   console.log('onButtonAfterHook ', event);
   if (!event || !event.button) {
     return;
   }

 }

 onCustomButtonBeforeHook(event: ButtonEvent, galleryId: number | undefined) {
   console.log('onCustomButtonBeforeHook with galleryId=' + galleryId + ' and event: ', event);
   if (!event || !event.button) {
     return;
   }
   if (event.button.type === ButtonType.CUSTOM) {
     console.log('adding a new random image at the end');
     this.addImage();

     setTimeout(() => {
       this.galleryService.openGallery(galleryId, this.imagenes.length - 1);
     }, 0);
   }
 }

 onCustomButtonAfterHook(event: ButtonEvent, galleryId: number | undefined) {
   console.log('onCustomButtonAfterHook with galleryId=' + galleryId + ' and event: ', event);
   if (!event || !event.button) {
     return;
   }
 }

 onImageLoaded(event: ImageModalEvent) {
   console.log('onImageLoaded action: ' + Action[event.action]);
   console.log('onImageLoaded result:' + event.result);
 }

 onVisibleIndex(event: ImageModalEvent) {
   console.log('onVisibleIndex action: ' + Action[event.action]);
   console.log('onVisibleIndex result:' + event.result);
 }

 onIsFirstImage(event: ImageModalEvent) {
   console.log('onIsFirstImage onfirst action: ' + Action[event.action]);
   console.log('onIsFirstImage onfirst result:' + event.result);
 }

 onIsLastImage(event: ImageModalEvent) {
   console.log('onIsLastImage onlast action: ' + Action[event.action]);
   console.log('onIsLastImage onlast result:' + event.result);
 }

 onCloseImageModal(event: ImageModalEvent) {
   console.log('onClose action: ' + Action[event.action]);
   console.log('onClose result:' + event.result);
   this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(-1, true) });
   this.customPlainGalleryColumnConfig = Object.assign({}, this.customPlainGalleryColumnConfig, { layout: new AdvancedLayout(-1, true) });
   this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(-1, true) });
 }

 onShowAutoCloseExample(event: ImageModalEvent, galleryId: number) {
   console.log(`onShowAutoCloseExample with id=${galleryId} action: ` + Action[event.action]);
   console.log('onShowAutoCloseExample result:' + event.result);
   console.log('Starting timeout of 3 second to close modal gallery automatically');
   setTimeout(() => {
     console.log('setTimeout end - closing gallery with id=' + galleryId);
     this.galleryService.navigate.closed;
   }, 3000);
 }

 addImage() {
   const imageToCopy: Image = this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
   const newImage: Image = new Image(this.imagenes.length - 1 + 1, imageToCopy.modal, imageToCopy.plain);
   this.imagenes = [...this.imagenes, newImage];
 }

 openModalViaService(id: number | undefined, index: number) {
   console.log('opening gallery with index ' + index);
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
       img: this.base64String
     });
     const nuevaImagen: Image = new Image(this.imagenes.length - 1 + 1, imagen.modal, imagen.plain);
     this.imagenes = [...this.imagenes, nuevaImagen]
   }
 }
}
