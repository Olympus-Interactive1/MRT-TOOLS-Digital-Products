"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event) {
    event.preventDefault(); setLoading(true); setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) setError("E-posta veya şifre hatalı."); else window.location.href = "/dashboard";
    setLoading(false);
  }
  return <main className="authPage"><section className="authCard"><a className="authBrand" href="/">MRT TOOLS</a><span className="sectionKicker">HESABINIZA GİRİŞ</span><h1>Tekrar hoş geldin.</h1><p>Satın aldığın dijital ürünlere hesabından eriş.</p><form onSubmit={submit}><label>E-posta<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Şifre<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <div className="authError">{error}</div>}<button className="authPrimary" disabled={loading}>{loading ? "Giriş yapılıyor…" : "Giriş Yap"}</button></form><div className="authDivider"><span>veya</span></div><button className="googleButton" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Google ile devam et</button><p className="authFoot">Hesabın yok mu? <a href="/register">Kayıt ol</a></p><a className="backHome" href="/">← Ana sayfaya dön</a></section></main>;
}
