import './globals.css'

export const metadata = {
  title: 'Aile Harcama',
  description: 'Aile bütçe takip uygulaması',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
