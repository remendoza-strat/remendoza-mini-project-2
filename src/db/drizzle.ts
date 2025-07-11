import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";

// setup drizzle and neon
const connectionString = process.env.DATABASE_URL;
if(!connectionString) throw new Error("DATABASE_URL is not defined");
const sql = neon(connectionString);
export const db = drizzle(sql);