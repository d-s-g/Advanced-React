const Mutations = {
    async createItem(parent, args, ctx, info) {
        // check if user is logged in

        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },
    async updateItem(parent, args, ctx, info) {
        // check if user is logged in

        const item = await ctx.db.mutation.updateItem({
            data: {
                title: args.title,
                description: args.description,
                price: args.price,
                image: args.image,
                largeImage: args.largeImage
            },
            where: {
                id: args.id
            }
        }, info);

        return item;
    },
    async deleteItem(parent, args, ctx, info) {
        //get item id and title for clicked item
        const item = await ctx.db.query.item({where: args.where}, `{id title}`);
        // check if user is logged in
        //delete item
        return await ctx.db.mutation.deleteItem({where: args.where}, info);
    }
};

module.exports = Mutations;
