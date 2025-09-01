import AboutRecap from './about-section'
import Hero from './hero'
import ProjectsRecap from './projects-section'

const HomeComponent = () => {
    return (
        <div className='relative'>
            <Hero />
            <AboutRecap />
            <ProjectsRecap />
        </div>
    )
}

export default HomeComponent