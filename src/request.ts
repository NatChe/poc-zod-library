import { ZodError } from "zod";

type Route = string;

type Success<ValidatedType> = {
  success: boolean;
  data: ValidatedType;
};

type Error = {
  success: boolean;
  error: ZodError;
};

type payloadValidationResult<ValidatedType> = Success<ValidatedType> | Error;

// should handle parameters validation also
type GetAPI<ValidatedType> = {
  route: Route;
  validatePayload: (payload: unknown) => payloadValidationResult<ValidatedType>;
};

export function makeGetRequest<ValidatedType>(
  getApiDefinition: GetAPI<ValidatedType>
) {
  return new Promise<ValidatedType>((resolve, reject) => {
    fetch(getApiDefinition.route)
      .then((response) => response.json())
      .then((json) => getApiDefinition.validatePayload(json))
      .then((validationResult: payloadValidationResult<ValidatedType>) => {
        if ("data" in validationResult) {
          resolve(validationResult.data);
        } else {
          reject(validationResult.error);
        }
      });
  });
}
