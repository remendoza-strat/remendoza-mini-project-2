"use client";
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {IconThumbDown, IconThumbUp} from "@tabler/icons-react";
import {toast} from "sonner";
import {Comment} from "@/db/schema";
import {addComment, updateComment, deleteComment, commentInteractions} from "@/app/utils/CommentActions";
import {DateTimeFormatter} from "@/app/utils/DateTimeFormatter";

export function CommentForm({blogId} : {blogId: string}){
	// handle submission of form
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
		// prevent page reload	
		event.preventDefault();
		
		// create form data and append blog id
		const form = event.currentTarget;
		const formData = new FormData(form);
		formData.set("blogId", blogId);

		// execute add comment and assign result
		const result = await addComment(formData);

		// display toast and perform actions based on result
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
				Post Comment
			</Button>	
		</form>
	);
}

export function CommentList({blogId, comments} : {blogId: string; comments: Comment[]}){
	return(
		<div>
			<h1 className="custom-font-triomphe text-white text-4xl m-5">Feedback from the community</h1>
			
			{comments.length === 0? 
				(
					<div className="custom-font-inter-regular text-white text-1xl m-5">
						<p><b>No comments yet.</b></p>
					</div>
				):
				(
					comments.map(comment => (
						<CommentCard key={comment.id} comment={comment} blogId={blogId}/>
					))
				)
			}

		</div>
	);
}

function CommentCard({comment, blogId} : {comment: Comment; blogId: string}){
	// create hooks for input
	const [editMode, setEditMode] = useState(false);
	const [author, setAuthor] = useState(comment.author);
	const [content, setContent] = useState(comment.content);
	const [code, setCode] = useState("");
	const [isPending, startTransition] = useTransition();

	// call comment interaction and send type of interaction done
	const handleInteract = (type: "agree" | "disagree") => {
		startTransition(() => commentInteractions(comment.id, blogId, type));
	};

	// for update
	const handleUpdate = async () => {
		// create form data and add input contents
		const formData = new FormData();
		formData.set("commentId", comment.id);
		formData.set("blogId", blogId);
		formData.set("author", author);
		formData.set("content", content);
		formData.set("code", code);
		
		// execute update comment and assign result
		const result = await updateComment(formData);
		
		// display toast and perform actions based on result
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

	// for delete
	const handleDelete = async () => {
		// create form data and add input contents
		const formData = new FormData();
		formData.set("commentId", comment.id);
		formData.set("blogId", blogId);
		formData.set("code", code);

		// execute delete comment and assign result
		const result = await deleteComment(formData);

		// display toast and perform actions based on result
		if(result.status === 1){
			toast.success("Comment deleted successfully!");
			setEditMode(false);
			setCode("");
		}
		else if(result.status === 2){
			toast.error("Please input comment code to proceed.");
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
									onClick={handleUpdate}
									size="sm"
									className="button-design">
										Update
								</Button>
								<Button
									onClick={() => {
										setEditMode(false);
										setCode("");
									}}
									size="sm"
									className="button-design">
										Cancel
								</Button>
								<Button
									onClick={handleDelete}
									size="sm"
									className="button-design">
										Delete
								</Button>
							</div>

					</form>
				) : 
				(
					<div className="custom-bg-gray m-2 p-3 space-y-2 rounded-md">

						<div className="flex justify-between items-center">
							<p className="custom-font-triomphe text-white text-3xl m-1">{comment.author}</p>
							<p className="custom-font-inter-tight custom-font-gray text-sm m-1">
								{DateTimeFormatter(comment.createdAt)}
							</p>
						</div>

						<p className="custom-font-inter-regular text-white p-1 m-2">
							{comment.content}
						</p>

						<div className="flex gap-2 mt-3">
							<Button
								onClick={() => handleInteract("agree")}
								className="interaction-button"
								disabled={isPending}>
								<IconThumbUp stroke={2}/> {comment.agree??0}
							</Button>
							<Button
								onClick={() => handleInteract("disagree")}
								className="interaction-button"
								disabled={isPending}>
								<IconThumbDown stroke={2}/> {comment.disagree??0}
							</Button>
						</div>

						<div className="pt-1 text-right">
							<Button
								onClick={() => setEditMode(true)}
								size="sm"
								className="button-design">
								Modify this comment
							</Button>
						</div>

					</div>
				)
			}
		</div>
	);
}