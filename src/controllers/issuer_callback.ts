import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const issuer_callback = async (req: Request, res: Response, next: NextFunction) => {
    console.log('issuer_callback')

    var body = '';
    req.on('data', function (data) {
        body += data;
        console.log("request on data")
        console.log( data )
    });

    req.on('end', function () {
        /*     if ( req.headers['api-key'] != apiKey ) {
            res.status(401).json({
                'error': 'api-key wrong or missing'
                });  
            return; 
            } */

        var issuanceResponse = JSON.parse(body.toString());
        console.log( issuanceResponse )
        res.send()

        /* var message: any = null;
        // there are 2 different callbacks. 1 if the QR code is scanned (or deeplink has been followed)
        // Scanning the QR code makes Authenticator download the specific request from the server
        // the request will be deleted from the server immediately.
        // That's why it is so important to capture this callback and relay this to the UI so the UI can hide
        // the QR code to prevent the user from scanning it twice (resulting in an error since the request is already deleted)
        if ( issuanceResponse.requestStatus == "request_retrieved" ) {
        message = "QR Code is scanned. Waiting for issuance to complete...";
        mainApp.sessionStore.get(issuanceResponse.state, (error, session) => {
            var sessionData = {
            "status" : "request_retrieved",
            "message": message
            };
            session.sessionData = sessionData;
            mainApp.sessionStore.set( issuanceResponse.state, session, (error) => {
            res.send();
            });
        })      
        }

        if ( issuanceResponse.requestStatus == "issuance_successful" ) {
        message = "Credential successfully issued";
        mainApp.sessionStore.get(issuanceResponse.state, (error, session) => {
            var sessionData = {
            "status" : "issuance_successful",
            "message": message
            };
            session.sessionData = sessionData;
            mainApp.sessionStore.set( issuanceResponse.state, session, (error) => {
            res.send();
            });
        })      
        }

        if ( issuanceResponse.requestStatus == "issuance_error" ) {
        mainApp.sessionStore.get(issuanceResponse.state, (error, session) => {
            var sessionData = {
            "status" : "issuance_error",
            "message": issuanceResponse.error.message,
            "payload" :issuanceResponse.error.code
            };
            session.sessionData = sessionData;
            mainApp.sessionStore.set( issuanceResponse.state, session, (error) => {
            res.send();
            });
        })      
        } */
    });  

    res.send()
}

export default {issuer_callback}