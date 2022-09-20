import dotenv from 'dotenv'
import { getAccessToken } from "../src/utility"
import {IIssuanceRequest, ICallback, IRequestRegistration, IPin} from '../src/entity/IIssuanceConfig';
import { ICard } from "../src/entity/ICard"

dotenv.config()

describe("test issuance request", () => {

    it("test issuance request", async () => {
 
        const accessToken = await getAccessToken();
        const state = "ABCDEF"
        const issuance: IIssuanceRequest = new Object()
        const claims: ICard = new Object()
        
        issuance.includeQRCode = true

        issuance.callback = new Object()
        const hostname = "https://d345-2001-569-5662-d900-7c23-98fc-6705-6f5d.ngrok.io"
        issuance.callback.url = `${hostname}/issuer_callback`
        issuance.callback.state = state

        issuance.authority = process.env.ISSUER_AUTHORITY
        issuance.registration = {}
        issuance.registration.clientName = "MetaRep"
        issuance.registration.logoUrl = "https://s3.us-east-1.amazonaws.com/metarepid.com/images/logoMetaRep200.png"
        
        issuance.type = "Twitter"
        issuance.manifest = "https://verifiedid.did.msidentity.com/v1.0/tenants/3faaae97-376a-41dc-9296-507e68de44c3/verifiableCredentials/contracts/M2ZhYWFlOTctMzc2YS00MWRjLTkyOTYtNTA3ZTY4ZGU0NGMzdHdpdHRlcg/manifest"

        claims.membershipID = "2244994945"
        claims.alias = "TwitterDev"
        // claims.name = "Twitter Dev"
        // claims.description = "The voice of Twitter's #DevRel team, and your official source for updates, news, & events about Twitter's API. \n\n#BlackLivesMatter"
        claims.created_at = "2013-12-14T04:35:55.000Z"
        // claims.location = "127.0.0.1"
        // claims.profile_image_url = "https://pbs.twimg.com/profile_images/1267175364003901441/tBZNFAgA_normal.jpg"
        // claims.protected = "false"
        claims.followers_count = "507902"
        // claims.following_count = "1863"
        claims.post_count = "3561"
        // claims.listed_count = "1550"
        // claims.url = "https://t.co/3ZX3TNiZCY"
        claims.verified = "false"
        
        issuance.claims = claims

        const client_api_request_endpoint = `https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest`

        var payload = JSON.stringify(issuance);
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
        var resp = await response.json()
        console.log( resp );

        expect ( response.status).toBe ( 201 )
    })    
});