import Link from 'next/link';

export const Header = () => (
  <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
    <div className="flex items-center">
      <h1 className="text-xl font-bold">TalentMosaic AI</h1>
    </div>
    <nav className="space-x-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/candidates">Candidates</Link>
      <Link href="/jobs">Jobs</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  </header>
);
