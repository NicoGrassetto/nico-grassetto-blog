import { defineCollection, z, reference } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    image: image().optional(),
    description: z.string(),
  // When true, the post is hidden from listings, feeds, and routes
  draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
