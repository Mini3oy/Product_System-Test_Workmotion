import { Router } from 'express';
import { body } from 'express-validator';
import * as ctrl from '../controllers/categoryController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';


const router = Router();


router.get('/categories', asyncHandler(ctrl.getAll));
router.get('/category/:id', asyncHandler(ctrl.getOne));

router.post(
    '/category',
    [body('name').notEmpty().withMessage('name is required')],
    asyncHandler(ctrl.create)
);

router.put(
    '/category/:id',
    [body('name').notEmpty().withMessage('name is required')],
    asyncHandler(ctrl.update)
);
router.delete('/category/:id', asyncHandler(ctrl.remove));


export default router;