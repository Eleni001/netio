import { getAllCategorys } from '@/app/actions/actions';
import AdminNewProductComp from '@/app/components/admin/AdminNewProductComp';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminNewProductPage() {
  const session = await auth();

  if (!session?.user.isAdmin) redirect('/');
  const categorys = await getAllCategorys();
  return <AdminNewProductComp categorys={categorys} />;
}
