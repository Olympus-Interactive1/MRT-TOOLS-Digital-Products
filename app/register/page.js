"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", nickname: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  async function submit(event) {
    event.preventDefault(); setError("");
    if (form.password !== form.confirm) return setError("Şifreler eşleşmiyor.");
    const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email, nickname: form.nickname, password: form.password }) });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Kayıt oluşturulamadı."); else window.location.href = "/login?registered=1";
  }
  return <main className="authPage"><section className="authCard"><a className="authBrand" href="/">MRT TOOLS</a><span className="sectionKicker">YENİ HESAP</span><h1>Hesabını oluştur.</h1><p>Ürün erişimlerini tek hesap altında yönet.</p><form onSubmit={submit}><label>E-posta<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required /></label><label>Kullanıcı adı<input value={form.nickname} onChange={(e) => update("nickname", e.target.value)} required /></label><label>Şifre<input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} /></label><label>Şifre tekrar<input type="password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} required minLength={8} /></label>{error && <div className="authError">{error}</div>}<button className="authPrimary">Kayıt Ol</button></form><p className="authFoot">Zaten hesabın var mı? <a href="/login">Giriş yap</a></p><a className="backHome" href="/">← Ana sayfaya dön</a></section></main>;
}
