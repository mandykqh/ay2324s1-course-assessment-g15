import User from '../models/user';

export const initAdminProfile = async () => {
    const admin = await User.findOne({ where: { username: 'admin' } });
    if (!admin) {
        await User.create({
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            email: 'admin@gmail.com',
            role: 'ADMIN',
        })
        console.log('Admin profile not found! Created one using provided credentials in env variables.')
    } else {
        console.log('Admin profile found.')
    }
}