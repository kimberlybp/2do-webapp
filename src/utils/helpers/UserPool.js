import { CognitoUserPool } from "amazon-cognito-identity-js"; 

const poolData = {
    UserPoolId: "us-east-1_pWXNaUeA0",
    ClientId: "nskqsit0cefnkut3rl98g10h2"
}

export default new CognitoUserPool(poolData);