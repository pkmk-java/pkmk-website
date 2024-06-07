import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

function HomePage() {
  return (
    <div className="text-white bg-yellow-400 w-full h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}
export default HomePage