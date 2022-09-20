import { resolveSoa } from 'dns';
import { Request, Response, NextFunction } from 'express'
import { ICard } from '../entity/ICard'
import { IIssuanceConfig } from '../entity/IIssuanceConfig'
import { IIssueCardResponse } from '../entity/IIssueCardResponse';
import { getAccessToken, getIssuanceConfig } from "../utility"

const issueCardRequest2 = async (req: Request, res: Response) =>
{
    console.log("issueCardRequest called") 
    res.send('okay computer 2');
};

const issueCardRequest = async (req: Request, res: Response ) => {
    var body = '';
    req.on('data', function (data) {
        body += data;
        console.log("request on data")
        console.log( data )
    })

    req.on('end', async function () {
        /*     if ( req.headers['api-key'] != apiKey ) {
            res.status(401).json({
                'error': 'api-key wrong or missing'
                });  
            return; 
            } */
        
        try {
            const reqData: ICard = JSON.parse(body.toString());
            console.log(reqData);
        } catch (error)
        {
            let message = 'Error in JSON data: '
            if (error instanceof Error) {
                message = message + error.message
            }
            res.status(400).json({
                'error': message
            }).send()  
        }
        
        // get data from request    
        const reqData: ICard = JSON.parse(body.toString());
 
        // get access token
        const accessToken = await getAccessToken().catch(function (error) {
            console.log(error);
        })
    
        if (!accessToken)
        {
            res.status(401).json({
                'error': 'Could not acquire credentials to access your Azure Key Vault'
            }).send();  
            return;
        }
   
        // get issuance config
        let id = "1"
        if (reqData.issueRequest)
        {
            id = reqData.issueRequest.id
        }
        const issuanceConfig: IIssuanceConfig = getIssuanceConfig( id )


        // support for ngrok when request coming from test website
        const hostname = process.env.CALLBACK_HOSTNAME
        if (!hostname)
        {
            if(issuanceConfig.callback)
            {
                issuanceConfig.callback.url = `https://${req.hostname}/issuer_callback`
            }
        }

        delete reqData.issueRequest
        issuanceConfig.claims = reqData

        // return url and qrCode like 
        // https://learn.microsoft.com/en-us/azure/active-directory/verifiable-credentials/issuance-request-api

        const client_api_request_endpoint = `https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest`

        console.log(issuanceConfig)
        var payload = JSON.stringify(issuanceConfig);
        console.log("payload")
        console.log(payload)

        const fetchOptions = {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length.toString(),
                'Authorization': `Bearer ${accessToken}`
            }
        }
        var response: any

        try {
            response = await fetch(client_api_request_endpoint, fetchOptions)
        } catch (error) {
            console.log( error );
        } 

        console.log( 'VC Client API Response' );
        let resp: IIssueCardResponse = await response.json()
        console.log( resp );

        // pass through response data
        res.status(200).json(resp).send()
    }) // end req.on('end')
}


export default {issueCardRequest}