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
    'nav.main': 'Main',
    'a11y.newTab': '(opens in a new tab)',

    'hero.role': 'Software Developer',
    'hero.blurb':
      'I build web products end to end — interfaces that stay legible under load and back ends that keep their promises.',
    'hero.ctaHire': 'Get in touch',
    'hero.ctaWork': 'See projects',
    'hero.figScale': 'Ratio 4:5',
    'hero.portraitAlt': 'Portrait of Bruno Martinez',

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
    'projects.imagePending': 'Screenshot pending',
    // {title} is the project title.
    'projects.imageAlt': 'Screenshot of {title}',

    'contact.title': 'Contact me',
    'contact.blurb':
      "Got a project, a role, or a question? Send a note and I'll come back to you within a couple of days.",
    'contact.cv': 'Download CV (PDF)',
    'contact.fieldName': 'Name',
    'contact.fieldMail': 'Email',
    'contact.fieldMsg': 'Message',
    'contact.submit': 'Send message',
    'contact.sending': 'Sending…',
    'contact.sentTitle': 'Message sent',
    'contact.sentBody':
      "Thanks — your message is on its way. I'll reply to the address you gave.",
    'contact.sendAnother': 'Send another message',
    'contact.noScript': 'This form needs JavaScript to send. You can reach me on LinkedIn instead.',
    'contact.errNameRequired': 'Enter your name.',
    'contact.errMailRequired': 'Enter your email address.',
    'contact.errMsgRequired': 'Write a message.',
    'contact.errMail': 'Enter an email address like name@example.com.',
    'contact.errShort': 'Tell me a little more — at least 10 characters.',
    // {max} is the field's character limit.
    'contact.errLong': 'Use {max} characters or fewer.',
    'contact.errServer': "Your message didn't send. Try again, or reach me on LinkedIn.",
    'contact.errCaptcha': 'Complete the security check, then send again.',
    'contact.errRate': 'Too many messages from this connection. Wait about 10 minutes, then try again.',

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
    'nav.main': 'Principal',
    'a11y.newTab': '(se abre en una pestaña nueva)',

    'hero.role': 'Desarrollador de Software',
    'hero.blurb':
      'Construyo productos web de punta a punta: interfaces que se leen bien bajo presión y back ends que cumplen lo que prometen.',
    'hero.ctaHire': 'Contactame',
    'hero.ctaWork': 'Ver proyectos',
    'hero.figScale': 'Ratio 4:5',
    'hero.portraitAlt': 'Retrato de Bruno Martinez',

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
    'projects.imagePending': 'Captura pendiente',
    'projects.imageAlt': 'Captura de pantalla de {title}',

    'contact.title': 'Contacto',
    'contact.blurb':
      '¿Tenés un proyecto, una búsqueda o una consulta? Escribime y te respondo en un par de días.',
    'contact.cv': 'Descargar CV (PDF)',
    'contact.fieldName': 'Nombre',
    'contact.fieldMail': 'Mail',
    'contact.fieldMsg': 'Mensaje',
    'contact.submit': 'Enviar mensaje',
    'contact.sending': 'Enviando…',
    'contact.sentTitle': 'Mensaje enviado',
    'contact.sentBody':
      'Gracias — tu mensaje está en camino. Te respondo a la dirección que dejaste.',
    'contact.sendAnother': 'Enviar otro mensaje',
    'contact.noScript': 'Este formulario necesita JavaScript para enviarse. Si no, escribime por LinkedIn.',
    'contact.errNameRequired': 'Ingresá tu nombre.',
    'contact.errMailRequired': 'Ingresá tu mail.',
    'contact.errMsgRequired': 'Escribí un mensaje.',
    'contact.errMail': 'Ingresá un mail como nombre@ejemplo.com.',
    'contact.errShort': 'Contame un poco más — al menos 10 caracteres.',
    'contact.errLong': 'Usá {max} caracteres o menos.',
    'contact.errServer': 'Tu mensaje no se envió. Probá de nuevo o escribime por LinkedIn.',
    'contact.errCaptcha': 'Completá la verificación de seguridad y enviá de nuevo.',
    'contact.errRate': 'Demasiados mensajes desde esta conexión. Esperá unos 10 minutos y probá de nuevo.',

    'footer.note': 'Diseñado y desarrollado por Bruno Martinez',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
