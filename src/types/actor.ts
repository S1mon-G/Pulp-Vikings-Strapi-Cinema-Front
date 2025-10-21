import type { StrapiResponse } from "./strapi";

export interface Actor {
  id: number;
  documentId: string;
  birth_date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  img: string;
  name: string;
  tmdb_id: number;
}

export type ActorsResponse = StrapiResponse<Actor>;
