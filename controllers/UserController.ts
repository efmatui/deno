import db from '../config/databases.ts'
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts"
import validation from '../validation.ts';

const user = db.mongoDB().collection('users');
//deno run --allow-net --allow-write --allow-read --allow-plugin --unstable --inspect-brk=127.0.0.1:12345  main.ts
export default {
    async index(ctx: any) {
        const data = await user.find();
        ctx.response.body = data;
    },
    async show(ctx: any) {
        try {
            const data = await user.findOne({_id: ObjectId(ctx.params.id)});
            ctx.response.status = 200;
            ctx.response.body = data;
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = { message: { error: "User doesn't exist in our database" } };
        }
    },
    async store(ctx: any) {
        const value = await validation.validation(ctx)
        if (value) {
            const insertId = await user.insertOne(value);
            ctx.response.status = 201;
            ctx.response.body = insertId;
        }
    },
    async update(ctx: any) {
        const value = await validation.validateUpdate(ctx);
        if (value) {
            try {
                await user.updateOne({_id: ObjectId(ctx.params.id)}, {$set : value});
                ctx.response.status = 200;
                ctx.response.body = {message : 'updated'};
            } catch (error) {
                ctx.response.status = 404;
                ctx.response.body = { message: { error: "User doesn't exist in our database" } };
            }
        }
    },
    async destroy(ctx: any) {
        try {
            await user.deleteOne({ _id: ObjectId(ctx.params.id) });
            ctx.response.status = 204;
        } catch (error) {
            ctx.response.status = 404;
            ctx.response.body = { message: { error: "User doesn't exist in our database" } };
        }
    }
}