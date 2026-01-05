import express from 'express'
import User from '../models/user.model'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({users})
  } catch (error) {
    console.log('Error in getting all users');
    return res.status(500).json({message: error.message})
  }
}

export const getOneUser = async (req, res) => {
  try {
    const oneUser = await User.findById(req.params.id);
    return res.status(200).json(oneUser)
  } catch (error) {
    console.log('Error in getting single user');
    return res.status(500).json({msg: error.msg})
  }
}

