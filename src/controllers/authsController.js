import user from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import role from '../models/role';

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body; //getting data
    const newUser = new user({
        userName: username, //I don't asign it directly because have differents names
        email,
        password: await user.encryptPassword(password) // calling the function from the user model
    });
    if (roles) {
        const foundRoles = await role.find({ name: { $in: roles } });
        console.log(foundRoles);
        if (foundRoles.length > 0) {
            newUser.roles = foundRoles.map(role => role._id);
        }
        else {
            const notRole = await role.findOne({ name: 'user' });
            newUser.roles = [notRole._id];
        }
    }
    else {
        const notRole = await role.findOne({ name: 'user' });
        newUser.roles = [notRole._id];
    }
    const userSaved = await newUser.save();
    const token = jwt.sign({
        id: userSaved.id
    },
        config.SECRET,
        { expiresIn: config.EXPIRES }
    );
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
    );
    res.json({ token });
}
