import { auth } from "../../auth.js";
import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <main className="dashboardPage"><div className="dashboardShell"><header className="dashboardHeader"><a className="authBrand" href="/">MRT TOOLS</a><SignOutButton /></header><section className="dashboardHero"><span className="sectionKicker">HESABIM</span><h1>Hoş geldin, {session.user.nickname || session.user.name || "kullanıcı"}.</h1><p>Satın aldığın ürünler burada görünecek. Sipariş numarasıyla ürün erişimi bağlama sistemi bir sonraki aşamada ekleniyor.</p></section><section className="dashboardEmpty"><strong>Ürün kütüphanen</strong><span>Henüz hesabına tanımlanmış bir ürün yok.</span></section></div></main>;
}
