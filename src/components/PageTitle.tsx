export function PageTitle({title, subtitle} : {title: string, subtitle: string}){
    return(
        <div className="m-5">
            <h1 className="custom-font-triomphe text-white text-5xl my-2">
                {title}
            </h1>
            <p className="custom-font-inter-tight custom-font-gray-main text-md my-2">
                {subtitle}
            </p>
        </div>
    );
}