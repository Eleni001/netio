import { auth } from '@/auth';
import { getAllCategorys } from '../actions/actions';
import HeaderComponents from './HeaderComponents';

export default async function Header() {
  const session = await auth();
  const categories = await getAllCategorys();
  return <HeaderComponents session={session} categories={categories} />;
}
