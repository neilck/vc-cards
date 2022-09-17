import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const issuer_callback = async (req: Request, res: Response, next: NextFunction) => {
    console.log('issuer_callback')

     // return response
     return res.status(200).json({
        message: "Okay"
    });
};

export default {issuer_callback}