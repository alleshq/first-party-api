# Alles First Party API
This api is for first-party services. It is authenticated with an Alles Session token (only for some endpoints) and with first-party oauth application credentials. For example, automatic sign in to services on the alles.cx domain is possible because the `sessionToken` cookie is shared across subdomains, so a service could query this api to get user information. The advantage of this compared to the normal OAuth api is that a lot of user data can be obtained without the need for a user to authorize more scopes, or even go to a sign in prompt.

## OAuth Applications
The authentication method is the same as with the OAuth api, you use Basic HTTP Authentication with the application ID and secret. However, this is only available to applications with the `firstParty` boolean set to `true`.

## Session Auth
To use a session token for authorization, send it in the `session` header.