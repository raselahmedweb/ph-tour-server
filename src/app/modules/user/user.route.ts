import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { Role } from "./user.interface";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { AnyZodObject } from "zod/v3";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema as unknown as AnyZodObject),
  UserController.createUser,
);
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserController.getAllUsers,
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema as unknown as AnyZodObject),
  checkAuth(...Object.values(Role)),
  UserController.updateUser,
);
// /api/v1/user/:id
export const UserRoutes = router;
