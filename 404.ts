export default (ctx: {response : any}) => {
    ctx.response.status = 404;
    ctx.response.body = {
        'error': 'Not Found',
    };
};