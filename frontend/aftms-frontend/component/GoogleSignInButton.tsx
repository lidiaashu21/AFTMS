"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

import api from "../service/api";
import { persistSession, dashboardPathForRole } from "../lib/session";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

interface GoogleCredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>,
          ) => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onError?: (message: string) => void;
  onRedirect: (path: string) => void;
}

export default function GoogleSignInButton({
  onError,
  onRedirect,
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (
      !scriptLoaded ||
      !GOOGLE_CLIENT_ID ||
      !window.google ||
      !buttonRef.current
    ) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          const res = await api.post("/auth/google", {
            idToken: response.credential,
          });

          const data = res.data?.data || res.data;
          const token = data?.token;
          const user = data?.user;

          if (!token || !user) {
            throw new Error("Invalid server response");
          }

          persistSession(token, user);

          const path = dashboardPathForRole(user.role);
          onRedirect(path || "/");
        } catch (err: any) {
          onError?.(
            err?.response?.data?.message ||
              err?.message ||
              "Google sign-in failed",
          );
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "filled_black",
      size: "large",
      width: 320,
      text: "continue_with",
      shape: "pill",
    });
  }, [scriptLoaded, onError, onRedirect]);

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div className="flex justify-center" ref={buttonRef} />
    </>
  );
}
