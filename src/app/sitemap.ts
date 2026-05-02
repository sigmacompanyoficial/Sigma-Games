import { MetadataRoute } from 'next';
import { games } from '@/data/games';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://djposaxa.vercel.app';

  // Páginas estáticas
  const routes = ['', '/privacy', '/terms', '/login', '/profile'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Páginas de juegos dinámicas
  const gameRoutes = games.map((game) => ({
    url: `${baseUrl}/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...gameRoutes];
}
