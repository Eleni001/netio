import { getAllProducts } from "../actions/actions";
import AdminComponents from "../components/admin/AdminComponents";

export default async function AdminHomePage() {
  const products = await getAllProducts();

  return <AdminComponents newProducts={products} />;
}
