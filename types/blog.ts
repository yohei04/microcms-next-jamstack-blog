import { CategoryType } from './category';

export type BlogType = {
  id: number;
  title: string;
  body: string;
  categories: CategoryType[];
  publishedAt: string;
};
