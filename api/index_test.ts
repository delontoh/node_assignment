import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

/**
 * Default router home page
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Node API');
});

module.exports = router;
