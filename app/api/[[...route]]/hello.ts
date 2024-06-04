import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.json({ hello: "world" });
});

export default app;
