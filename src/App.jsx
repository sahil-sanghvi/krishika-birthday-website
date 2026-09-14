import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ChildhoodGallery from './components/ChildhoodGallery'
import FamilySection from './components/FamilySection'
import FriendCarousel from './components/FriendCarousel'
import PhotoCollage from './components/PhotoCollage'
import MemoryGallery from './components/MemoryGallery'
import FinalMessage from './components/FinalMessage'
import Balloons from './components/Balloons'

export default function App() {
  return (
    // No background color here on purpose — it's set on <body> in index.css.
    // That keeps this wrapper's box from painting an opaque layer over the
    // fixed Balloons background, so they stay visible in the gaps.
    <div className="min-h-screen font-body text-plum">
      <Balloons />
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
