import express from 'express';
import User from '../models/user';

// Todo: more descriptive error handling or documentation
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(404).send('No users found');
        }
        if (users.length === 0) {
            return res.status(204);
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        return res.status(500).send('Internal server error');
    }
};

export const addUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).send('Internal server error');
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const userToUpdate = await User.findOne( { where: { id: req.params.id } } );
        if (!userToUpdate) {
            return res.status(404).send('User not found');
        }
        // This approach works, but returns the number of rows updated instead of the updated user
        // const user = await User.update(req.body, {
        //     where: {
        //         id: req.params.id,
        //     },
        // });
        userToUpdate.set(req.body);
        await userToUpdate.save();
        return res.status(200).json(userToUpdate);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).send('Internal server error');
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const userToDelete = await User.findOne( { where: { id: req.params.id } } );
        if (!userToDelete) {
            return res.status(404).send('User not found');
        }
        userToDelete.destroy();
        return res.status(200).json(userToDelete);
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send('Internal server error');
    }
}