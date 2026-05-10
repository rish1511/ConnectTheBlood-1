import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'

const features = [
  { title: 'Fast search', description: 'Quickly find donors by blood type and location.' },
  { title: 'Real-time requests', description: 'Monitor donations and request status instantly.' },
  { title: 'Verified network', description: 'Connect with trusted donors and blood banks.' },
]

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <section className="feature-grid">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>
    </div>
  )
}
