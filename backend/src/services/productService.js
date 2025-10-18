import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { paginate } from '../utils/pagination.js';


export const listProducts = (q) => {
    const { page = 1, limit = 10, search = '', categoryId } = q;
    const filter = { isDeleted: false };
    if (search) filter.name = { $regex: search, $options: 'i' }; // RegEx search
    if (categoryId) filter.categoryId = categoryId;
    return paginate(Product, {
        page,
        limit,
        filter,
        populate: { path: 'categoryId', select: 'name' },
        sort: { createdAt: -1 }
    });
};


export const getProduct = async (id) => Product.findById(id).populate('categoryId', 'name');


export const createProduct = async (payload) => {
    const exists = await Category.findOne({ _id: payload.categoryId, isDeleted: false });
    if (!exists) throw new Error('Category not found');
    return Product.create({
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        description: payload.description ?? '',
        categoryId: payload.categoryId
    });
};


export const updateProduct = async (id, payload) => {
    if (payload.categoryId) {
        const exists = await Category.findOne({ _id: payload.categoryId, isDeleted: false });
        if (!exists) throw new Error('Category not found');
    }
    return Product.findByIdAndUpdate(
        id,
        { $set: { ...payload } },
        { new: true }
    );
};


export const deleteProduct = async (id, hard = false) => {
    if (hard) return Product.findByIdAndDelete(id);
    return Product.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
};