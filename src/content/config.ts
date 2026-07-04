import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    series: z.string(),
    seriesNumber: z.number(),
    date: z.string(),
    readingTime: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const haikus = defineCollection({
  type: 'content',
  schema: z.object({
    number: z.number(),
    title: z.string().optional(),
    watch: z.string().optional(),
    brand: z.string(),
    date: z.string(),
  }),
});

const watches = defineCollection({
  type: 'content',
  schema: z.object({
    brand: z.string(),
    model: z.string(),
    reference: z.string(),
    spec: z.string(),
    status: z.enum(['available', 'sold']).default('available'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    relatedEssay: z.string().optional(),
  }),
});

export const collections = { essays, haikus, watches };