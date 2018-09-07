import { Valor } from '../../modelo/select/overwiew-valor';
export class criterio_Sitio {
    mapasitio: Valor[] = [
        { value: 'S', viewValue: 'Sí,se ha terminado un mapa del sitio que incluye todos los componentes requeridos.' },
        { value: 'P', viewValue: 'Un mapa parcial ha sido terminado.' },
        { value: 'N', viewValue: 'No existe (no se conoce) un mapa del sitio.' }
    ];

    rangoant: Valor[] = [
        { value: '1', viewValue: 'Elemento o ecosistema raro: un elemento G1 o G2 está presente.' },
        { value: '2', viewValue: 'Rasgo natural sobresaliente o terrenos no perturbados: un elemento G3, S1 o S2' },
        { value: '5', viewValue: 'Cualquier Sitio que no se ajusta a los criterios para una jerarquización "1" o "2" .' }

    ];
    impdivbiol: Valor[] = [
        { value: 'E1', viewValue: 'Significado sobresaliente.' },
        { value: 'E2', viewValue: 'Significado alto.' },
        { value: 'E3', viewValue: 'Significado moderado.' },
        { value: 'E4', viewValue: 'Significado modesto.' },
        { value: 'E5', viewValue: 'No presenta un significado conocido, para la biodivirsidad.' }
    ];
    impnodivbiol: Valor[] = [
        { value: 'V1', viewValue: 'Valores sobresalientes en términos de la salud del ecosistema.' },
        { value: 'V2', viewValue: 'Valores altos.' },
        { value: 'V3', viewValue: 'Valores moderados.' },
        { value: 'V4', viewValue: 'Sin otro valores importantes discernibles o conocidos.' },
        { value: 'V5', viewValue: 'Otros valores demostrablemente ausentes o valores negativos existentes.' }
    ];
    urgencia: Valor[] = [
        { value: 'U1', viewValue: 'Amenazado inmediatamente por severas fuerzas destructoras  --¡ Ahora o nunca!.' },
        { value: 'U2', viewValue: 'Amenaza u oportunidad especial esperada en un plazo de 5 años.' },
        { value: 'U3', viewValue: 'Amenaza u oportunidad definible, pero no en los próximo 5 años.' },
        { value: 'U4', viewValue: 'No se vislumbra amenaza u oportunidad conocidas en el futuro.' },
        { value: 'U5', viewValue: 'Protección del terreno completa o --¡No actuar en este sitio!.' }
    ];
}
