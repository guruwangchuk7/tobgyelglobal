import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminAuth";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/app/lib/supabaseAdmin";

// POST /api/admin/cms-news — upsert a news article (admin only, service-role).
// Replaces the previous client-side anon upsert to cms_news.
export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ success: true, message: "Supabase env pending." });
  }

  const article = await request.json();
  if (!article?.id) {
    return NextResponse.json({ error: "Article id is required." }, { status: 400 });
  }

  const payload = {
    id: article.id,
    slug: article.slug || article.id,
    title: article.title,
    date: article.date,
    category: article.category,
    image: article.image,
    excerpt: article.excerpt,
    content: article.content,
    media_contact_email: article.mediaContactEmail,
    status: article.status,
    featured_on_home: article.featuredOnHome,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin.from("cms_news").upsert([payload]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
