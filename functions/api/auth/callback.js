export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) return new Response('Missing code', { status: 400 });

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error || !data.access_token) {
    const msg = JSON.stringify(`authorization:github:error:${data.error}`);
    return new Response(
      `<!DOCTYPE html><html><body><script>window.opener.postMessage(${msg},'*');window.close();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
  const msg = JSON.stringify(`authorization:github:success:${payload}`);
  return new Response(
    `<!DOCTYPE html><html><body><script>window.opener.postMessage(${msg},'*');window.close();</script></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
