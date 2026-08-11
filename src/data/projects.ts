/*
  Project data — lifted from the prototype's PROJECTS array. `desc` is
  per-language; everything else is shared. Images live in /public/images.
  An empty `img` renders the hatched "image pending" placeholder.

  TODO (content): real `live` / `code` URLs (all "#" today) and a screenshot
  for project 03 (Task Board).
*/
import type { Lang } from '../i18n/ui';

export interface Project {
  n: string;
  title: string;
  /** Path under /public, or '' to render the "image pending" placeholder. */
  img: string;
  stack: string[];
  desc: Record<Lang, string>;
  live: string;
  code: string;
}

export const projects: Project[] = [
  {
    n: '01',
    title: 'InstaBlogs',
    img: '/images/project-instablogs.png',
    stack: ['JavaScript', 'PHP', 'MySQL'],
    desc: {
      en: 'A publishing platform with a card-based feed, author profiles and a lightweight editor. Server-rendered, no framework.',
      es: 'Una plataforma de publicación con feed en tarjetas, perfiles de autor y un editor liviano. Renderizado en servidor, sin framework.',
    },
    live: '#',
    code: '#',
  },
  {
    n: '02',
    title: 'Portfolio “Mart”',
    img: '/images/project-mart.png',
    stack: ['HTML', 'CSS', 'JavaScript'],
    desc: {
      en: 'A one-page portfolio built for a designer: scroll-driven sections, a hand-rolled gallery and a contact form that validates in place.',
      es: 'Un portfolio de una página para una diseñadora: secciones guiadas por scroll, galería propia y un formulario que valida en el lugar.',
    },
    live: '#',
    code: '#',
  },
  {
    n: '03',
    title: 'Task Board',
    img: '',
    stack: ['React', 'Node', 'PostgreSQL'],
    desc: {
      en: 'A kanban board for small teams — drag-and-drop columns, optimistic updates and a REST API behind it.',
      es: 'Un tablero kanban para equipos chicos: columnas con drag-and-drop, actualizaciones optimistas y una API REST por detrás.',
    },
    live: '#',
    code: '#',
  },
];

/** Shared skill chips for the About panel. */
export const skills: string[] = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'PHP',
  'MySQL',
  'PostgreSQL',
  'Git',
  'Figma',
  'REST APIs',
];

/** Contact links — all real (CV served from /public). */
export const contactLinks = {
  linkedin: 'https://www.linkedin.com/in/bmartinez-dev/',
  github: 'https://github.com/MartinezBruno',
  cv: '/bruno-martinez-cv.pdf',
};
