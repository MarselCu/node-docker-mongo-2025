import mongoose from "mongoose";

export const setupMongo = async ({ mongo }) => {

    const { protocol, username, password, database, url } = mongo;
    
    const connectionUri = `${protocol}${username}:${encodeURIComponent(password)}@${url}/${database}?authSource=admin`;

    try {
        await mongoose.connect(connectionUri);
    } catch (error) {
        throw new Error(error);
    }

}