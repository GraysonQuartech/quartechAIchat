"use client"
import { supabase } from "@/lib/supabase/browser-client"
import { Button } from "@/components/ui/button"
import { NextResponse } from "next/server"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function KeycloakLogin() {
  const router = useRouter()
  // let keycloakSignIn = false

  async function refreshLogin() {
    console.log("refresh login!")
    const session = (await supabase.auth.getSession()).data.session
    if (session) {
      router.refresh()
    }
    //keycloakSignIn = false
  }

  useEffect(() => {
    //if (keycloakSignIn === true) {
    refreshLogin()
    //}
  }, [supabase])

  async function signInWithKeycloak() {
    //keycloakSignIn = true
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "keycloak",
      options: {
        scopes: "openid",
        redirectTo: "http://localhost:3000/login"
      }
    })
    NextResponse.redirect("http://localhost:3000/login")
  }
  return (
    <Button
      onClick={() => signInWithKeycloak()}
      className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white"
    >
      Verifiable Credential
    </Button>
  )
}
