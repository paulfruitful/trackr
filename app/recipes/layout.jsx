import '../globals.css'

export const metadata = {
  title: 'Trackr| Recipe',
  description: 'Pantry Inventory Management Made Easy ⛈',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-black grid w-full overflow-y-auto h-screen ' >
        {children}
        </body>
    </html>
  )
}
