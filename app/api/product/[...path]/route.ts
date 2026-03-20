export async function GET(req, { params }) {
    const path = params.path.join("/")

    const imageURL =
        `https://ceawmxeopfmvjywmbsen.supabase.co/storage/v1/object/public/images/${path}`

    const response = await fetch(imageURL)

    return new Response(response.body, {
        headers: {
            "Content-Type": response.headers.get("content-type"),
            "Cache-Control": "public, max-age=31536000"
        }
    })
}
