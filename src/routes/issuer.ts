/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/issuer';
const router = express.Router();

router.get('/issuancerequest', controller.getIssuanceRequest);

export = router;