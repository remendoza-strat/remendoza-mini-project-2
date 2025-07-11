'use client';
import {useState, useTransition} from 'react';
import {Comment} from '@/db/schema';
import {addComment, editComment, deleteComment, commentInteractions} from '@/app/view/[id]/actions';
import {Button} from '@/components/ui/button';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';

export function CommentForm({blogId} : {blogId: string}){
	return(
		<form action={addComment} className="flex flex-col">
			<input type="hidden" name="blogId" value={blogId}/>

			<h1 className="custom-font-triomphe text-white text-4xl">Leave your comment here</h1>
			
			<label htmlFor="author" className="custom-font-inter-tight text-white text-lg block m-2">
				Name:
			</label>
			<input 
				name="author" autoComplete="off"
				className="text-input"
			/>

			<label htmlFor="content" className="custom-font-inter-tight text-white text-lg block m-2">
				Comment:<span className="text-red-500">*</span>
			</label>
			<textarea 
				name="content" autoComplete="off" rows={5}
				className="text-input"
			/>

			<label htmlFor="code" className="custom-font-inter-tight text-white text-lg block m-2">
				Code: (for edit/delete)<span className="text-red-500">*</span>
			</label>
			<input 
				name="code" autoComplete="off" 
				className="text-input"
			/>

			<Button variant="outline" size="sm" className="button-design mt-3 my-1">
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
	const [code, setCode] = useState('');
	const [isPending, startTransition] = useTransition();

	const handleVote = (type: 'agree' | 'disagree') => {
		startTransition(() => commentInteractions(comment.id, type));
	};

	const handleEdit = async () => {
		const formData = new FormData();
		formData.append('id', comment.id);
		formData.append('blogId', blogId);
		formData.append('author', author);
		formData.append('content', content);
		formData.append('code', code);
		await editComment(formData);
		setEditMode(false);
		setCode('');
	};

	const handleDelete = async () => {
		const formData = new FormData();
		formData.append('id', comment.id);
		formData.append('blogId', blogId);
		formData.append('code', code);
		await deleteComment(formData);
		setEditMode(false);
		setCode('');
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
							<input 
								name="author" autoComplete="off"
								className="text-input w-full"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>

							<label htmlFor="content" className="custom-font-inter-tight text-white text-lg block m-2">
								Comment:<span className="text-red-500">*</span>
							</label>
							<textarea 
								name="content" autoComplete="off" rows={5}
								className="text-input w-full"
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>

							<label htmlFor="code" className="custom-font-inter-tight text-white text-lg block m-2">
								Code: (for edit/delete)<span className="text-red-500">*</span>
							</label>
							<input 
								name="code" autoComplete="off" 
								className="text-input w-full"
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>
							
							<div className="flex gap-2 flex-wrap mt-3 justify-end">
								<Button
									onClick={() => startTransition(handleEdit)}
									className="button-design" disabled={isPending}>
										{isPending ? 'Editing...' : 'Edit'}
								</Button>
								<Button
									onClick={() => {
										setEditMode(false);
										setCode('');
									}}
									className="button-design">
										Cancel
								</Button>
								<Button
									onClick={() => startTransition(handleDelete)}
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
								{new Date(comment.createdAt??'').toDateString()}
							</p>
						</div>

						<p className="custom-font-inter-regular text-white p-1 m-2">
							{comment.content}
						</p>

						<div className="flex gap-2 mt-3">
							<Button
								onClick={() => handleVote('agree')}
								className="interaction-button"
								disabled={isPending}>
								<IconThumbUp stroke={2}/> {comment.agree??0}
							</Button>
							<Button
								onClick={() => handleVote('disagree')}
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