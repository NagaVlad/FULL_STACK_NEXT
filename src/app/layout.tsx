import MyAppProvider from "@/providers"
import '@/global.scss'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>
        <MyAppProvider>
          {children}
        </MyAppProvider>
      </body>
    </html >
  )
}

