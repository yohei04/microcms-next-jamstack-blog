import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'pg-blog',
  apiKey: process.env.API_KEY as string,
});
