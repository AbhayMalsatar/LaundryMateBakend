import { ZodError } from "zod";

interface FormattedZodError {
  field: string;
  message: string;
}

const formatZodError = (error: ZodError): FormattedZodError[] => {
  return error._zod.def.map(err => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

export default formatZodError;
