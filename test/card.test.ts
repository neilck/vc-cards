import { ClaimsRequestKeys } from '@azure/msal-common';
import { stringify } from 'querystring';
import { ICard, IIssueRequest } from  '../src/entity/ICard'

describe("issueCardRequest", () => {
    test("call issueCardRequest", async () => {

        const data: ICard = { issueRequest: {id: "1"} }
        data.membershipID = "0123456"
        data.alias = "Clark Kent"
        data.followers_count = "20000"
        data.post_count = "100"
        data.created_at = "2015-01-01"
        data.verified = "false"

        let payload = JSON.stringify(data);

        const fetchOptions = {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length.toString(),
            }
        }
            
        let response: any
        try {
            response = await fetch('http://localhost:8090/issueCardRequest', fetchOptions)
        } catch (error) {
            console.log( error );
        } 
        
        // var respdata = await response.json()
        // console.log( 'issueCardRequest response' );
        // console.log( respdata );

        expect ( response.status ).toBe ( 200 )
    })
})