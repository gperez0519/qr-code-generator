export const sanitizeURL = (url) => {
  let urlValid = url.match(
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi
  );

  console.log(urlValid);

  if (urlValid) {
    // Encode the validated URL.
    urlValid = encodeURI(urlValid);

    // Return the valid URL.
    return urlValid;
  } else {
    return "";
  }
};
