const { forwardTo } = require('prisma-binding');

const Query = {
    item: forwardTo('db'),
    items: forwardTo('db'),
    itemsConnection: forwardTo('db')
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.Query.items();

    //     return items;
    // },
};

module.exports = Query;
