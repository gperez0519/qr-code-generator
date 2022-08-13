export const sanitizeURL = (url) => {
  console.log(url);

  if (url.indexOf("www") >= 0) {
    let urlSanitized = url.replace(/[*$!<>+'")(]/g, "");
    urlSanitized = encodeURI(urlSanitized);
    return urlSanitized;
  } else {
    return "";
  }
};
