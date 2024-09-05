import { BackgroundBeamsWithCollision } from "@/components/ui/background-with-Beam"
import { Button } from "@/components/ui/button"
import { InfiniteMovingCards } from "@/components/ui/ScrollingCard"
import { testimonials } from "@/constants"
import { useNavigate } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <Navigationbar/>
        <BackgroundBeamsWithCollision>
            <div className="p-5 pt-8 flex flex-col w-full">
                <header className="flex flex-col items-center justify-center mt-6">
                <h1 className="text-2xl md:text-7xl font-bold dark:text-white text-center">
                  FInd the JOb <br /> THat suits your life
                </h1>
                  <p className="max-w-4xl text-base md:text-xl mt-8 dark:text-neutral-200">
                  Discover your next career opportunity with <span className="font-extrabold
                  ">JobSpot</span>. Whether you're searching for your dream job or looking to hire top talent, our platform connects job seekers with employers seamlessly. Create, find, and apply to jobs with ease, and take the next step in your career journey today.
                  </p>
                </header>
                <div className="mt-24 flex justify-center items-center w-full gap-3">
                <InfiniteMovingCards
                  items={testimonials}
                  direction="left"
                  speed="fast"
                />
                </div>
            </div>
        </BackgroundBeamsWithCollision>
        <div className="p-6 w-full h-30 bg-slate-900 flex justify-between items-center">
            <h1>FOOTER</h1>
        </div>
    </div>
  )
}

export default Home



const Navigationbar = ()=>{
    const router = useNavigate();
    return(
        <div className="p-4 px-6 flex items-center justify-between bg-slate-900">
            <p className="text-3xl font-bold tracking-wider">JobSpot</p>
            <Button className="rounded-xl" onClick={()=>{
              router("/signin")
            }}>Join</Button>
        </div>
    )
} 

// export const products = [
//     {
//       title: "GOogle",
//       link: "https://gomoonbeam.com",
//       thumbnail:
//         "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-zngkd&psig=AOvVaw2Bmec-tG895VIU4GSHJQ50&ust=1724221074950000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjsyJX2gogDFQAAAAAdAAAAABAE",
//     },
//     {
//       title: "Cursor",
//       link: "https://cursor.so",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/cursor.png",
//     },
//     {
//       title: "Rogue",
//       link: "https://userogue.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/rogue.png",
//     },
   
//     {
//       title: "Editorially",
//       link: "https://editorially.org",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/editorially.png",
//     },
//     {
//       title: "Editrix AI",
//       link: "https://editrix.ai",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/editrix.png",
//     },
//     {
//       title: "Pixel Perfect",
//       link: "https://app.pixelperfect.quest",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
//     },
   
//     {
//       title: "Algochurn",
//       link: "https://algochurn.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
//     },
//     {
//       title: "Aceternity UI",
//       link: "https://ui.aceternity.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
//     },
//     {
//       title: "Tailwind Master Kit",
//       link: "https://tailwindmasterkit.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
//     },
//     {
//       title: "SmartBridge",
//       link: "https://smartbridgetech.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
//     },
//     {
//       title: "Renderwork Studio",
//       link: "https://renderwork.studio",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
//     },
   
//     {
//       title: "Creme Digital",
//       link: "https://cremedigital.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
//     },
//     {
//       title: "Golden Bells Academy",
//       link: "https://goldenbellsacademy.com",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
//     },
//     {
//       title: "Invoker Labs",
//       link: "https://invoker.lol",
//       thumbnail:
//         "https://aceternity.com/images/products/thumbnails/new/invoker.png",
//     },
// ]