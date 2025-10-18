import { Router } from "express";
import { body } from "express-validator";
import * as ctrl from "../controllers/productController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = Router();

router.get("/products", asyncHandler(ctrl.getAll)); // ?page=1&limit=10&search=abc&categoryId=...
router.get("/product/:id", asyncHandler(ctrl.getOne));
router.post(
  "/product",
  [
    body("name").notEmpty().withMessage("name is required"),

    body("price").isFloat({ min: 0 }).withMessage("price must be >= 0"),
    body("stock").isInt({ min: 0 }).withMessage("stock must be >= 0"),

    body("categoryId").notEmpty().withMessage("categoryId is required"),
  ],
  asyncHandler(ctrl.create)
);
router.put(
  "/product/:id",
  [
    body("name").optional().notEmpty(),
    body("price").optional().isFloat({ min: 0 }),
    body("stock").optional().isInt({ min: 0 }),
  ],
  asyncHandler(ctrl.update)
);
router.delete("/product/:id", asyncHandler(ctrl.remove)); // ?hard=true

export default router;
