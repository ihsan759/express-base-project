const Content = `
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.send('Hello from Express!');
});

export { router as AppRoutes };
`.trimStart();

export default Content;
