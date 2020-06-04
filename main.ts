import { Application } from "https://deno.land/x/oak/mod.ts"
import { config } from "https://deno.land/x/dotenv/mod.ts"
import router from "./routes.ts";
import notFound from "./404.ts";
import {init, MongoClient} from "https://deno.land/x/mongo@v0.6.0/mod.ts"

await init();
const client = new MongoClient();
client.connectWithUri("mongodb+srv://soulhana:@T$0o73592@cluster0-vuo5t.mongodb.net/test?retryWrites=true&w=majority");

const db = client.database('account');
const users = db.collection('users');
const env = config();
const app = new Application();
const HOST = env.APP_HOST || 'http://localhost'
const PORT = +env.APP_PORT || 4000;


app.use(router.routes());
app.use(notFound);

console.log(`server is started at ${HOST}:${PORT}`)
console.log(env);

await app.listen({port : PORT});