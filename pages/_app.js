import Link from "next/link";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav>
        <Link href="/">
          Burner Cookbook
        </Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
