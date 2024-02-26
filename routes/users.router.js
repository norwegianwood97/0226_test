import express from 'express';
import User from '../schemas/users.schema.js';
import Joi from 'joi';

const router = express.Router();

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    pw: Joi.string().required(),
});

// 회원 등록 API
router.post('/users', async (req, res, next) => {
    try {
        const { name, email, pw } = await createUserSchema.validateAsync(req.body);
        const user = new User({
            name,
            email,
            pw,
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// 회원 목록 조회 API
router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        
        const response = users.map(user => ({
            userId: user._id,
            name: user.name,
            email: user.email,
            pw: user.pw,
        }));
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});


// 개별 회원 조회 API
router.get('/users/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
        }
        
        const response = {
            userId: user._id,
            name: user.name,
            email: user.email,
            pw: user.pw,
        };
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default router;