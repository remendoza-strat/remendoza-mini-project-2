'use client';
import {toast} from 'sonner';
import {addBlog} from '@/app/create/addBlog';

export default function Create(){
    async function handleSubmit(event : React.FormEvent<HTMLFormElement>){
        // prevent default and initialize variables
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        try{
            // get result of addBlog
            const result = await addBlog(formData);

            // display toast depending on status
            if(result.status === 1){
                toast.success("Blog created successfully!");
                form.reset();
            }
            else if(result.status === 2){
                toast.error("Please complete required fields.");
            }
            else{
                toast.error("Error occured in creating the blog.");
            }
        }
        catch{
            // display error
            toast.error("Error occured.");
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input name="title" autoComplete="off" placeholder="Title..."></input>
                <input name="imageUrl" autoComplete="off" placeholder="Image Url..."></input>
                <textarea name="content" autoComplete="off" placeholder="Content..."></textarea>
                <input name="author" autoComplete="off" placeholder="Author..."></input>
                <input name="code" autoComplete="off" placeholder="Code..."></input>
                <button type="submit">Create Blog</button>
            </form>
        </>
    );
}