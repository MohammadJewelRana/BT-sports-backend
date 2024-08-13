import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  // validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.patch(
  '/:id',

  // validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.delete('/:id', UserControllers.deleteUser);

router.get('/:id', UserControllers.getSingleUser);

router.get('/', UserControllers.getAllUser);
router.post('/login', UserControllers.login);

export const UserRoutes = router;
