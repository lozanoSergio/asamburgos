export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${cookieKey}=`));

  if (!cookie) {
    return undefined;
  }

  return cookie.split("=")[1];
};

export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;

// function makeid(length) {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (var i = 0; i < length; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));

//     console.log(text)

//   return text;
// }
