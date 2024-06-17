import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Loading from "../components/Loading"
function HomePage() {
  return (
    <div className="text-white bg-yellow-400 w-full h-screen relative">
      <Loading />
      <Navbar />
      <Hero />
    </div>
  )
}
export default HomePage