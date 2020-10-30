import { getPerson } from "./person.service";

getPerson
  .then((value) => {
    console.log("SUCCESS", value);
  })
  .catch((error) => {
    // vu que la definition de TS pour les promises est assez nase, le type sur le catch est any
    console.error("FAILURE", error);
  });
