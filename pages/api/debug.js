/**
 * API Debug: Mostra headers recebidos
 */

export default function handler(req, res) {
  console.log('\n📨 Headers recebidos no servidor:');
  console.log(JSON.stringify(req.headers, null, 2));
  console.log('\n');

  return res.status(200).json({
    method: req.method,
    headers: req.headers,
    userAgent: req.headers['user-agent'],
    acceptLanguage: req.headers['accept-language'],
    acceptEncoding: req.headers['accept-encoding'],
    referer: req.headers['referer'],
  });
}
