"use client";
import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { supabase } from "@/lib/supabase";

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("Draft");
  const [featuredImage, setFeaturedImage] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const editorRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Error fetching posts. Please check Supabase config.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(50); // Just a visual indicator for Supabase
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from('images').upload(`blog_images/${fileName}`, file);
      if (error) throw error;
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`blog_images/${fileName}`);
      setFeaturedImage(publicUrlData.publicUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed: " + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!editingPost) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setTag("");
    setContent("");
    setMetaTitle("");
    setMetaDescription("");
    setStatus("Draft");
    setFeaturedImage("");
  };

  const startEdit = (post) => {
    setEditingPost(post.id);
    setTitle(post.title || "");
    setSlug(post.slug || "");
    setExcerpt(post.excerpt || "");
    setTag(post.tag || "");
    setContent(post.content || "");
    setMetaTitle(post.metaTitle || "");
    setMetaDescription(post.metaDescription || "");
    setStatus(post.status || "Draft");
    setFeaturedImage(post.featuredImage || "");
  };

  const startAdd = () => {
    resetForm();
  };

  const handleSave = async () => {
    if (!title || !slug) {
      alert("Title and Slug are required.");
      return;
    }

    const postData = {
      title,
      slug,
      excerpt,
      tag,
      content,
      metaTitle,
      metaDescription,
      status,
      featuredImage,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingPost) {
        // Update existing document
        const { error } = await supabase.from('blogs').update(postData).eq('id', editingPost);
        if (error) throw error;
        alert("Post updated successfully!");
      } else {
        // Create new document
        postData.created_at = new Date().toISOString();
        const { error } = await supabase.from('blogs').insert([postData]);
        if (error) throw error;
        alert("New post created successfully!");
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Did you set up Supabase?");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      alert("Post deleted!");
      if (editingPost === id) {
        resetForm();
      }
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-[#64748B]">Loading Blog CMS...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      
      {/* LEFT COLUMN - BLOG LISTING */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <button 
          onClick={startAdd}
          className="w-full py-4 border-2 border-dashed border-[#CBD5E1] bg-white text-[#10B981] rounded-xl font-bold hover:bg-[#ECFDF5] hover:border-[#10B981] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
           + Draft New Post
        </button>

        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden sticky top-[9rem]">
          <div className="p-4 bg-[#F1F5F9] border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#475569] uppercase tracking-wider">Posts ({posts.length})</h2>
          </div>
          <div className="max-h-[65vh] overflow-y-auto w-full">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className={`flex justify-between items-center p-4 border-b border-[#F1F5F9] cursor-pointer transition-colors ${editingPost === post.id ? 'bg-[#ECFDF5] border-l-4 border-l-[#10B981]' : 'hover:bg-[#F8FAFC]'}`} 
                onClick={() => startEdit(post)}
              >
                <div className="flex flex-col pr-2 w-full overflow-hidden">
                   <div className="flex justify-between items-center w-full">
                      <span className="font-semibold text-[0.9rem] truncate text-[#1E293B] block max-w-[150px]">{post.title}</span>
                      <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${post.status === 'Published' ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                        {post.status}
                      </span>
                   </div>
                   <span className="text-xs text-[#94A3B8] truncate">{post.slug}</span>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
               <div className="p-6 text-center text-sm text-[#94A3B8]">No blog posts found.</div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - EDITOR UI */}
      <div className="w-full lg:w-3/4">
        {editingPost !== null || title || slug ? (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
            
            <div className="p-6 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-[#0F172A]">
                {editingPost ? `Editing Post` : "Create New Post"}
              </h2>
              <div className="flex items-center gap-3">
                 <select 
                    value={status} 
                    onChange={e => setStatus(e.target.value)}
                    className={`font-bold outline-none border-2 rounded-md px-3 py-1.5 text-sm ${status === 'Published' ? 'border-[#10B981] text-[#10B981] bg-[#ECFDF5]' : 'border-[#F59E0B] text-[#F59E0B] bg-[#FFFBEB]'}`}
                 >
                    <option value="Draft">Status: Draft</option>
                    <option value="Published">Status: Published</option>
                 </select>
                 {editingPost && (
                    <button onClick={() => handleDelete(editingPost)} className="px-3 py-1.5 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#EF4444] rounded-md font-bold text-sm">
                      Delete
                    </button>
                 )}
                 <button 
                  onClick={handleSave}
                  className="px-6 py-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded-md font-bold text-sm shadow transition-all"
                 >
                  Save Post
                 </button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1 border-l-2 border-[#10B981] pl-2">Post Title</label>
                    <input type="text" value={title} onChange={handleTitleChange} className="w-full p-3 font-heading text-lg border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#10B981] outline-none text-[#0F172A]" placeholder="Catchy title goes here..." />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">URL Slug</label>
                    <input type="text" value={slug} onChange={e => setSlug(generateSlug(e.target.value))} className="w-full p-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#10B981] outline-none text-[#0F172A]" placeholder="url-friendly-slug" />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Category / Tag</label>
                    <input type="text" value={tag} onChange={e => setTag(e.target.value)} className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#10B981] outline-none text-[#0F172A]" placeholder="e.g. Manufacturing" />
                 </div>
                 
                 <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Short Excerpt (Displayed on blog list)</label>
                    <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#10B981] outline-none min-h-[80px] text-[#0F172A]" placeholder="A brief summary of the post..."></textarea>
                 </div>
              </section>

              {/* Cover Image Upload */}
              <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
                 <label className="block text-xs font-bold text-[#475569] uppercase mb-3 border-l-2 border-[#38BDF8] pl-2">Featured Image</label>
                 <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3">
                      {featuredImage ? (
                         <div className="relative rounded-lg overflow-hidden border border-[#CBD5E1] aspect-video">
                            <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                            <button onClick={() => setFeaturedImage("")} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md">✕</button>
                         </div>
                      ) : (
                         <div className="flex items-center justify-center w-full aspect-video border-2 border-dashed border-[#CBD5E1] rounded-lg bg-white text-[#94A3B8] text-sm font-medium">
                            No Cover Image
                         </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-3 w-full">
                       <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E0F2FE] file:text-[#0284C7] hover:file:bg-[#BAE6FD] cursor-pointer" />
                       {uploading && (
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-[#38BDF8] h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                          </div>
                       )}
                       <div className="text-xs text-[#64748B]">Or paste an image URL:</div>
                       <input type="text" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} className="w-full p-2 text-sm border border-[#CBD5E1] rounded outline-none focus:border-[#38BDF8]" placeholder="https://..." />
                    </div>
                 </div>
              </section>

              {/* Rich Text Editor */}
              <section>
                 <label className="block text-xs font-bold text-[#475569] uppercase mb-2 border-l-2 border-[#8B5CF6] pl-2">Post Content</label>
                 <div className="border border-[#CBD5E1] rounded-lg overflow-hidden">
                    <Editor
                       apiKey="r349i3i2ixb9kquwcl1rnm0ol0ikry9o2mvyzsh1tzffwz0e" /* Use a free key or no-api-key prop if open source */
                       onInit={(evt, editor) => editorRef.current = editor}
                       value={content}
                       onEditorChange={(newContent) => setContent(newContent)}
                       init={{
                         height: 500,
                         menubar: false,
                         plugins: [
                           'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                           'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                           'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                         ],
                         toolbar: 'undo redo | blocks | ' +
                           'bold italic forecolor | alignleft aligncenter ' +
                           'alignright alignjustify | bullist numlist outdent indent | ' +
                           'image link | removeformat | help',
                         content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height: 1.6; color: #1E293B; } h2 { color: #0F172A; font-weight: bold; }',
                       }}
                     />
                 </div>
              </section>

              {/* SEO Data */}
              <section className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
                 <h3 className="font-bold text-[#1E293B] mb-4 border-b pb-2">SEO Metadata</h3>
                 <div className="grid grid-cols-1 gap-4">
                    <div>
                       <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Meta Title</label>
                       <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full p-2.5 border border-[#CBD5E1] rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-[#0F172A]" placeholder="Title for Search Engines" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Meta Description</label>
                       <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full p-2.5 border border-[#CBD5E1] rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-[#0F172A] min-h-[80px]" placeholder="Description for Search Engines..."></textarea>
                    </div>
                 </div>
              </section>

            </div>
          </div>
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center text-[#94A3B8] border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-[#F8FAFC]">
            <svg className="w-16 h-16 mb-4 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <p className="font-medium text-lg text-[#64748B]">Select a post or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
