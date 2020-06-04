import db from '../config/databases.ts'
import {
    ValidationError, validate,
    isString, isEmail, isRequired,
} from "https://deno.land/x/valideno/mod.ts"

const user = db.collection('users');
const validateStore = {
    name: isString(),
    email: isEmail(),
    password: isRequired(),
};

export default {
    async index(ctx: any) {
        const data = await user.find();
        ctx.response.body = data;
    },
    async show(ctx: any) {
        const data = await user.findOne({_id: { $oid: ctx.params.id}});
        ctx.response.body = data;
    },
    async store(ctx: any) {
        if (ctx.request.hasBody) {
            const {value} = await ctx.request.body();
            const errorsD: ValidationError[] = await validate(value, validateStore);
            console.log(errorsD);
            if (errorsD) {
                ctx.response.status = 404;
                ctx.response.body = errorsD;
            }
            const insertIn = await user.insertOne(value);
            ctx.response.status = 201;
            ctx.response.body = insertIn;
        } else {
            ctx.response.status = 400;
            ctx.response.body = {error: 'Please provide the required data'};
        }
    },
    update(ctx: any) {

    },
    destroy(ctx: any) {

    }
}