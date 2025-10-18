import Category from '../models/Category.js';
import { paginate } from '../utils/pagination.js';


export const listCategories = (q) => {
    const { page = 1, limit = 10, search = '' } = q;
    const filter = { isDeleted: false };
    if (search) filter.name = { $regex: search, $options: 'i' }; // RegEx search
    return paginate(Category, { page, limit, filter, sort: { createdAt: -1 } });
};


export const getCategory = async (id) => Category.findById(id);


export const createCategory = async (payload) => {
    return Category.create({ name: payload.name, description: payload.description ?? '' });
};


export const updateCategory = async (id, payload) => {
    return Category.findByIdAndUpdate(
        id,
        { $set: { name: payload.name, description: payload.description ?? '' } },
        { new: true }
    );
};


export const deleteCategory = async (id, hard = false) => {
    if (hard) return Category.findByIdAndDelete(id);
    return Category.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
};