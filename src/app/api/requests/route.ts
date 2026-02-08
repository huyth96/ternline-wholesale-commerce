import { isRequestInput, validateRequest } from "@/lib/request";

function makeReference() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `TL-${date}-${suffix}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isRequestInput(body)) {
    return Response.json({ message: "Request details are incomplete." }, { status: 400 });
  }

  const errors = validateRequest(body.company, body.lines);
  if (Object.keys(errors).length > 0) {
    return Response.json({ message: "Review the highlighted request details.", errors }, { status: 422 });
  }

  return Response.json({ reference: makeReference(), createdAt: new Date().toISOString() });
}
