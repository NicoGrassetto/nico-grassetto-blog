import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    description: z.string(),
  // When true, the post is hidden from listings, feeds, and routes
  draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
