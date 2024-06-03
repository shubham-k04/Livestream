const userService = require("./service");
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            if(await userService.isUsernameExists(req.body.username) && await userService.isEmailExists(req.body.email)){
                res.code(400);
                return {
                    message: 'username or email exists',
                };
            }

            const user = await userService.create(req.body);
            res.code(201);
            return {
                message: 'user registration is successful',
                data: {user}
            }
        } catch (err) {
            res.code(500);
            return {
                err,
            };
        }
    },

    login: async(req, res) => {
        try {
            const user = await userService.findByUsername(req.body.username);
            if(!user){
                res.code(400);
                return {
                    message: 'username is incorrect',
                };
            }
            if(!await userService.comparePassword(req.body.password, user.password)){
                res.code(400);
                return {
                    message: 'incorrect login details',
                };
            }

            const token = jwt.sign({id: user._id}, 'thisIsaPrivate')
            res.code(200);
            return {
                message: 'user logged in successfully',
                data: {
                    user,
                    token,
                },
            };

        } catch (err) {
            res.code(500);
            return {
                err,
            };
        }
    },
};