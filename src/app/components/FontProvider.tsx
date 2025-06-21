'use client';

export default function FontProvider() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'Sohne';
        src: url('/fonts/Sohne-Buch.woff2') format('woff2'),
             url('/fonts/Sohne-Buch.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Sohne';
        src: url('/fonts/Sohne-Bold.woff2') format('woff2'),
             url('/fonts/Sohne-Bold.woff') format('woff');
        font-weight: bold;
        font-style: normal;
      }
    `}</style>
  );
} 