import { redirect } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return [
    { slug: 'puskesmas-wonokerto' },
    { slug: 'pos-wonopringgo' }
  ];
};

export const load: PageLoad = ({ params }) => {
  throw redirect(301, `/project/${params.slug}`);
};
