import arcjet from "@arcjet/next";

export const ajClient = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], 
});
