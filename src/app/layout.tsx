import "./globals.css";
import "./custom.css";
import {Toaster} from "@/components/ui/sonner";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

export default function RootLayout({children} : Readonly<{children : React.ReactNode}>){
    return(
        <html lang="en">
            <body>
                <Toaster/>
                <Navbar/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}