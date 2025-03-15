import { Auth0Client } from "@auth0/nextjs-auth0/server"

export const auth0 = new Auth0Client({
    authorizationParameters: {
        audience: "https://dev-o056xowcl1p7t7ky.us.auth0.com/api/v2/"
    }
})
