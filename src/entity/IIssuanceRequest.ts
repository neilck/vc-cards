import { type } from "os";

export interface IIssuanceRequest {
    includeQRCode?: boolean;   // Determines whether a QR code is included in the response of this request
    callback?:       ICallback;  // Mandatory. Allows the developer to asynchronously get information on the flow during the verifiable credential issuance process
    authority?:      string;    // The issuer's decentralized identifier (DID).  
    registration?:   IRequestRegistration;    // Provides information about the issuer that can be displayed in the authenticator app
    type?:           string;    // The verifiable credential type. Should match the type as defined in the verifiable credential manifest.
    manifest?:       string;    // The URL of the verifiable credential manifest document
    claims?:         Record<string, any>;        // Optional. Used for the ID token hint flow to include a collection of assertions made about the subject in the verifiable credential
    pin?:           IPin;      // Optional. A PIN number to provide extra security during issuance
}

export interface ICallback {
    url?:            string;     // URI to the callback endpoint of your application
    state?:          string;     // Correlates the callback event with the state passed in the original payload.
    headers?:        Record<string, any>;         // Optional. api-key or Authorization headers supported
}

export interface IRequestRegistration {
    clientName?:     string;     // A display name of the issuer of the verifiable credential
    logoUrl?:        string;     // Optional. The URL for the issuer logo
    termsOfServiceUrl?: string;  // Optional. The URL for the terms of use of the verifiable credential that you are issuing.
}

export interface IPin {
    value?:          string;     // Contains the PIN value in plain text. When you're using a hashed PIN, the value property contains the salted hash, base64 encoded
    type?:           string;     // The type of the PIN code. Possible value: numeric (default).
    length?:         number;     // The length of the PIN code. The default length is 6, the minimum is 4, and the maximum is 16.
    salt?:           string;     // The salt of the hashed PIN code. The salt is prepended during hash computation. Encoding: UTF-8.
    alg?:            string;     // The hashing algorithm for the hashed PIN. Supported algorithm: sha256.
    iterations?:     number;     // The number of hashing iterations. Possible value: 1.
}

/* export class IssuanceRequest  {
    includeQRCode?: boolean;
    callback:       Callback;
    authority:      string;
    registration:   RequestRegistration;
    type:           string;
    manifest:       string;
    claims:         any[];
    pin:            object;
 
    constructor()
    {
        this.includeQRCode = true;
        this.callback = new Callback();
        this.authority = "";
        this.registration = new RequestRegistration();
        this.type = "";
        this.manifest = "";
        this.claims = [];
        this.pin = new Pin();
    }

}

export class Callback implements ICallback {
    url:            string;     
    state:          string;     
    headers:        any[];

    constructor()
    {
        this.url = "";
        this.state = "";
        this.headers = [];
    }
}

export class RequestRegistration implements IRequestRegistration
{
    clientName:         string;
    logoUrl?:            string;
    termsOfServiceUrl?:  string;

    constructor()
    {
        this.clientName = "";
    }
}

export class Pin implements IPin
{
    value:      string;
    type:       string;
    length:     number;
    salt:       string;
    alg:        string;
    iterations: number;

    constructor() {
        this.value = "";
        this.type = "";
        this.length = 6;
        this.salt = "";
        this.alg = "";
        this.iterations = 1;
    }
} */

