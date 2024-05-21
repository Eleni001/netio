import { getAllProducts } from "../actions/actions";
import AdminDashboard from "../components/admin/AdminDashboard";

export default async function AdminHomePage() {
  const products = await getAllProducts();

  return <AdminDashboard products={products} />;
}
