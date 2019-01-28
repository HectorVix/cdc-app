import { FormBuilder, FormGroup } from '@angular/forms';
import { fuente_Modelo } from '../../modelo/fuente/fuente-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class fuente_FormGroup {
    constructor() { }
    getFuente_FormGrup(row: fuente_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'fuenteId': row.fuenteId,
            'naturalezadocumento': row.naturalezadocumento,
            'codfuente': row.codfuente,
            'cita': row.cita,
            'archivado': row.archivado,
            'cobgeo': row.cobgeo,
            'coords': row.coords,
            'coordn': row.coordn,
            'coorde': row.coorde,
            'coordo': row.coordo,
            'resumen': row.resumen,
            'publicacioncdc': row.publicacioncdc,
            'valor': row.valor,
            'clave': row.clave,
            'comentario': row.comentario,
            'notadigest': row.notadigest,
            'actualizar': fechaServicio.getFecha(row.actualizar), //date
            'control': fechaServicio.getFecha(row.control),    //date
            'bcd': row.bcd,
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