/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/issuer';
import controller_callback from '../controllers/issuer_callback'
const router = express.Router();

router.get('/issuancerequest', controller.getIssuanceRequest);
router.post('/issuer_callback', controller_callback.issuer_callback)

export = router;