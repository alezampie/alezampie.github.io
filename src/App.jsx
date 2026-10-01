import './App.css'
import { useState } from 'react'

import Intro from './components/Intro'
import SectionMenu from './components/SectionMenu'


function App() {

    const sections = [
        'PROGRAMMER',
        'CREATIVE CODE DIY',
        'BOTANIST',
        'MUSICIAN'
    ]

    const [selectedSection, setSelectedSection] = useState(null)

    function handleSectionClick(section) {
        setSelectedSection(section)
    }

    return (
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

            {selectedSection && (
                <p>You found: {selectedSection}</p>
            )}

        </main>
    )
}

export default App