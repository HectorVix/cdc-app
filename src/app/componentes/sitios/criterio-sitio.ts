export class criterio_Sitio {
    //mapa del sitio
    mapasitio = ['',
        'S - Sí,se ha terminado un mapa del sitio que incluye todos los componentes requeridos.',
        'P - Un mapa parcial ha sido terminado.',
        'N - No existe (no se conoce) un mapa del sitio.'];
    /* los rangos 3 y 4 han sido omitidos de los criterios de rangoant ya que pierden su sentido 
    *en el contexto de  Sitios.
    */
    //rango anterior
    rangoant = ['',
        '1 - Elemento o ecosistema raro: un elemento G1 o G2 está presente.',
        '2 - Rasgo natural sobresaliente o terrenos no perturbados: un elemento G3, S1 o S2',
        '3 - ', //3 omitido
        '4 - ', //4 omitido
        '5 - Cualquier Sitio que no se ajusta a los criterios para una jerarquización "1" o "2" .'];
    //importancia de la diversidad biológica
    impdivbiol = ['',
        'E1 - Significado sobresaliente',
        'E2 - Significado alto',
        'E3 - Significado moderado',
        'E4 - Significado modesto',
        'E5 - No presenta un significado conocido, para la biodivirsidad'];
    //importancia  no relacionada con la bio-diversidad
    impnodivbiol = ['',
        'V1 - Valores sobresalientes en términos de la salud del ecosistema',
        'V2 - Valores altos.',
        'V3 - Valores moderados.',
        'V4 - Sin otro valores importantes discernibles o conocidos.',
        'V5 - Otros valores demostrablemente ausentes o valores negativos existentes'];
    //urgencia
    urgencia = ['',
        'U1 - Amenazado inmediatamente por severas fuerzas destructoras  --¡ ahora o nunca!.',
        'U2 - Amenaza u oportunidad especial esperada en un plazo de 5 años.',
        'U3 - Amenaza u oportunidad definible, pero no en los próximo 5 años.',
        'U4 - No se vislumbra amenaza u oportunidad conocidas en el futuro',
        'U5 - Protección del terreno completa o --¡no actuar en este sitio!.'];
    
    }