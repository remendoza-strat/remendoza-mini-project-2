"use client";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {updateBlog, deleteBlog} from "@/app/edit/[id]/actions";
import {PageTitle} from "@/components/PageTitle";
import {useRouter} from "next/navigation";
import {Blog} from '@/db/schema';

const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false});

export default function EditBlog({blog} : {blog: Blog}){
	const router = useRouter();
	const [imageUrl, setImageUrl] = useState(blog.imageUrl);
	const [title, setTitle] = useState(blog.title);
	const [content, setContent] = useState(blog.content);
	const [author, setAuthor] = useState(blog.author);
	const [code, setCode] = useState("");

	const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("imageUrl", imageUrl);
		formData.append("title", title);
		formData.append("content", content);
		formData.append("author", author);
		formData.append("code", code);

		try{
			const result = await updateBlog(blog.id, formData);
			if(result?.status === 2){
				toast.error("Please complete required fields.");
			}
			else if(result?.status === 3){
				toast.error("Blog code is incorrect.");
			}
			else if(result?.status === 1){
				toast.success("Blog updated successfully!");
			}	
		} 
		catch{
			toast.error("Failed to update blog.");
		}
	};

	const handleDelete = async () => {
		try{
			const result = await deleteBlog(blog.id, code);
			if(result?.status === 2){
				toast.error("Please input blog code to proceed.");
			}
			else if(result?.status === 3){
				toast.error("Blog code is incorrect.");
			}
			else if(result?.status === 1){
				toast.success("Blog deleted successfully!");
				router.push("/view");
			}	
		} 
		catch{
			toast.error("Failed to delete blog.");
		}
	};

	return(
		<div className="mt-35">

			<PageTitle 
				title="Start writing your blog" 
				subtitle="Share your thoughts, stories, or ideas with the world."
			/>

			<form onSubmit={handleSubmit} className="custom-font-inter-regular max-w-4xl w-full mx-auto flex flex-col gap-6 p-8 rounded-2xl">

				<div className="flex flex-col md:flex-row gap-6 m-1">
					<div className="w-full">
						<label htmlFor="imageUrl" className="text-white mb-1 block font-bold">
							Image URL <span className="text-red-500">*</span>
						</label>
						<input 
							name="imageUrl" autoComplete="off"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
					<div className="w-full">
						<label htmlFor="title" className="text-white mb-1 block font-bold">
							Title <span className="text-red-500">*</span>
						</label>
						<input 
							name="title" autoComplete="off"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
				</div>

				<div className="w-full m-1">
					<label className="text-white mb-1 block font-bold">
						Content <span className="text-red-500">*</span>
					</label>
					<div className="text-white rounded-md min-h-[400px]">
						<ReactQuill theme="snow" value={content} onChange={setContent} className="h-[350px]"/>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 m-1">
					<div className="w-full">
						<label htmlFor="author" className="text-white mb-1 block font-bold">
							Author
						</label>
						<input 
							name="author" autoComplete="off"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
					<div className="w-full">
						<label htmlFor="code" className="text-white mb-1 block font-bold">
							Code (for edit/delete)<span className="text-red-500">*</span>
						</label>
						<input 
							name="code" autoComplete="off"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
				</div>

				<Button variant="outline" size="sm" className="create-blog-button rounded-md px-5 py-3 m-1">
					Edit
				</Button>

			</form>

			<div className="flex justify-center mb-5">
				<Button onClick={handleDelete} variant="outline" size="sm" className="create-blog-button rounded-md px-5 py-3 m-1">
					Delete
				</Button>
			</div>

		</div>
	);
}