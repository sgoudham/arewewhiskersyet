import type { Metadata } from 'next'
import { Dela_Gothic_One } from 'next/font/google'
import './globals.css'

const dela = Dela_Gothic_One({ fallback: ['system-ui'], weight: ["400"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Are We Whiskers Yet?',
  description: 'Tracking the adoption of whiskers, an awesome port creation tool for Catppuccin designed by the amazing pigeon.',
  keywords: ["Whiskers", "Handlebars", "Helper", "Catppuccin", "Tool"],
  metadataBase: new URL("https://arewewhiskersyet.com"),
  openGraph: {
    url: "https://arewewhiskersyet.com",
    title: "Are We Whiskers Yet?",
    description:
      "Tracking the adoption of whiskers, an awesome port creation tool for Catppuccin designed by the amazing pigeon.",
    locale: "en_GB",
  },
  twitter: {
    creator: "@catppuccintheme",
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${dela.className} bg-ctp-base text-ctp-text flex flex-col py-5`}
      >
        {children}
      </body>
    </html>
  )
}
