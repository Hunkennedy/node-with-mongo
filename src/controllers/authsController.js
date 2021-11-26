import user from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import role from '../models/role';

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const newUser = new user({
        userName: username,
        email,
        password: await user.encryptPassword(password)
    });
    if (roles) {
        const foundRoles = await role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    }
    else {
        const notRole = await role.findOne({ name: 'user' });
        newUser.roles = [notRole._id];
    }

    const userSaved = await newUser.save();
    console.log(userSaved);
    const token = jwt.sign({
        id: userSaved.id
    },
        config.SECRET,
        { expiresIn: config.EXPIRES }
    )
    res.json({ token });
}
export const signIn = async (req, res) => {
    const email = req.body.email;
    const userFound = await user.findOne({ email: email }).populate('roles');
    if (!userFound) return res.json({ message: "User nor found" });
    const match = await user.comparePassword(req.body.password, userFound.password);
    if (!match) return res.json({ token: match, message: 'User or Password invalid' });
    const token = jwt.sign({
        id: userFound._id
    },
        config.SECRET,
        { expiresIn: config.EXPIRES }
    )
    res.json({ token });
}
