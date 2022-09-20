import { ClaimsRequestKeys } from '@azure/msal-common';
import { stringify } from 'querystring';
import { IIssuanceRequest } from  '../src/entity/IIssuanceConfig'

describe("testing Issuance Request class", () => {
  const res: IIssuanceRequest = new Object();
  
  res.includeQRCode = false;

  res.callback = new Object();
  res.callback.url = "https://YOURPUBLICREACHABLEHOSTNAME/api/issuer/issuanceCallback";
  res.callback.state = "STATEWILLBESETINCODE";
  res.callback.headers = {};
  res.callback.headers["api-key"] = "OPTIONAL API-KEY for ISSUANCE CALLBACK API";
  res.authority = "did:ion: THIS IS YOUR DID FROM THE VC PAGE IN AZURE PORTAL WHICH IS SET IN THE SAMPLE BY COPYING THE VALUE FROM CONFIG.JSON",
  res.registration = {}
  res.registration.clientName = "Verifiable Credential Expert Sample";
  res.type = "VerifiedCredentialExpert";
  res.manifest = "CREDENTIAL URL IN THIS SAMPLE WILL BE COPIED FROM CONFIG.JSON";
  res.pin = {};
  res.pin.value = "123456";
  res.pin.length = 4;
  res.claims = {};
  res.claims.given_name = "FIRSTNAME";
  res.claims.family_name = "LASTNAME";

  const requestConfigFile = './issuance_request_config.json'
  var issuanceConfig = require(requestConfigFile)

  it("checking against issuance_request_config.json", () => {
    // console.log(res)
        expect(res).toEqual( issuanceConfig );
  })
}); 

/* describe("test callback call", () => {
  const callback1 = new Callback()

  it("checking JSON without headers", () => {
    expect(JSON.stringify(callback1)).toBe("{\"url\":\"\",\"state\":\"\"}");
  }); 

  const callback2 = new Callback()
  callback2.headers = [];
  callback2.headers.push( {apiKey: "1234"});
  it("checking JSON with headers", () => {
    console.log(callback2)
    expect(callback2).toEqual( { url: '', state: '', headers: 'api-key: 1234' } );
  });  
}); */