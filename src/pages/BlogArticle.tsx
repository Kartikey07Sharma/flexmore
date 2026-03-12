import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { useBlogPost } from "@/hooks/use-blog";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="section-padding flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </PublicLayout>
    );
  }

  if (!post || error) {
    return (
      <PublicLayout>
        <div className="section-padding text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary font-body">← Back to Blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <article className="section-padding">
        <div className="container-wide max-w-3xl">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 font-body">
            <ArrowLeft className="mr-1 w-4 h-4" /> Back to Blog
          </Link>
          <p className="text-sm text-muted-foreground font-body mb-2">{new Date(post.created_at).toLocaleDateString()} · {post.author}</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">{post.title}</h1>
          <div className="prose prose-lg max-w-none font-body text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
