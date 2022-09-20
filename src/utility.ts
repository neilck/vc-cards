import dotenv from 'dotenv'
import { IIssuanceConfig } from './entity/IIssuanceConfig';
var msal = require('@azure/msal-node')

dotenv.config()

var msalConfig = {
    auth: {
        clientId: process.env.AZ_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.AZ_TENANT_ID}`,
        clientSecret: process.env.AZ_CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: any, message: any, containsPii: any) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const msalCca = new msal.ConfidentialClientApplication(msalConfig);
const msalClientCredentialRequest = {
  scopes: ["3db474b9-6a0c-4840-96ac-1fceb342124f/.default"],
  skipCache: false, 
};

export async function getAccessToken(): Promise<string> {
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

export function getIssuanceConfig(id: string): IIssuanceConfig
{
    const issuance: IIssuanceConfig = new Object()
    
    issuance.includeQRCode = true

    issuance.callback = new Object()
    const hostname = process.env.CALLBACK_HOSTNAME
    issuance.callback.url = `${hostname}/issuer_callback`
    issuance.callback.state = id

    issuance.authority = process.env.ISSUER_AUTHORITY
    issuance.registration = {}
    issuance.registration.clientName = "MetaRep"
    issuance.registration.logoUrl = "https://s3.us-east-1.amazonaws.com/metarepid.com/images/logoMetaRep200.png"
    
    issuance.type = "Twitter"
    issuance.manifest = "https://verifiedid.did.msidentity.com/v1.0/tenants/3faaae97-376a-41dc-9296-507e68de44c3/verifiableCredentials/contracts/M2ZhYWFlOTctMzc2YS00MWRjLTkyOTYtNTA3ZTY4ZGU0NGMzdHdpdHRlcg/manifest"

    return issuance
}