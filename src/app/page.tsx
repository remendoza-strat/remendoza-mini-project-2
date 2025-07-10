import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {IconArrowRight} from '@tabler/icons-react';

export default function Index(){
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-[80%]">
                <h1 className="custom-font-triomphe text-white text-7xl my-5">
                    Your thoughts, your space
                </h1>
                <p className="custom-font-inter-regular custom-font-gray-main text-xl text-justify my-5">
                    WriteSpace is the digital haven for writers, storytellers, and thinkers. Whether you are sharing life lessons, exploring new ideas, or documenting your creative journey, WriteSpace gives you a clean, distraction-free platform to publish your voice to the world.
                </p>
                <Link href="/create">
                    <Button variant="outline" size="sm" className="index-button-start">
                        Start writing now <IconArrowRight/>
                    </Button>
                </Link>       
            </div>
        </div>
    );
}