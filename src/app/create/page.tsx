'use client';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import {BlogAdd} from '@/app/create/BlogAdd';
import {toast} from 'sonner';
import {PageTitle} from '@/components/PageTitle';
import {Button} from '@/components/ui/button';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function Create(){
  	const [content, setContent] = useState('');

  	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
   		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		formData.set('content', content);

		try{
			const result = await BlogAdd(formData);
			if(result.status === 1){
				toast.success("Blog created successfully!");
				form.reset();
				setContent("");
			}
			else if(result.status === 2){
				toast.error("Please complete required fields.");
			} 
			else{
				toast.error("Error occurred in creating the blog.");
			}
		} 
		catch{
			toast.error("Error occurred.");
		}
  	}

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
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
					<div className="w-full">
						<label htmlFor="title" className="text-white mb-1 block font-bold">
							Title <span className="text-red-500">*</span>
						</label>
						<input 
							name="title" autoComplete="off"
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
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
					<div className="w-full">
						<label htmlFor="code" className="text-white mb-1 block font-bold">
							Code (for edit/delete)<span className="text-red-500">*</span>
						</label>
						<input 
							name="code" autoComplete="off"
							className="custom-font-inter-tight create-input-border text-white px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white"
						/>
					</div>
				</div>

				<Button variant="outline" size="sm" className="create-blog-button rounded-md px-5 py-3 m-1">
                    Create Blog
                </Button>

			</form>
		
		</div>
	);
}