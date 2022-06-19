function asyncAuthenticateUser(user, authDetails) {
  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: resolve,
      onFailure: reject,
    })
  })
}

function getCognitoUserSub(user) {
  return new Promise((resolve, reject) => {
  user.getUserAttributes(function (err, result) {
    if (err) reject(err);
    resolve(result[0].Value);
  });
})
}

function getCognitoSession(user) {
  return new Promise((resolve, reject) => {
    user.getSession(function (err, session) {
      if (err) reject(err);
      resolve(session);
    })
  });
}

export const authService = {
  asyncAuthenticateUser,
  getCognitoUserSub,
  getCognitoSession
}
