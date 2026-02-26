"use client";

import { useEffect, useState } from "react";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        }
      } catch {
        // error
      }
      setLoading(false);
    }
    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Article introuvable</p>
      </div>
    );
  }

  return <BlogPostForm initialData={post} />;
}
