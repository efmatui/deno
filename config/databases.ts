import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts"

const client = new MongoClient();

const db = client.database('account');
export default db;