import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export async function GET(context: { site: URL }) {
  const blog = await getCollection('blog');
  const sorted = blog.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${siteConfig.name} - Engineering Blog`,
    description: siteConfig.tagline,
    site: context.site || siteConfig.siteUrl,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
