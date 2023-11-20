import Link from "next/link";
import type { CurrentProduct } from "src/app/api/RecentProducts/route";
import Card from "src/Components/Card";

export default async function RecentlyAdded() {
  const { products } = await fetch(
    "http://localhost:3000/api/RecentProducts",
  ).then((res) => res.json() as Promise<{ products: CurrentProduct[] }>);

  return (
    <main className="justify-cente flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
}
