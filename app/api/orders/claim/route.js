import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sipariş eklemek için giriş yapmalısınız." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const orderNumber = String(body.orderNumber || "").trim();
  if (!orderNumber) return NextResponse.json({ error: "Sipariş numarası gerekli." }, { status: 400 });

  const productId = process.env[`ORDER_${orderNumber.replace(/[^a-zA-Z0-9]/g, "_")}`];
  if (!productId) return NextResponse.json({ error: "Bu sipariş numarası bulunamadı veya henüz tanımlanmadı." }, { status: 404 });

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) return NextResponse.json({ error: "Bu ürün şu anda erişilebilir değil." }, { status: 404 });

  await prisma.entitlement.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: { orderNumber },
    create: { userId: session.user.id, productId, orderNumber },
  });

  return NextResponse.json({ ok: true, message: `${product.title} hesabınıza bağlandı.` });
}
