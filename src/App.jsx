import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ChildhoodGallery from './components/ChildhoodGallery'
import FamilySection from './components/FamilySection'
import FriendCarousel from './components/FriendCarousel'
import PhotoCollage from './components/PhotoCollage'
import MemoryGallery from './components/MemoryGallery'
import FinalMessage from './components/FinalMessage'

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-body text-plum">
      <Navigation />
      <main>
        <Hero />
        <ChildhoodGallery />
        <FamilySection />
        <FriendCarousel />
        <PhotoCollage />
        <MemoryGallery />
        <FinalMessage />
      </main>
    </div>
  )
}
