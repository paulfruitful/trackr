import '../globals.css'

export const metadata = {
  title: 'Trackr| Recipe',
  description: 'Pantry Inventory Management Made Easy ⛈',
}

export default function RootLayout({ children }) {
  return (
      <div className='bg-black grid w-full overflow-y-auto h-screen ' >
        {children}
        </div>
  )
}
