const {User} = require('../model');
const httpRes = require('../helpers/httpRes');
const flaverr = require('flaverr');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw flaverr('E_BAD_REQUEST', Error('please provide username and password'))
        }

        const result = await User.findOne({ username: username })

        if (!result) {
            throw flaverr('E_UNAUTHORIZED', Error('Invalide credentials'))
        }

        const isPasswordCorrect = await result.comparePassword(password);

        if (!isPasswordCorrect) {
            throw flaverr('E_UNAUTHORIZED', Error('Invalid credentials'))
        }

        const payload = {
            user_id: result._id,
            username: result.username,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        const data = {
            user: payload,
            token
        }
        return httpRes(res, 200, data)
    } catch (err) {
        return next(err)
    }
}

const register = async (req, res, next) => {
    try {
        const { name, username, password } = req.body;

        const checkUsername = await User.findOne({ username })

        if (checkUsername) {
            throw flaverr('E_BAD_REQUEST', Error('User already registered'));
        }

        const userData = {
            name,
            username,
            password,
        }

        await User.create(userData);

        return httpRes(res, 201)
    } catch (err) {
        return next(err)
    }
}

const Index = async (req, res, next) => {
    try {
        const user = await User.find()

        if (!user.length) {
            throw flaverr('E_NOT_FOUND', Error('User not found'));
        }

        return httpRes(res, 200, user)

    } catch (err) {
        return next(err)
    }
}

const FindById = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById(id);

        if (!user) {
            throw flaverr('E_NOT_FOUND', Error('User not found'));
        }

        return httpRes(res, 200, user)
    } catch (err) {
        return next(err)
    }
}

const Update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, username, password } = req.body;

        const user = await User.findById(id);

        if (!user) {
            throw flaverr('E_NOT_FOUND', Error('user id not found'));
        }

        const checkUsername = await User.findOne({username});

        if (checkUsername) {
            throw flaverr('E_BAD_REQUEST', Error('Username already exist'))
        }

        user.name = name;
        user.username = username;
        
        if (password) {
            user.password = password;
        }
   
       
        await user.save({ runValidators: false });

            return httpRes(res, 200);
    } catch (err) {
        return next(err)
    }
}

const Delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)

        if (!user) {
            throw flaverr('E_NOT_FOUND', Error('user id not found '));
        }

        await User.deleteOne(user);

        return httpRes(res, 200);
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    Index,
    FindById,
    Update,
    Delete,
    register,
    login
}