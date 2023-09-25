module.exports = {

    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "admin",
    DB: process.env.DB_NAME || "testdb",
    dialect: process.env.DB_DIALECT || "postgres",
    pool: {
        max: process.env.DB_POOL_MAX || 5,
        min: process.env.DB_POOL_MIN || 0,
        acquire: process.env.DB_POOL_ACQUIRE || 30000,
        idle: process.env.DB_POOL_IDLE || 10000,
        
    }
  };