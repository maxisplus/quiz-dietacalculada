import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quiz Dieta Calculada',
  description: 'Quiz personalizado para criar seu plano de dieta',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

