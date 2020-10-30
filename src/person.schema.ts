import * as z from "zod";

// defining the validation schema
export const PersonSchema = z
  .object({
    name: z.string(),
    height: z.string(),
    mass: z.string(),
    hair_color: z.string(),
    skin_color: z.string(),
    eye_color: z.string(),
    birth_year: z.string()
  })
  .nonstrict();

// infer the Person type with zod
type PersonRaw = z.infer<typeof PersonSchema>;

// define the type that will be returned
export type Person = {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
};

export const createPerson = (data: PersonRaw): Person => ({
  name: data.name,
  height: data.height,
  mass: data.height,
  hairColor: data.hair_color,
  skinColor: data.skin_color,
  eyeColor: data.eye_color,
  birthYear: data.birth_year
});
