import { Instrument_Sans } from 'next/font/google'
import '@/styles/styles.scss'
import GlobalProvider from './GlobalProvider'
import ModalCart from '@/components/Modal/ModalCart'
import ModalWishlist from '@/components/Modal/ModalWishlist'
import ModalSearch from '@/components/Modal/ModalSearch'
import ModalQuickview from '@/components/Modal/ModalQuickview'
import ModalCompare from '@/components/Modal/ModalCompare'
import { countdownTime } from '@/store/countdownTime'

const serverTimeLeft = countdownTime();

const instrumentSans = Instrument_Sans({
  subsets: ["latin"], // Ensure the required subset is included
  variable: "--font-instrument-sans",
});
export const metadata = {
  title: 'Kronix Store',
  description: 'Multipurpose eCommerce Template',
}

export default function RootLayout({
  children,
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={instrumentSans.variable}>
          {children}
          <ModalCart serverTimeLeft={serverTimeLeft} />
          <ModalWishlist />
          <ModalSearch />
          <ModalQuickview />
          <ModalCompare />
        </body>
      </html>
    </GlobalProvider>
  )
}
