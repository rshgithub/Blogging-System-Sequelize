"use strict";
// src/routes/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoute = void 0;
const express_1 = __importDefault(require("express"));
const indexRoute = express_1.default.Router();
exports.indexRoute = indexRoute;
// Route to render index.ejs
indexRoute.get('/', (req, res) => {
    try {
        const message = 'Welcome to the Blogging System API!';
        res.status(200).send(message);
    }
    catch (err) {
        console.error('Error rendering index.ejs:', err);
        res.status(500).send('Internal Server Error');
    }
});
