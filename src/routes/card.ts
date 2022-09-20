/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/card';
const router = express.Router();

router.post('api/issueCardRequest', controller.issueCardRequest);
export = router;