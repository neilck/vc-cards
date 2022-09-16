import dotenv from 'dotenv'
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

  console.log(msalConfig);

/*   // if certificateName is specified in config, then we change the MSAL config to use it
if ( config.azCertificateName !== '') {
    const privateKeyData = fs.readFileSync(config.azCertificatePrivateKeyLocation, 'utf8');
    console.log(config.azCertThumbprint);  
    const privateKeyObject = crypto.createPrivateKey({ key: privateKeyData, format: 'pem',    
      passphrase: config.azCertificateName.replace("CN=", "") // the passphrase is the appShortName (see Configure.ps1)    
    });
    msalConfig.auth = {
      clientId: config.azClientId,
      authority: `https://login.microsoftonline.com/${config.azTenantId}`,
      clientCertificate: {
        thumbprint: config.azCertThumbprint,
        privateKey: privateKeyObject.export({ format: 'pem', type: 'pkcs8' })
      }
    };
  } */

const msalCca = new msal.ConfidentialClientApplication(msalConfig);
const msalClientCredentialRequest = {
  scopes: ["3db474b9-6a0c-4840-96ac-1fceb342124f/.default"],
  skipCache: false, 
};



/* // Check if it is an EU tenant and set up the endpoint for it
const hostName = "https://verifiedid.did.msidentity.com/v1.0/";
fetch( `https://login.microsoftonline.com/${process.env.AZ_TENANT_ID}/v2.0/.well-known/openid-configuration`, { method: 'GET'} )
  .then(res => res.json())
  .then((resp) => {
    console.log( `tenant_region_scope = ${resp.tenant_region_scope}`);
    // config.tenant_region_scope = resp.tenant_region_scope;
    // Check that the Credential Manifest URL is in the same tenant Region and throw an error if it's not
    if ( !config.CredentialManifest.startsWith(config.msIdentityHostName) ) {
      throw new Error( `Error in config file. CredentialManifest URL configured for wrong tenant region. Should start with: ${config.msIdentityHostName}` );
    }
  });  */

  export {msalCca, msalClientCredentialRequest} 