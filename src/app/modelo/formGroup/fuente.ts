import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { fuente_Modelo } from '../../modelo/fuente/fuente-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class fuente_FormGroup {
    constructor() { }
    getFuente_FormGrup(row: fuente_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        var val_publicacioncdcAux = row.publicacioncdc;
        var val_publicacioncdc = "";
        //no deja asignar directamente el  valor por el 3 valor que es cuando se selecciona --Ninguna--
        if (val_publicacioncdcAux == true)
            val_publicacioncdc = "" + true;
        if (val_publicacioncdcAux == false)
            val_publicacioncdc = "" + false;
        return fb.group({
            'fuenteId': row.fuenteId,
            'naturalezadocumento': row.naturalezadocumento,
            'codfuente': new FormControl(row.codfuente, Validators.maxLength(10)),
            'cita': new FormControl(row.cita, Validators.maxLength(240)),
            'archivado': new FormControl(row.archivado, Validators.maxLength(60)),
            'cobgeo': new FormControl(row.cobgeo, Validators.maxLength(50)),
            'coords': new FormControl(row.coords, Validators.maxLength(6)),
            'coordn': new FormControl(row.coordn, Validators.maxLength(6)),
            'coorde': new FormControl(row.coorde, Validators.maxLength(7)),
            'coordo': new FormControl(row.coordo, Validators.maxLength(7)),
            'resumen': new FormControl(row.resumen, Validators.maxLength(240)),
            'publicacioncdc': val_publicacioncdc,
            'valor': row.valor,
            'clave': new FormControl(row.clave, Validators.maxLength(120)),
            'comentario': new FormControl(row.comentario, Validators.maxLength(120)),
            'notadigest': new FormControl(row.notadigest, Validators.maxLength(120)),
            'actualizar': fechaServicio.getFecha(row.actualizar), //date
            'control': fechaServicio.getFecha(row.control),    //date
            'bcd': new FormControl(row.bcd, Validators.maxLength(3)),
            //tema columna 1
            'comunnat': row.comunnat,
            'comunterr': row.comunterr,
            'bosque': row.bosque,
            'sabana': row.sabana,
            'prado': row.prado,
            'chaparral': row.chaparral,
            'desierto': row.desierto,
            'alpino': row.alpino,
            'otroterr': row.otroterr,
            'comunac': row.comunac,
            'palustre': row.palustre,
            'lacustre': row.lacustre,
            'fluvial': row.fluvial,
            'estuarino': row.estuarino,
            'maritimo': row.maritimo,
            'subterr': row.subterr,
            //tema columna 2 
            'flora': row.flora,
            'floraac': row.floraac,
            'floraterr': row.floraterr,
            'plnovasc': row.plnovasc,
            'plvasc': row.plvasc,
            'microorg': row.microorg,
            'infositio': row.infositio,
            //tema columna 3
            'fauna': row.fauna,
            'faunaac': row.faunaac,
            'faunaterr': row.faunaterr,
            'moluscos': row.moluscos,
            'insectos': row.insectos,
            'crustaceos': row.crustaceos,
            'otroartrop': row.otroartrop,
            'otroinvert': row.otroinvert,
            'peces': row.peces,
            'anfibios': row.anfibios,
            'reptiles': row.reptiles,
            'aves': row.aves,
            'mamiferos': row.mamiferos,
            'cienfisic': row.cienfisic,
            'fisiotopo': row.fisiotopo,
            //tema columna 4
            'hidrol': row.hidrol,
            'geologia': row.geologia,
            'suelos': row.suelos,
            'clima': row.clima,
            'biologia': row.biologia,
            'ecologia': row.ecologia,
            'funecol': row.funecol,
            'diversnat': row.diversnat,
            'inventario': row.inventario,
            'tecinvest': row.tecinvest,
            'am': row.am,
            'planmanejo': row.planmanejo,
            'tecmanejo': row.tecmanejo,
            'estimpamb': row.estimpamb,
            'organprott': row.organprott,
            'herrprot': row.herrprot
        });
    }

}