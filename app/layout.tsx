<<<<<<< HEAD
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { MaintenanceGuard } from "@/components/maintenance-guard"
=======
// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
>>>>>>> 82081f5 (update V3)

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reskil - Master Digital Skills That Actually Pay",
  description:
    "Learn ecommerce, AI, web development, and design with practical, no-fluff training. Get job-ready in weeks, not years.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
<<<<<<< HEAD
        <AuthProvider>
          <MaintenanceGuard>{children}</MaintenanceGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
=======
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
>>>>>>> 82081f5 (update V3)
