import { z } from "zod";

export const NoParams = z.object({});

export const NoBody = z.undefined();

export const ParamNumber = z
  .string()
  .transform((val) => Number.parseInt(val, 10))
  .pipe(z.number());
