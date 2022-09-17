import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { msalCca, msalClientCredentialRequest } from '../msal'

async function getAccessToken(): Promise<string> {
  // get the Access Token
  var accessToken = "";
  
  const result = await msalCca.acquireTokenByClientCredential(msalClientCredentialRequest).catch(function (error: any) {
      console.log(error);
  })

  if ( result ) {
    accessToken = result.accessToken;
  }
  
   return accessToken
}

const getIssuanceRequest = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await getAccessToken().catch(function (error) {
      console.log(error);
    })

    if (!accessToken)
    {
        res.status(401).json({
            'error': 'Could not acquire credentials to access your Azure Key Vault'
        });  
      return;
    }

    console.log( `accessToken: ${accessToken}` );

    const url = `https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest`
    const result: void | AxiosResponse<any, any> = await axios.post(url).catch
    (function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      
    
    // return response
    return res.status(200).json({
        message: "Okay"
    });

    const callback = `https://${req.hostname}/issuance-request-callback`;

};

export default {getIssuanceRequest}