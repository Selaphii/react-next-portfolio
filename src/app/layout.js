// src/app/layout.js
import './styles/globals.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head />
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Portfolio',
};
