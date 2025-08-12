import { ArcjetClient } from "@arcjet/client";

export const ajClient = new ArcjetClient({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"],
});
