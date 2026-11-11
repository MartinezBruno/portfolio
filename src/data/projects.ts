/*
  Project data — lifted from the prototype's PROJECTS array. `desc` is
  per-language; everything else is shared. Images live in src/assets/images
  and are imported so astro:assets can resize and re-encode them at build.
  A missing `img` renders the hatched "image pending" placeholder.

  The primary action is `live` when there is a public URL; projects without
  one (e.g. a bot) provide a `gallery` that opens in a dialog instead.
*/
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';
import instablogsImg from '../assets/images/project-instablogs.png';
import martImg from '../assets/images/project-mart.png';
import discordEmbedImg from '../assets/images/project-discord-embed.png';
import discordRolesImg from '../assets/images/project-discord-roles.png';

export interface GalleryItem {
  img: ImageMetadata;
  caption: Record<Lang, string>;
}

export interface Project {
  n: string;
  title: string;
  /** Imported screenshot, or undefined to render the "image pending" placeholder. */
  img?: ImageMetadata;
  /** Overrides the default "Screenshot of {title}" alt, e.g. when `img` is a mockup. */
  imgAlt?: Record<Lang, string>;
  stack: string[];
  desc: Record<Lang, string>;
  live?: string;
  /** Screenshots shown in a dialog; used as the primary action when there is no `live` URL. */
  gallery?: GalleryItem[];
  code: string;
}

export const projects: Project[] = [
  {
    n: '01',
    title: 'InstaBlogs',
    img: instablogsImg,
    stack: ['Next.js', 'React', 'Prisma', 'NextAuth'],
    desc: {
      en: 'A blogging platform: sign in, write and edit posts with images, reply in comment threads and browse author profiles. Built on the Next.js App Router with its own REST API.',
      es: 'Una plataforma de blogs: iniciás sesión, escribís y editás posts con imágenes, respondés en hilos de comentarios y recorrés perfiles de autor. Hecha con el App Router de Next.js y una API REST propia.',
    },
    // TODO: restore `live: 'https://instablogs.vercel.app'` and retake the
    // screenshot once the site's images load again (its Firebase Storage
    // bucket returns 402; see FIXES.md in the Instablogs repo).
    code: 'https://github.com/MartinezBruno/Instablogs',
  },
  {
    n: '02',
    title: 'Portfolio “Mart”',
    img: martImg,
    stack: ['Astro', 'TypeScript', 'Tailwind', 'GSAP'],
    desc: {
      en: 'A bilingual portfolio for a graphic designer: projects synced from Behance, motion that respects reduced-motion settings and a spam-protected contact form.',
      es: 'Un portfolio bilingüe para una diseñadora gráfica: proyectos sincronizados desde Behance, animaciones que respetan el movimiento reducido y un formulario protegido contra spam.',
    },
    live: 'https://martifernandez.com',
    code: 'https://github.com/MartinezBruno/designer-portfolio',
  },
  {
    n: '03',
    title: 'Discord Role Bot',
    img: discordEmbedImg,
    imgAlt: {
      en: 'Mockup of the Discord Role Bot role picker',
      es: 'Mockup del selector de roles de Discord Role Bot',
    },
    stack: ['Node.js', 'discord.js', 'Express'],
    desc: {
      en: 'A Discord bot that posts a role picker: members react with a game’s emoji to get its role, and remove the reaction to drop it.',
      es: 'Un bot de Discord que publica un selector de roles: cada miembro reacciona con el emoji de un juego para recibir su rol, y lo pierde al quitar la reacción.',
    },
    // A bot has no public page, so the card opens these instead of a link.
    // They are HTML recreations of the bot's real embed, not live captures,
    // and the captions say so.
    gallery: [
      {
        img: discordEmbedImg,
        caption: {
          en: 'The -reactionrole command posts the picker embed and seeds one reaction per role. Recreated mockup.',
          es: 'El comando -reactionrole publica el embed del selector y agrega una reacción por rol. Mockup recreado.',
        },
      },
      {
        img: discordRolesImg,
        caption: {
          en: 'Reacting assigns the matching roles; removing the reaction takes them away. Recreated mockup.',
          es: 'Al reaccionar se asignan los roles correspondientes; al quitar la reacción se retiran. Mockup recreado.',
        },
      },
    ],
    code: 'https://github.com/MartinezBruno/discord-bots',
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
