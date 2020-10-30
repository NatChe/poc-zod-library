import { PersonSchema, Person, createPerson } from "./person.schema";
import { makeGetRequest } from "./request";
import { ZodError } from "zod";

function validatePersonData(
  data: unknown
): { success: true; data: Person } | { success: false; error: ZodError } {
  const result = PersonSchema.safeParse(data);

  if (!result.success) {
    return result;
  }

  const person = createPerson(result.data);

  return { ...result, data: person };
}

// should handle parameters validation also
const getPersonRouteDefinition = {
  route: "https://swapi.dev/api/people/1/",
  validatePayload: validatePersonData
};

export const getPerson = makeGetRequest(getPersonRouteDefinition);
