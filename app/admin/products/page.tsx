import { getAllProducts } from '@/app/actions/actions';
import AdminDashboard from '@/app/components/admin/AdminDashboard';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProductsPage() {
  const products = await getAllProducts();
  const session = await auth();
  if (!session?.user.isAdmin) {
    redirect('/');
  }
  return <AdminDashboard products={products} />;
}
