import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";

import { handlers } from "./handlers";

const app = express();

app.use(createMiddleware(...handlers));

const PORT = Number(process.env.MOCK_PORT ?? 3002);

app.listen(PORT, () => {
  console.log(`Mock server MSW escuchando en http://localhost:${PORT}`);
});
