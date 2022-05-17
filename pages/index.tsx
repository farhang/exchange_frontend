import Link from 'next/link';

export default function Home() {
  return (
    <nav>
      <Link href="/about">
        <a>About Page</a>
      </Link>
    </nav>
  );
}
