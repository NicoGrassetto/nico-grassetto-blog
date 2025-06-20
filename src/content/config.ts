import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  blog,
};
