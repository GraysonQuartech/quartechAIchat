"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Keycloak from "keycloak-js"
import { httpClient } from "./utils/HttpClient"

//KEYCLOAK CONFIG
//////////////////////////////////////////////////////////////////////////
let initOptions = {
  url: "https://sso.trustservices.quartech.com/", // Provide a default value if undefined
  realm: "trust-services", // Provide a default value if undefined
  clientId: "chatApp" // Provide a default value if undefined
}
let kc = new Keycloak(initOptions)
kc.init({
  onLoad: "login-required",
  checkLoginIframe: false, //maybe true?? supposed to check signin silently without page reload but causes reload currently
  pkceMethod: "S256"
}).then(
  auth => {
    if (!auth) {
      window.location.reload()
    } else {
      console.log("Authenticated") //remove logs in production!!
      console.log("auth", auth)
      console.log("Keycloak", kc)
      console.log("Access Token", kc.token)

      httpClient.defaults.headers.common["Authorization"] = `Bearer ${kc.token}`

      kc.onTokenExpired = () => {
        console.log("token expired")
      }
    }
  },
  () => {
    console.error("Authentication Failed!")
  }
)
///////////////////////////////////////////////////////////////////////////

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div>
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="mt-2 text-4xl font-bold">Chatbot UI</div>

      <Link
        className="mt-4 flex w-[200px] items-center justify-center rounded-md bg-blue-500 p-2 font-semibold"
        href="/login"
      >
        Start Chatting
        <IconArrowRight className="ml-1" size={20} />
      </Link>
    </div>
  )
}
