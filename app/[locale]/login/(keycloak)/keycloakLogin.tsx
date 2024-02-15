"use client"
import { supabase } from "@/lib/supabase/browser-client"
import { Button } from "@/components/ui/button"

export default function KeycloakLogin() {
  async function signInWithKeycloak() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "keycloak",
      options: {
        scopes: "openid"
      }
    })
  }
  return (
    <Button
      onClick={() => signInWithKeycloak()}
      className="border-foreground/20 mb-2 rounded-md border px-4 py-2"
    >
      Login With Keycloak
    </Button>
  )
}
