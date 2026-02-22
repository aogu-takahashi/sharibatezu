import mountainsData from "../data/mountains.json";

export type Mountain = {
  id: number;
  name: string;
  nameKana: string;
  prefecture: string;
  courseName: string;
  courseConstant: number;
};

export const mountains = mountainsData as Mountain[];

export function findById(id: number): Mountain | undefined {
  return mountains.find((m) => m.id === id);
}
