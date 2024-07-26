"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const indexRoute_1 = require("./routes/indexRoute");
const userRoutes_1 = require("./routes/userRoutes");
const logger_1 = require("./middlewares/logger");
const errorHandler_1 = require("./middlewares/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_1.logger); // Use the logger middleware
// Routes
app.use('/', indexRoute_1.indexRoute);
app.use('/api/users', userRoutes_1.userRoutes);
// Error handling middleware (should be after all other middleware and routes)
app.use(errorHandler_1.errorHandler);
// Sync database and start server
const startServer = async () => {
    try {
        const sequelize = new sequelize_1.Sequelize({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            define: {
                // Ensure table names are not pluralized
                freezeTableName: true,
            },
        });
        const models = (0, models_1.initModels)(sequelize);
        await sequelize.sync({ force: true }); // { force: true } for development only to drop and recreate tables    console.log('Database synchronized');
        console.log('Database & tables created!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to start the server:', error);
    }
};
startServer();
