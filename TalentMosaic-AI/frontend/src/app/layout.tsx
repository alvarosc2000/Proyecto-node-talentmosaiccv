import { ApolloProvider } from '@apollo/client';
import { client } from '@/services/apolloClient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}
