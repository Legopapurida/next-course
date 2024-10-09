"use client";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { Metadata } from "next";
// import _ from "lodash";
// import HeavyComponent from "./components/HeavyComponent";
// import { useState } from "react";
// import dynamic from "next/dynamic";
// const HeavyComponent = dynamic(() => import("./components/HeavyComponent"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });
export default function Home() {
  // const session = await getServerSession(authOptions);
  // const [isVisible, setVisible] = useState(false);
  return (
    <main>
      <h1 className="font-poppins">
        {/* Hello {session && <span>{session.user?.name}</span>} */}
      </h1>
      <div>
        <button
          className=""
          onClick={async () => {
            const _ = (await import("lodash")).default;
            const users = [
              {
                name: "c",
              },
              {
                name: "a",
              },
              {
                name: "d",
              },
            ];
            const sorted = _.orderBy(users, ["name"]);
            console.log(sorted);
          }}
        >
          Show
        </button>
      </div>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}

// export async function generateMetadata(): Promise<Metadata> {
//   // const product = await fetch("");
//   return {
//     title: "product.title",
//     description: "hello",
//   };
// }
