import dotenv from 'dotenv'
import http from 'http'
import express, { Express, Request, Response, NextFunction } from 'express'
import { AppDataSource } from "./data-source"
import issuer from "./routes/issuer"
// import card from "./routes/card"
import cardController from "./controllers/card"

function requestTrace( req: Request, res: Response, next: NextFunction ) {
  var dateFormatted = new Date().toISOString().replace("T", " ");
  var h1 = '//****************************************************************************';
  console.log( `${h1}\n${dateFormatted}: ${req.method} ${req.protocol}://${req.headers["host"]}${req.originalUrl}` );
  console.log( `Headers:`)
  console.log(req.headers);
  next();
}

const router: Express = express()
dotenv.config()


/** Routers (called in order) */
router.use('/', requestTrace)
// router.use('/api', card)


// router.post('/api/issueCardRequest', function requestHandler(req, res) { res.send('ok'); });
router.post('/api/issueCardRequest', cardController.issueCardRequest);
router.use(express.static('public'))  

// router.use('/', issuer)


/** Error handling */
router.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
      message: error.message
  });
});

// Initializes the Datasource for TypeORM
AppDataSource.initialize().then(async () => {
/** Server */
  const httpServer = http.createServer(router);
  const PORT: any = process.env.PORT ?? 8090;
  httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
 }).catch((err) => {
  console.error(err.stack)
 })