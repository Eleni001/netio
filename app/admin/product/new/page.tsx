import { getAllCategorys } from '@/app/actions/actions';
import AdminNewProductComp from '@/app/components/admin/AdminNewProductComp';

export default async function AdminNewProductPage() {
  const categorys = await getAllCategorys();
  return <AdminNewProductComp categorys={categorys} />;
}
