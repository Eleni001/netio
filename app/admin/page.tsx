import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllProducts } from "../actions/actions";
import AdminDashboard from "../components/admin/AdminDashboard";

export default async function AdminHomePage() {
  const products = await getAllProducts();
  const session = await auth();
  if (!session?.user.isAdmin) {
    redirect("/");
  }
  return <AdminDashboard products={products} />;
}
