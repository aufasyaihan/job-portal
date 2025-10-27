import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    console.log("Auth callback error:", error);
    
    const errorMessage = error.message?.toLowerCase() || "";
    if (
      errorMessage.includes("expired") ||
      errorMessage.includes("invalid") ||
      errorMessage.includes("token")
    ) {
      return NextResponse.redirect(
        `${origin}/auth/login?error=expired_link`
      );
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=callback_error`);
}
