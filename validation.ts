export default {
    async validation(ctx: any)
    {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = { error: 'Please provide the required data' };
            return ;
        }
        const {value} = await ctx.request.body();

        const fields = ['name', 'email', 'password'];

        for (let index = 0; index < fields.length; index++) {
            if (!value[fields[index]]) {
                ctx.response.status = 422;
                ctx.response.body = {
                    error: {
                        message: `${fields[index]} field is required`
                    }
                };
                return;
            }
        }
        return value;
    },

    async validateUpdate(ctx: any)
    {
        const {value} = await ctx.request.body();

        if (!value || Object.keys(value).length === 0) {
            ctx.response.status = 400;
            ctx.response.body = { error: 'Please provide the required data' };
            return ;
        }

        return value;
    }
}