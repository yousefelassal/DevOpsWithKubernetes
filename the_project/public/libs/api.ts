import { treaty } from "@elysiajs/eden";

import type { app } from "@server";

const apiUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export const api = treaty<typeof app>(apiUrl);
