import { auth, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400", // 24 hours cache
      },
    });
  }

  const { userId, sessionClaims } = auth();

  const response = NextResponse.next();

  // Protect user API
  if (req.nextUrl.pathname.startsWith("/api/user")) {
    if (!userId) {
      return new Response(
        JSON.stringify({ message: "You are not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Protect admin API routes
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (sessionClaims?.metadata?.role !== "admin") {
      return new Response(
        JSON.stringify({ message: "Forbidden!" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
