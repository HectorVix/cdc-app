export class criterioSitio {
    //mapa del sitio
    mapasitio = ['',
        'Sí,se ha terminado un mapa del sitio que incluye todos los componentes requeridos.',
        'Un mapa parcial ha sido terminado.',
        'No existe (no se conoce) un mapa del sitio.'];
    /* los rangos 3 y 4 han sido omitidos de los criterios de rangoant ya que pierden su sentido 
    *en el contexto de  Sitios.
    */
    //rango anterior
    rangoant = ['',
        'Elemento o ecosistema raro: un elemento G1 o G2 está presente.',
        'Rasgo natural sobresaliente o terrenos no perturbados: un elemento G3, S1 o S2, o una Localización del Elemento con rango A o B está presente',
        '', //3 omitido
        '', //4 omitido
        'Cualquier Sitio que no se ajusta a los criterios para una jerarquización "1" o "2" .'];
    //importancia de la diversidad biológica
    impdivbiol = ['',
        'Significado sobresaliente',
        'Significado alto',
        'Significado moderado',
        'Significado modesto',
        'No presenta un significado conocido, para la biodivirsidad'];
    //importancia  no relacionada con la bio-diversidad
    impnodivbiol = ['',
        'Valores sobresalientes en términos de la salud del ecosistema,la recreación, la estética, la planeación racional de la comunidad, etc.',
        'Valores altos.',
        'Valores moderados.',
        'Sin otro valores importantes discernibles o conocidos.',
        'Otros valores demostrablemente ausentes o valores negativos existentes y/u otros valores del sitio son incompatibles con la conservación biológica del terreno'];
    //urgencia
    urgencia = ['',
        'Amenazado inmediatamente por severas fuerzas destructoras o sobresale una oportunidad inmediata de protección (en el término de un año a la fecha del rango) --¡ ahora o nunca!.',
        'Amenaza u oportunidad especial esperada en un plazo de 5 años.',
        'Amenaza u oportunidad definible, pero no en los próximo 5 años.',
        'No se vislumbra amenaza u oportunidad conocidas en el futuro',
        'Protección del terreno completa o existen razones adecuadas para no proteger el sitio --¡no actuar en este sitio!.'];
    
    }