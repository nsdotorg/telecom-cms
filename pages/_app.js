import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`w-[100vw] h-[100vh] flex justify-center items-center ${inter.className}`}
    >
      <div className="bg-white relative overflow-hidden">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
