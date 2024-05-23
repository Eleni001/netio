import { getAllCategorys, getAllProducts } from "@/app/actions/actions";
import AdminEditProductComp from "@/app/components/admin/AdminEditProductComp";

type Props = { params: { id: string } };

export default async function AdminEditProductPage({ params }: Props) {
  const products = await getAllProducts();
  const categorys = await getAllCategorys();

  return (
    <AdminEditProductComp
      params={params}
      product={products}
      categorys={categorys}
    />
  );
}
