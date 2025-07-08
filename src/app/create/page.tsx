import {addBlog} from './addBlog';

export default function Create(){
    return(
        <>
            <form action={addBlog}>
                <input name="title" autoComplete="off" required placeholder="Title..."></input>
                <input name="imageUrl" autoComplete="off" required placeholder="Image Url..."></input>
                <textarea name="content" autoComplete="off" required placeholder="Content..."></textarea>
                <input name="author" autoComplete="off" required placeholder="Author..."></input>
                <input name="code" autoComplete="off" required placeholder="Code..."></input>
                <button>Create Blog</button>
            </form>
        </>
    );
}