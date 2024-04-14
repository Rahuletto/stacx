import "@/styles/globals.css";
import "@/styles/editor.css";
import "@/styles/gjs.css";
import "@/styles/manager.css";
import "@/styles/inputs.css";

import type { AppProps } from "next/app";
import { Manrope, JetBrains_Mono } from "next/font/google";

const mp = Manrope({
  fallback: ['system-ui', 'arial'],
  weight: ['500', '700'],
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--root-font',
});

const mono = JetBrains_Mono({
  fallback: ['monospace'],
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  style: ['normal'],
  variable: '--mono-font',
});

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>
      {`
            html {
              --root-font: ${mp.style.fontFamily};
              --mono-font: ${mono.style.fontFamily};
            }
          `}
    </style>
    <Component {...pageProps} />
  </>;
}
