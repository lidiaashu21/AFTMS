"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Download, Share, Plus } from "lucide-react";
import logo from "../public/image/logo.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "aftms-install-dismissed";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Register the service worker.
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* registration failed - ignore */
        });
      });
    }

    // Skip if already installed (running in standalone mode).
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    if (isStandalone) return;

    // Skip if the user dismissed it recently (within 7 days).
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (dismissedAt && Date.now() - dismissedAt < sevenDays) return;

    // Detect iOS devices (they don't fire beforeinstallprompt).
    const ua = window.navigator.userAgent.toLowerCase();
    const iOS =
      /iphone|ipad|ipod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);

    if (iOS) {
      // Show manual instructions overlay shortly after load.
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }

    // Android / Desktop: wait for the browser install event.
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => setVisible(false);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted" || choice.outcome === "dismissed") {
      setDeferredPrompt(null);
      setVisible(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-red-950 via-red-900 to-black px-5 py-4">
          <Image
            src={logo}
            alt="AFTMS Logo"
            width={44}
            height={44}
            className="rounded-lg bg-white/10 object-contain p-1"
          />
          <div className="flex-1">
            <h2 className="text-base font-bold text-white">Install AFTMS App</h2>
            <p className="text-[11px] text-gray-300">
              Football Tournament System
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm text-slate-600">
            Get the full app experience on your{" "}
            <span className="font-semibold text-slate-800">mobile</span> and{" "}
            <span className="font-semibold text-slate-800">desktop</span> —
            faster access, offline support, and a home-screen shortcut.
          </p>

          {isIOS ? (
            <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-800">
                To install on iPhone / iPad:
              </p>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-900 text-xs font-bold text-white">
                  1
                </span>
                <span className="flex items-center gap-1">
                  Tap the <Share size={16} className="text-blue-600" /> Share
                  button
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-900 text-xs font-bold text-white">
                  2
                </span>
                <span className="flex items-center gap-1">
                  Choose <Plus size={16} className="text-slate-700" /> &quot;Add
                  to Home Screen&quot;
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleInstall}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-950 via-red-900 to-black px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <Download size={18} />
              Install Application
            </button>
          )}

          <button
            onClick={handleClose}
            className="mt-3 w-full rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
