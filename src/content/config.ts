import { defineCollection, z, reference } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    image: image().optional(),
  // When true, the post is hidden from listings, feeds, and routes
  draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
