import { IconThumbUp, IconArrowBigUpLines, IconArrowBigDownLines   } from '@tabler/icons-react';
export default function Index(){
    return(
        <>
            <div className="px-2 mx-4">
                <h1 className="custom-font-triomphe text-white text-5xl my-5">Your thoughts, your space</h1>
                <p className="custom-font-inter-regular custom-font-gray-main text-md text-justify my-5">WriteSpace is the digital haven for writers, storytellers, and thinkers. Whether you are sharing life lessons, exploring new ideas, or documenting your creative journey, WriteSpace gives you a clean, distraction-free platform to publish your voice to the world.</p>
            </div>

            <div className="flex flex-col lg:flex-row">


                <div className="flex-1/3 bg-amber-200 flex items-center justify-center">
                    <div className="w-[70%] aspect-video">
                        <img 
                            src="https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/16:9/w_2580,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg"
                            className="w-full h-full object-cover"
                            alt="Article Thumbnail"
                        />
                    </div>
                </div>

                <div className="flex-2/3 bg-blue-900 flex flex-col">
                    <div className="bg-pink-100 flex-1">
                        <p>Global Climate Summit Addresses Urgent Climate Action</p>
                    </div>
                    <div className="bg-red-600 flex-1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque assumenda odit eos earum explicabo. Consectetur sunt repellat, aspernatur et debitis, ad, totam libero iusto numquam quia harum odit ullam quis.</p>
                    </div>
                    <div className="bg-amber-500 flex-1 flex">
                        <div>
                            <h3>Publication Date</h3>
                            <p>June 8, 2025</p>
                        </div>
                        <div>
                            <h3>Author</h3>
                            <p>Rhabi Mendoza</p>
                        </div>
                    </div>
                    <div className="bg-fuchsia-400 flex-1 flex">
                        <div className="flex-1 flex">
                            <div className="flex">
                                <IconThumbUp stroke={2}/>
                                <p>23</p>
                            </div>
                            <div className="flex">
                                <IconArrowBigUpLines stroke={2}/>
                                <p>15</p>
                            </div>
                            <div className="flex">
                                <IconArrowBigDownLines stroke={2}/>
                                <p>10</p>
                            </div>
                        </div>
                        <div>
                            <button>Read More</button>
                        </div>
                    </div>
                </div>
            </div>
            





        </>
    );
}