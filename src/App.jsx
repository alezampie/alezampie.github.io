import './App.css'
import { useEffect, useRef, useState } from 'react'

import Intro from './components/Intro'
import SectionMenu from './components/SectionMenu'
import Programmer from './components/Programmer'
import MousePet from './components/MousePet'


function App() {

    const sections = [
        'PROGRAMMER',
        'CREATIVE CODE DIY',
        'BOTANIST',
        'MUSICIAN'
    ]

    const [selectedSection, setSelectedSection] = useState(null)
    const programmerRef = useRef(null)

    function handleSectionClick(section) {
        setSelectedSection(section)
    }

    useEffect(() => {
        if (selectedSection === 'PROGRAMMER') {
            const target = programmerRef.current

            if (!target) {
                return
            }

            const start = window.scrollY
            const end = target.getBoundingClientRect().top + window.scrollY
            const distance = end - start

            const duration = 1400
            const startTime = performance.now()

            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)

                const easedProgress =
                    1 - Math.pow(1 - progress, 3)

                window.scrollTo(
                    0,
                    start + distance * easedProgress
                )

                if (progress < 1) {
                    requestAnimationFrame(animateScroll)
                }
            }

            requestAnimationFrame(animateScroll)
        }
    }, [selectedSection])

    return (
        <>
            <main className="home">
                <section className="intro">
                    <Intro />
                </section>

                <section className="menu">
                    <SectionMenu
                        sections={sections}
                        onSectionClick={handleSectionClick}
                    />
                </section>
            </main>

            {selectedSection === 'PROGRAMMER' && (
                <div ref={programmerRef}>
                    <Programmer />
                </div>
            )}

            <MousePet />
        </>
    )
}

export default App