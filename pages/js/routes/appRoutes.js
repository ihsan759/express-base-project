const Content = `
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.send('Hello from Express!');
});

export { router as AppRoutes };
`.trimStart();

export default Content;
