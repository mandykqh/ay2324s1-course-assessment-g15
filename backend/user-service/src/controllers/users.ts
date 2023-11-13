import express from 'express';
import User from '../models/user';
import { handleValidationErrors } from '../utils/errorHandling';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(204).send('No users found');
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    return res.status(500).send('Internal server error');
  }
};

export const getUserByName = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (!user) {
      return res.status(404).send('No user with that Username found.');
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).send('Internal server error');
  }
};

export const addUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.create(req.body);
    if (req.body.role == 'ADMIN') {
      return res.status(403).send('Cannot create an admin user!');
    }
    return res.status(201).json(user);
  } catch (error) {
    console.error('Error adding user:', error);
    return handleValidationErrors(error, res);
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const userToUpdate = await User.findOne({ where: { username: req.params.username } });
    if (!userToUpdate) {
      return res.status(404).send('User not found');
    }
    userToUpdate.set(req.body);
    await userToUpdate.save();
    return res.status(200).json(userToUpdate);
  } catch (error) {
    console.error('Error updating user:', error);
    return handleValidationErrors(error, res);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const userToDelete = await User.findOne({ where: { username: req.params.username } });
    if (!userToDelete) {
      return res.status(404).send('User not found');
    }
    await userToDelete.destroy();
    return res.status(200).json(userToDelete);
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).send('Internal server error');
  }
};
