import { redirect } from "next/navigation";

export default function Home() {
  redirect("/shop");
}

export const dynamic = 'force-static';
