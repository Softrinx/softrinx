import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/contexts/themeContext'

const dmSans = localFont({
  src: [
    { path: '../public/fonts/DMSans-Regular.ttf',   weight: '400', style: 'normal' },
    { path: '../public/fonts/DMSans-Medium.ttf',    weight: '500', style: 'normal' },
    { path: '../public/fonts/DMSans-SemiBold.ttf',  weight: '600', style: 'normal' },
    { path: '../public/fonts/DMSans-Bold.ttf',      weight: '700', style: 'normal' },
    { path: '../public/fonts/DMSans-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Softrinx - Premium Software Development Agency',
  description: 'Enterprise software solutions that drive results. Web apps, mobile apps, AI integration, and cloud infrastructure.',
  keywords: 'software development, web development, mobile apps, enterprise solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      {/*
        Anti-flash script — runs before React hydrates.
        Reads saved theme from localStorage and sets CSS vars immediately
        so the user never sees a white or wrong-theme flash on load.
      */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('softrinx-theme');
                  var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var mode = saved || system;
                  var dark = {
                    bg: '#080b09', surface: '#0d1210',
                    scrollTrack: '#0d1210', scrollThumb: 'rgba(52,211,153,0.25)',
                  };
                  var light = {
                    bg: '#f5f7f5', surface: '#ffffff',
                    scrollTrack: '#e8ede9', scrollThumb: 'rgba(5,150,105,0.3)',
                  };
                  var c = mode === 'dark' ? dark : light;
                  var r = document.documentElement;
                  r.setAttribute('data-theme', mode);
                  r.style.setProperty('--color-bg', c.bg);
                  r.style.setProperty('--color-surface', c.surface);
                  r.style.setProperty('--color-scroll-track', c.scrollTrack);
                  r.style.setProperty('--color-scroll-thumb', c.scrollThumb);
                  document.documentElement.style.background = c.bg;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={dmSans.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}