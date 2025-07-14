"use client";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {updateBlog, deleteBlog} from "@/app/utils/BlogActions";
import {PageTitle} from "@/components/PageTitle";
import {Blog} from "@/db/schema";

const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false});

export function BlogEdit({blog} : {blog: Blog}){
	// create a router
	const router = useRouter();

	// create hooks for input
	const [imageUrl, setImageUrl] = useState(blog.imageUrl);
	const [title, setTitle] = useState(blog.title);
	const [content, setContent] = useState(blog.content);
	const [author, setAuthor] = useState(blog.author);
	const [code, setCode] = useState("");

	// for update
	const handleUpdate = async () => {
		// create form data and add input contents
		const formData = new FormData();
		formData.set("blogId", blog.id);
		formData.set("imageUrl", imageUrl);
		formData.set("title", title);
		formData.set("content", content);
		formData.set("author", author);
		formData.set("code", code);

		// execute update blog and assign result
		const result = await updateBlog(formData);

		// display toast and perform actions based on result
		if(result.status === 1){
			toast.success("Blog updated successfully!");
		}
		else if(result.status === 2){
			toast.error("Please complete required fields.");
		}
		else if(result.status === 3){
			toast.error("Blog code is incorrect.");
		}	
	}

	// for delete
	const handleDelete = async () => {
		// create form data and add input contents
		const formData = new FormData();
		formData.set("blogId", blog.id);
		formData.set("code", code);

		// execute delete blog and assign result
		const result = await deleteBlog(formData);
		
		// display toast and perform actions based on result
		if(result.status === 1){
			toast.success("Blog deleted successfully!");
			router.push("/view");
		}
		else if(result.status === 2){
			toast.error("Please input blog code to proceed.");
		}
		else if(result.status === 3){
			toast.error("Blog code is incorrect.");
		}
	};

	return(
		<div className="mt-35">

			<PageTitle 
				title="Update your blog" 
				subtitle="Refine your content and keep your ideas fresh."
			/>

			<form onSubmit={e => e.preventDefault()} className="custom-font-inter-regular max-w-4xl w-full mx-auto flex flex-col gap-6 p-8 rounded-2xl">

				<div className="flex flex-col md:flex-row gap-6 m-1">
					<div className="w-full">
						<label htmlFor="imageUrl" className="text-white font-bold mb-1 block">
							Image URL <span className="text-red-500">*</span>
						</label>
						<input 
							name="imageUrl" autoComplete="off"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className="form-input px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
					<div className="w-full">
						<label htmlFor="title" className="text-white font-bold mb-1 block">
							Title <span className="text-red-500">*</span>
						</label>
						<input 
							name="title" autoComplete="off"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="form-input px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
				</div>

				<div className="w-full m-1">
					<label className="text-white font-bold mb-1 block">
						Content <span className="text-red-500">*</span>
					</label>
					<div className="text-white rounded-md min-h-[400px]">
						<ReactQuill theme="snow" value={content} onChange={setContent} className="h-[350px]"/>
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 m-1">
					<div className="w-full">
						<label htmlFor="author" className="text-white font-bold mb-1 block">
							Author
						</label>
						<input 
							name="author" autoComplete="off"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							className="form-input px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
					<div className="w-full">
						<label htmlFor="code" className="text-white font-bold mb-1 block">
							Code (for edit/delete) <span className="text-red-500">*</span>
						</label>
						<input 
							name="code" autoComplete="off"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="form-input px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
				</div>

				<Button onClick={handleUpdate} size="sm" className="button-design">
                    Update Blog
                </Button>

				<Button onClick={handleDelete} size="sm" className="button-design">
					Delete Blog
				</Button>

			</form>

		</div>
	);
}