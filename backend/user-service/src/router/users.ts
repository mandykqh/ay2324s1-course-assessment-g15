import express from 'express';

import { getAllUsers, addUser, updateUser, deleteUser, getUserByName } from '../controllers/users';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.get('/users/:username', getUserByName);
    router.post('/users', addUser);
    router.patch('/users/:username', updateUser);
    router.delete('/users/:username', deleteUser);
}