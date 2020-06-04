import { Application } from "https://deno.land/x/oak/mod.ts"
import { config } from "https://deno.land/x/dotenv/mod.ts"
import router from "./routes.ts";
import notFound from "./404.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts"

const client = new MongoClient();

const db = client.database('account');
const users = db.collection('users');
users.insertOne({name : "John Titer"});

const env = config();
const app = new Application();
const HOST = env.APP_HOST || 'http://localhost'
const PORT = +env.APP_PORT || 4000;

app.use(router.routes());
app.use(notFound);

console.log(`server is started at ${HOST}:${PORT}`)
console.log(env);

await app.listen({port : PORT});