import NextLink from 'next/link';
import { getProductsByCategorySlug } from '../../../actions/actions';

export default async function CategoryPage({ params }: any) {
  const products = await getProductsByCategorySlug(params.slug);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-yellow-400 h-40">
        <h1>Category - {params.slug}</h1>
        {products.map((p) => {
          const categorySlug = p.categories[0]?.slug;
          return (
            <NextLink href={`/product/${p.id}`} key={p.id}>
              {p.title}
            </NextLink>
          );
        })}
      </div>
    </main>
  );
}
