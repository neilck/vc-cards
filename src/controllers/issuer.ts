import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { msalCca, msalClientCredentialRequest } from '../msal'

async function getAccessToken(): Promise<string> {
  // get the Access Token
   var accessToken = "";
   try {
     const cca: any = new msalCca();
     const clientCredentialRequest = msalClientCredentialRequest;

     const result = await cca.acquireTokenByClientCredential(clientCredentialRequest);
     if ( result ) {
       accessToken = result.accessToken;
     }
   } catch {
     console.log( "failed to get access token" );
     return "";
   }  
   return accessToken
}

const getIssuanceRequest = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await getAccessToken();
    if (!accessToken)
    {
        res.status(401).json({
            'error': 'Could not acquire credentials to access your Azure Key Vault'
        });  
      return;
    }

    console.log( `accessToken: ${accessToken}` );

    const url = `https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest`
    const result: void | AxiosResponse<any, any> = await axios.post(url)
      .catch(function (error) {
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
};

export default {getIssuanceRequest}