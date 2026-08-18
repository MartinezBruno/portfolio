/*
  UI copy dictionary — lifted wholesale from the prototype's COPY object
  (design/Portfolio.dc.html). This is the complete EN/ES translation file.
  Project descriptions are per-language and live in src/data/projects.ts;
  titles, stacks and image paths are shared.
*/

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.language': 'Language',
    'nav.skip': 'Skip to content',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',

    'hero.role': 'Software Developer',
    'hero.blurb':
      'I build web products end to end — interfaces that stay legible under load and back ends that keep their promises.',
    'hero.ctaHire': 'Get in touch',
    'hero.ctaWork': 'See the work',
    'hero.figScale': 'Ratio 4:5',

    'spec.roleK': 'Role',
    'spec.roleV': 'Developer',
    'spec.focusK': 'Focus',
    'spec.focusV': 'Web apps',
    'spec.stackK': 'Core stack',
    'spec.stackV': 'JS · PHP · React',
    'spec.statusK': 'Status',
    'spec.statusV': 'Open to work',

    'about.title': 'About me',
    'about.p1':
      "I'm a software developer working across the full stack: JavaScript and React on the front, PHP and Node on the back, and the plumbing in between.",
    'about.p2':
      'I like problems with constraints — a schema that has to hold, a page that has to load on a bad connection, a form that has to be honest with the person filling it in. I read the spec, draw the thing, then build it.',
    'about.toolsTitle': 'Tools & technologies',

    'projects.title': 'Projects',
    'projects.viewPage': 'View page',
    'projects.viewCode': 'View code',
    'projects.imagePending': 'Image pending',

    'contact.title': 'Contact me',
    'contact.blurb':
      "Got a project, a role, or a question? Send a note and I'll come back to you within a couple of days.",
    'contact.cv': 'Download CV',
    'contact.fieldName': 'Name',
    'contact.fieldMail': 'Email',
    'contact.fieldMsg': 'Message',
    'contact.submit': 'Submit',
    'contact.sending': 'Sending…',
    'contact.sentTitle': 'Message sent',
    'contact.sentBody':
      "Thanks — your message is on its way. I'll reply to the address you gave.",
    'contact.sendAnother': 'Send another',
    'contact.errRequired': 'This field is required.',
    'contact.errMail': 'Enter a valid email address.',
    'contact.errShort': 'Tell me a little more — 10 characters minimum.',
    'contact.errServer': 'Something went wrong sending your message. Please try again.',
    'contact.errLong': 'This is a little too long.',
    'contact.errCaptcha': 'Please complete the verification and try again.',
    'contact.errRate': 'Too many attempts. Please wait a few minutes and try again.',

    'footer.note': 'Designed & developed by Bruno Martinez',
  },
  es: {
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.language': 'Idioma',
    'nav.skip': 'Saltar al contenido',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',

    'hero.role': 'Desarrollador de Software',
    'hero.blurb':
      'Construyo productos web de punta a punta: interfaces que se leen bien bajo presión y back ends que cumplen lo que prometen.',
    'hero.ctaHire': 'Contactame',
    'hero.ctaWork': 'Ver el trabajo',
    'hero.figScale': 'Ratio 4:5',

    'spec.roleK': 'Rol',
    'spec.roleV': 'Desarrollador',
    'spec.focusK': 'Enfoque',
    'spec.focusV': 'Apps web',
    'spec.stackK': 'Stack principal',
    'spec.stackV': 'JS · PHP · React',
    'spec.statusK': 'Estado',
    'spec.statusV': 'Disponible',

    'about.title': 'Sobre mí',
    'about.p1':
      'Soy desarrollador de software y trabajo en todo el stack: JavaScript y React del lado del cliente, PHP y Node del lado del servidor, y toda la cañería del medio.',
    'about.p2':
      'Me gustan los problemas con restricciones: un esquema que tiene que aguantar, una página que tiene que cargar con mala conexión, un formulario que tiene que ser honesto con quien lo completa. Leo la especificación, dibujo la solución y después la construyo.',
    'about.toolsTitle': 'Herramientas y tecnologías',

    'projects.title': 'Proyectos',
    'projects.viewPage': 'Ver página',
    'projects.viewCode': 'Ver código',
    'projects.imagePending': 'Imagen pendiente',

    'contact.title': 'Contacto',
    'contact.blurb':
      '¿Tenés un proyecto, una búsqueda o una consulta? Escribime y te respondo en un par de días.',
    'contact.cv': 'Descargar CV',
    'contact.fieldName': 'Nombre',
    'contact.fieldMail': 'Mail',
    'contact.fieldMsg': 'Mensaje',
    'contact.submit': 'Enviar',
    'contact.sending': 'Enviando…',
    'contact.sentTitle': 'Mensaje enviado',
    'contact.sentBody':
      'Gracias — tu mensaje está en camino. Te respondo a la dirección que dejaste.',
    'contact.sendAnother': 'Enviar otro',
    'contact.errRequired': 'Este campo es obligatorio.',
    'contact.errMail': 'Ingresá un mail válido.',
    'contact.errShort': 'Contame un poco más — mínimo 10 caracteres.',
    'contact.errServer': 'Hubo un problema al enviar tu mensaje. Probá de nuevo.',
    'contact.errLong': 'Esto es un poco demasiado largo.',
    'contact.errCaptcha': 'Completá la verificación e intentá de nuevo.',
    'contact.errRate': 'Demasiados intentos. Esperá unos minutos y probá otra vez.',

    'footer.note': 'Diseñado y desarrollado por Bruno Martinez',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
