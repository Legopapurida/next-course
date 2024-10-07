import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  followers: z.number().min(1).optional(),
});

export default schema;
