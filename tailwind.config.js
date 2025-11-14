/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        plexmono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace']
      },
      colors: {
        md: {
          bg: '#F4EFEA',
          surface: '#FFFFFF',
          cloud: '#F1F1F1',
          text: '#383838',
          blue: '#007AFF',
          blueHover: '#005FA3',
          teal: '#21AD93',
          turquoise: '#20BBAA',
          yellow: '#FFE100',
          yellowSoft: '#FFDE00',
          coral: '#FF6E6C',
          blueSoft1: '#6DBEFC',
          blueSoft2: '#AEDCF8',
          pinkSoft: '#FFD7D1',
          aqua: '#79FFFF',
          border: '#D3D3D3',
          borderSubtle: '#E5E5E5'
        }
      },
      borderRadius: {
        xl: '16px',
        lg: '12px',
        pill: '999px'
      },
      boxShadow: {
        card: '0 4px 16px rgba(44,51,91,0.07)',
        hover: '0 8px 24px rgba(44,51,91,0.10)',
        focus: '0 0 0 3px rgba(0,122,255,0.35)'
      },
      transitionTimingFunction: {
        pleasant: 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '48px',
        '6': '56px',
        '7': '64px',
        '8': '80px',
      }
    },
  },
  plugins: [],
}
