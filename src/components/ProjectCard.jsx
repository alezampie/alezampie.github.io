function ProjectCard({ project }) {
    return (
        <article className="project-card">

            <div className="project-video">
                {project.video && (
                    <div className="project-video-frame">
                        <iframe
                            src={project.video}
                            title={`${project.title} demo`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>

            <div className="project-info">

                <div className="project-title">
                    <h3>
                        {project.title}
                    </h3>
                </div>

                <div className="project-github">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub → CLICK HERE
                    </a>
                </div>

                <div className="project-description">
                    <p>
                        {project.description}
                    </p>
                </div>

                <div className="project-technologies">
                    <span>
                        {project.technologies.join(' · ')}
                    </span>
                </div>

            </div>

        </article>
    )
}

export default ProjectCard