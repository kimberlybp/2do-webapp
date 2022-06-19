import { CognitoUserPool } from "amazon-cognito-identity-js"; 

const poolData = {
    UserPoolId: "us-east-1_XG9j1IWYx",
    ClientId: "1scfh7gdivuu0ik183fif9hlii"
}

export default new CognitoUserPool(poolData);