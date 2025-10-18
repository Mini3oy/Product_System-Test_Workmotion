import { validationResult } from 'express-validator';
import * as service from '../services/productService.js';


export const getAll = async (req, res) => {
    const data = await service.listProducts(req.query);
    res.json({ success: true, ...data });
};


export const getOne = async (req, res) => {
    const item = await service.getProduct(req.params.id);
    if (!item || item.isDeleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, item });
};


export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ success: false, errors: errors.array() });
    const item = await service.createProduct(req.body);
    res.status(201).json({ success: true, item });
};


export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ success: false, errors: errors.array() });
    const item = await service.updateProduct(req.params.id, req.body);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, item });
};


export const remove = async (req, res) => {
    const hard = req.query.hard === 'true';
    const item = await service.deleteProduct(req.params.id, hard);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, item });
};