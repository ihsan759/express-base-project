const Content = `
import cookieParser from 'cookie-parser';
import express from 'express';
import { connectDB } from './config/db.js';
import { env } from 'node:process';
import ErrorHandler from './middlewares/errorHandler.js';
import { HttpException } from './utils/httpExceptions.js';
import { AppRoutes } from './routes/appRoutes.js';

const app = express();
const PORT = env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', AppRoutes);

// Handling routes not found
app.use((_req, res, next) => {
	next(new HttpException(404, 'Route not found'));
});

// Error handling
app.use((err, req, res, next) => {
	ErrorHandler(err, req, res, next);
});

// Initializing the server
const initializeApp = async () => {
	try {
		app.listen(PORT, () => {
			console.log(
				\`[server]: server is running at http://localhost:\${PORT}/api\`
			);
		});
		await connectDB();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

initializeApp();
`.trimStart();

export default Content;
