import { error, redirect } from '@sveltejs/kit';
import { portfolioItems } from '$lib/data/portfolio';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return portfolioItems.map((p) => ({ slug: p.slug }));
};

export const load: PageLoad = ({ params }) => {
  // Alias redirects
  if (params.slug === 'laundry-management') {
    throw redirect(301, '/project/laundry');
  }
  if (params.slug === 'pos-kopi-seruni') {
    throw redirect(301, '/project/kopi-seruni');
  }

  const project = portfolioItems.find((p) => p.slug === params.slug);

  if (!project) {
    throw error(404, `Project "${params.slug}" tidak ditemukan.`);
  }

  // Rekomendasi project lain (prioritaskan tipe project yang sama)
  const sameType = portfolioItems.filter(
    (p) => p.slug !== params.slug && p.projectType === project.projectType
  );
  const otherType = portfolioItems.filter(
    (p) => p.slug !== params.slug && p.projectType !== project.projectType
  );
  const relatedProjects = [...sameType, ...otherType].slice(0, 2);

  return {
    project,
    relatedProjects
  };
};
