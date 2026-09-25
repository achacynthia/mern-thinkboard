import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectdb from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import rateLimiter from './middleware/ratelimiter.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());    // Middleware to parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use('/api', rateLimiter);
app.use("/api/notes", notesRoutes);

const frontendPath = path.join(__dirname, '..', 'Frontend', 'dist');

app.use(express.static(frontendPath));
app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api/')) {
        next();
        return;
    }

    res.sendFile(path.join(frontendPath, 'index.html'));
});



connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})



// 1:17:41