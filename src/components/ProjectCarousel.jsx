import useEmblaCarousel from 'embla-carousel-react'

import projects from '../data/projects'
import ProjectCard from './ProjectCard'

function ProjectCarousel() {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    })

    function scrollPrevious() {
        emblaApi?.scrollPrev()
    }

    function scrollNext() {
        emblaApi?.scrollNext()
    }

    return (
        <div className="project-carousel">

            <button
                className="carousel-button carousel-button-previous"
                onClick={scrollPrevious}
            >
                &lt;
            </button>

            <div
                className="project-carousel-viewport"
                ref={emblaRef}
            >

                <div className="project-carousel-container">

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                        />
                    ))}

                </div>

            </div>

            <button
                className="carousel-button carousel-button-next"
                onClick={scrollNext}
            >
                &gt;
            </button>

        </div>
    )
}

export default ProjectCarousel