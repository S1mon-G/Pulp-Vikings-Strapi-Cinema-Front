import { api } from "./api";
import type { ActorsResponse, Actor } from "../types/actor";

export const actorService = {
  getActors: async (
    page: number = 1,
    pageSize: number = 25
  ): Promise<ActorsResponse> => {
    return api.get<ActorsResponse>("/actors", {
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    });
  },

  getRandomActors: async (pageSize: number = 25): Promise<ActorsResponse> => {
    return api.get<ActorsResponse>("/actors/random-list", {
      "pagination[pageSize]": pageSize,
    });
  },

  getActorById: async (id: number): Promise<Actor> => {
    return api.get<Actor>(`/actors/${id}`);
  },

  searchActors: async (query: string): Promise<ActorsResponse> => {
    return api.get<ActorsResponse>("/actors/search", { q: query });
  },
};
