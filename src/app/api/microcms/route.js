export async function GET() {
    const API_KEY = process.env.MICROCMS_API_KEY; // NEXT_PUBLICを使わない
    const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
  
    if (!API_KEY || !SERVICE_DOMAIN) {
      return new Response(JSON.stringify({ error: "Missing API Key or Service Domain" }), { status: 500 });
    }
  
    const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/thework`;
  
    try {
      const response = await fetch(ENDPOINT, {
        headers: {
          "X-MICROCMS-API-KEY": API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  