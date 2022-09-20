export interface IIssueRequest {
    // uniqued id that will be returned in callback, such as session.id
    id:                 string
}

export interface ICard {
    issueRequest:       IIssueRequest
    membershipID?:      string 
    alias?:             string
    created_at?:        string
    verified?:          string
    followers_count?:   string
    post_count?:        string
    // protected?:         string
    // name?:          string
    // following_count?:   string
    // listed_count?:  string
    // location?:      string// description?:   string
    // profile_image_url?: string
    // url?:           string
}