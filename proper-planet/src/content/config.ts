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

const artifacts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    demo: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = {
  blog,
  artifacts,
};
