import { auth } from "@/auth";
import { Session } from "next-auth";
import HeaderComponents from "./HeaderComponents";

export interface SessionProp {
  session: Session | null;
}
export default async function Header() {
  const session = await auth();
  return <HeaderComponents session={session} />;
}
