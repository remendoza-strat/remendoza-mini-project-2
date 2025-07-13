import {IconWritingSign} from "@tabler/icons-react";

export default function Loading(){
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#ae4975] to-[#505e78] z-50">
            <div className="flex flex-col items-center text-center scale-100 sm:scale-90 xs:scale-75">
                <div className="flex items-center gap-x-3 mb-4">
                    <IconWritingSign stroke={1.75} className="text-yellow-300" size={60}/>
                    <span className="custom-font-triomphe text-white text-5xl font-bold">WriteSpace</span>
                </div>
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-white"/>
            </div>
        </div>
    );
}