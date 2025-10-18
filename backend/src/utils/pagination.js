export const paginate = async (Model, { page = 1, limit = 10, filter = {}, select = null, populate = null, sort = { createdAt: -1 } }) => {
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
        Model.find(filter).select(select).populate(populate).sort(sort).skip(skip).limit(Number(limit)),
        Model.countDocuments(filter)
    ]);
    return {
        items,
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
    };
};