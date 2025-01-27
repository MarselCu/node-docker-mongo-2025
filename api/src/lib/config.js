export default {
    port: process.env.PORT || 3000,

    /**
     * Rest API config
     */

    api: {
        prefix: '/api',

    },

    /**
     *  Routes Authorization
     */

    routes: {
        default: true,
        user: true,
    },

    mongo: {
        protocol: process.env.MONGO_PROTOCOL,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        database: process.env.MONGO_DB_NAME,
        url: process.env.MONGO_URL,
    },
}