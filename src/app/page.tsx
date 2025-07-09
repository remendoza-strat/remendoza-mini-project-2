import {IconThumbUp, IconArrowBigUpLines, IconArrowBigDownLines, IconBook} from '@tabler/icons-react';
import {Button} from "@/components/ui/button"

export default function Index(){
    return(
        <>
            <div className="px-2 mx-4">
                <h1 className="custom-font-triomphe text-white text-5xl my-5">Your thoughts, your space</h1>
                <p className="custom-font-inter-regular custom-font-gray-main text-md text-justify my-5">WriteSpace is the digital haven for writers, storytellers, and thinkers. Whether you are sharing life lessons, exploring new ideas, or documenting your creative journey, WriteSpace gives you a clean, distraction-free platform to publish your voice to the world.</p>
            </div>

            <div className="blog-card flex flex-col lg:flex-row p-10">

                <div className="flex-1/3 flex items-center justify-center">
                    <div className="w-[70%] aspect-auto">
                        <img 
                            src="https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/16:9/w_2580,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg"
                            className="w-full h-full object-cover rounded-lg"
                            alt="Article Thumbnail"
                        />
                    </div>
                </div>

                <div className="flex-2/3 flex flex-col">
                    <div className="flex-1 text-white text-3xl m-2">
                        <p><b>Global Climate Summit Addresses Urgent Climate Action</b></p>
                    </div>
                    <div className="flex-1 custom-font-gray-main text-md m-2">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque assumenda odit eos earum explicabo. Consectetur sunt repellat, aspernatur et debitis, ad, totam libero iusto numquam quia harum odit ullam quis.</p>
                    </div>
                    <div className="flex-1 flex text-sm m-2">
                        <div className="me-5">
                            <h3 className="custom-font-gray-main">Publication Date</h3>
                            <p className="text-white">June 8, 2025</p>
                        </div>
                        <div>
                            <h3 className="custom-font-gray-main">Author</h3>
                            <p className="text-white">Rhabi Mendoza</p>
                        </div>
                    </div>
                    <div className="flex-1 flex custom-font-gray-main text-sm m-2">
                        <div className="flex-1 flex">
                            <div className="flex me-1">
                                <Button variant="outline" size="sm" className="blog-card-stats rounded-full px-3 py-2">
                                    <IconThumbUp stroke={1} size={20}/>4
                                </Button>
                            </div>
                            <div className="flex me-1">
                                <Button variant="outline" size="sm" className="blog-card-stats rounded-full px-3 py-2">
                                     <IconArrowBigUpLines stroke={1} size={20}/>21
                                </Button>
                            </div>
                            <div className="flex me-1">
                                <Button variant="outline" size="sm" className="blog-card-stats rounded-full px-3 py-2">
                                    <IconArrowBigDownLines stroke={1} size={20}/>3
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Button variant="outline" size="sm" className="blog-card-stats rounded-md px-5 py-3">
                                <IconBook stroke={1}/>Read More
                            </Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}