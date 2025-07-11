"use client";
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {IconThumbDown, IconThumbUp} from "@tabler/icons-react";
import {toast} from "sonner";
import {Comment} from "@/db/schema";
import {addComment, editComment, deleteComment, commentInteractions} from "@/app/view/actions";
import {DateTimeFormatter} from "@/app/utils/DateTimeFormatter";

export function CommentForm({blogId} : {blogId: string}){
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		
		const result = await addComment(formData);

		if(result.status === 1){
			toast.success("Comment created successfully!");
			form.reset();
		}
		else if(result.status === 2){
			toast.error("Please complete required fields.");
		} 
	}

	return(
		<form onSubmit={handleSubmit} className="flex flex-col">
			<input type="hidden" name="blogId" value={blogId}/>

			<h1 className="custom-font-triomphe text-white text-4xl">Leave your comment here</h1>
			
			<label htmlFor="author" className="custom-font-inter-tight text-white text-lg block m-2">
				Name:
			</label>
			<input name="author" autoComplete="off" className="text-input"/>

			<label htmlFor="content" className="custom-font-inter-tight text-white text-lg block m-2">
				Comment:<span className="text-red-500">*</span>
			</label>
			<textarea rows={5} name="content" autoComplete="off" className="text-input"/>

			<label htmlFor="code" className="custom-font-inter-tight text-white text-lg block m-2">
				Code: (for edit/delete)<span className="text-red-500">*</span>
			</label>
			<input name="code" autoComplete="off" className="text-input"/>

			<Button size="sm" className="button-design mt-3 my-1">
				Post comment
			</Button>	
		</form>
	);
}

export function CommentList({blogId, comments} : {blogId: string; comments: Comment[]}){
	return(
		<div>
			<h1 className="custom-font-triomphe text-white text-4xl m-5">Feedback from the community</h1>
			{comments.map(comment => (
				<CommentCard key={comment.id} comment={comment} blogId={blogId}/>
			))}
		</div>
	);
}

function CommentCard({comment, blogId} : {comment: Comment; blogId: string}){
	const [editMode, setEditMode] = useState(false);
	const [author, setAuthor] = useState(comment.author);
	const [content, setContent] = useState(comment.content);
	const [code, setCode] = useState("");
	const [isPending, startTransition] = useTransition();

	const handleVote = (type: "agree" | "disagree") => {
		startTransition(() => commentInteractions(comment.id, type));
	};

	const handleEdit = async () => {
		const formData = new FormData();
		formData.append("id", comment.id);
		formData.append("blogId", blogId);
		formData.append("author", author);
		formData.append("content", content);
		formData.append("code", code);
		
		const result = await editComment(formData);
		
		if(result.status === 1){
			toast.success("Comment updated successfully!");
			setEditMode(false);
			setCode("");
		}
		else if(result.status === 2){
			toast.error("Please complete required fields.");
		}
		else if(result.status === 3){
			toast.error("Code to edit is wrong.");
		}
	};

	const handleDelete = async () => {
		const formData = new FormData();
		formData.append("id", comment.id);
		formData.append("blogId", blogId);
		formData.append("code", code);

		const result = await deleteComment(formData);

		if(result.status === 1){
			toast.success("Comment deleted successfully!");
			setEditMode(false);
			setCode("");
		}
		else if(result.status === 2){
			toast.error("Please put the code to proceed.");
		}
		else if(result.status === 3){
			toast.error("Code to delete is wrong.");
		}
	};

	return(
		<div>
			{editMode? 
				(
					<form 
						onSubmit={e => e.preventDefault()}
						className="custom-bg-gray m-2 p-3 space-y-2 rounded-md">

							<label htmlFor="author" className="custom-font-inter-tight text-white text-lg block m-2">
								Name:
							</label>
							<input name="author" autoComplete="off" className="text-input w-full"
								value={author || "anonymous"} onChange={(e) => setAuthor(e.target.value)}/>

							<label htmlFor="content" className="custom-font-inter-tight text-white text-lg block m-2">
								Comment:<span className="text-red-500">*</span>
							</label>
							<textarea rows={5} name="content" autoComplete="off" className="text-input w-full"
								value={content} onChange={(e) => setContent(e.target.value)}/>

							<label htmlFor="code" className="custom-font-inter-tight text-white text-lg block m-2">
								Code:<span className="text-red-500">*</span>
							</label>
							<input name="code" autoComplete="off" className="text-input w-full"
								value={code} onChange={(e) => setCode(e.target.value)}/>

							<div className="flex gap-2 flex-wrap mt-3 justify-end">
								<Button
									onClick={handleEdit}
									className="button-design">
										Edit
								</Button>
								<Button
									onClick={() => {
										setEditMode(false);
										setCode("");
									}}
									className="button-design">
										Cancel
								</Button>
								<Button
									onClick={handleDelete}
									className="button-design">
										Delete
								</Button>
							</div>

					</form>
				) : 
				(
					<div className="custom-bg-gray m-2 p-3 space-y-2 rounded-md">

						<div className="flex justify-between items-center">
							<p className="custom-font-triomphe text-white text-3xl">{comment.author}</p>
							<p className="custom-font-inter-tight custom-font-gray text-sm">
								{DateTimeFormatter(comment.createdAt)}
							</p>
						</div>

						<p className="custom-font-inter-regular text-white p-1 m-2">
							{comment.content}
						</p>

						<div className="flex gap-2 mt-3">
							<Button
								onClick={() => handleVote("agree")}
								className="interaction-button"
								disabled={isPending}>
								<IconThumbUp stroke={2}/> {comment.agree??0}
							</Button>
							<Button
								onClick={() => handleVote("disagree")}
								className="interaction-button"
								disabled={isPending}>
								<IconThumbDown stroke={2}/> {comment.disagree??0}
							</Button>
						</div>

						<div className="pt-1 text-right">
							<Button
								onClick={() => setEditMode(true)}
								className="button-design">
								Modify
							</Button>
						</div>

					</div>
				)
			}
		</div>
	);
}