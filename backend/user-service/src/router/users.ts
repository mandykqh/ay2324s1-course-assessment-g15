import express from 'express';

import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/users';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.post('/users', addUser);
    router.patch('/users/:id', updateUser);
    router.delete('/users/:id', deleteUser);
}