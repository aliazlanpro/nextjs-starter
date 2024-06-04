import { Hono } from "hono";
import auth from "./auth";
import hello from "./hello";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ message: "Internal Error" }, 500);
});

const routes = app.route("/auth", auth).route("/hello", hello);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
