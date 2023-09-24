import express from 'express';

import { getAllUsers, getUserByID, addUser, updateUser, deleteUser } from '../controllers/users';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.get('/users/:id', getUserByID);
    router.post('/users', addUser);
    router.patch('/users/:id', updateUser);
    router.delete('/users/:id', deleteUser);
}