import Link from "next/link";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav className="header">
        <Link href="/" className="header-link">
          Burner Cookbook
        </Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
