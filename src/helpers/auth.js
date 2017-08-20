export function getAuth(req) {
  // server
  if (req) {
    return req.cookies.auth || null;
  }
  // browser
  return document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, '$1') || null;
}
