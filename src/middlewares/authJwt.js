import jwt from 'jsonwebtoken';
import config from '../config';
import user from '../models/user';
import role from '../models/role';



export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];//gettin token from header
        if (!token) return res.status(403).json({ message: 'No token privider' });
        const decoded = jwt.verify(token, config.SECRET); //decoding the token with my secret key
        req.id = decoded.id; //userid = token decoded
        const myUser = await user.findById(req.id, { password: 0 }); // search the user
        if (!myUser) return res.status(404).json({ message: 'user not found' });
        // console.log(myUser);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
export const isModerator = async (req, res, next) => {
    const myUser = await user.findById(req.id);  // get the user
    const myRoles = await role.find({ _id: { $in: myUser.roles } }); // get the roles of the user
    console.log(myRoles);

    for (const item in myRoles) {
        if (item.name === 'moderator') next(); // if the user have the role can complete the request
    }
    return res.status(401).json({ message: 'moderator is required' });
}
export const isAdmin = async (req, res, next) => {
    const myUser = await user.findById(req.id);//same
    const myRoles = await role.find({ _id: { $in: myUser.roles } });
    console.log(myRoles);

    for (const item in myRoles) {
        if (item.name === 'admin') next();
    }
    return res.status(401).json({ message: 'moderator is required' });
}