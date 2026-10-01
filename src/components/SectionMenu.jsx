import { useEffect, useRef, useState } from 'react'

function SectionMenu({ sections, onSectionClick }) {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const menuRef = useRef(null)

    useEffect(() => {
        menuRef.current.focus()
    }, [])

    function handleKeyDown(event) {

        if (event.key === 'ArrowDown') {
            setSelectedIndex((currentIndex) =>
                (currentIndex + 1) % sections.length
            )
        }

        if (event.key === 'ArrowUp') {
            setSelectedIndex((currentIndex) =>
                (currentIndex - 1 + sections.length) % sections.length
            )
        }

        if (event.key === 'Enter') {
            onSectionClick(sections[selectedIndex])
        }
    }

    return (
        <div
            ref={menuRef}
            className="section-menu"
            tabIndex="0"
            onKeyDown={handleKeyDown}
        >

            <div className="menu-content">

                <p className="menu-title">
                    WHAT DO YOU WANT TO SEE ABOUT ME?
                </p>

                <ul>
                    {sections.map((section, index) => (
                        <li
                            key={section}
                            className={index === selectedIndex ? 'selected' : ''}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => onSectionClick(section)}
                        >
                            <span className="cursor">
                                {index === selectedIndex ? '>' : ''}
                            </span>

                            <span>{section}</span>
                        </li>
                    ))}
                </ul>

                <div className="menu-help">
                    <div className="menu-help-content">
                        <p>select: ↑ ↓ key (or mouse ᘛ⁐̤ᕐᐷ)</p>
                        <p>set: ENTER (or click)</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SectionMenu