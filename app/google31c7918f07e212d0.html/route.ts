export function GET() {
  return new Response("google-site-verification: google31c7918f07e212d0.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
