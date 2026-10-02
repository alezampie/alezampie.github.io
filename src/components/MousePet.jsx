import { useEffect, useRef, useState } from 'react'

function MousePet() {
    const [isPlaying, setIsPlaying] = useState(true)
    const [phrase, setPhrase] = useState('')
    const phraseIndex = useRef(0)
    const interactionCooldown = useRef(false)
    const phraseTimer = useRef(null)

    const phrases = [
        'what are you doing here?',
        'did you know that I have 67+ orchids in my bedroom?',
        'did you know that I play in a punk band?',
        'did you know that I make songs?',
        'you found me.',
        'nice website, huh?',
        'i live here now.',
        'please don\'t click me again.',
        'ok you can click me again.',
        'i\'m just watching.',
        'you clicked me.',
        'why?',
        'i have 67+ orchids.',
        'yes, 67+. i counted.',
        'i play bass btw',
        'i make music too',
        'this website was made by a nerd',
        'please explore the website',
        'you weren\'t supposed to find me',
        'ribbit.',
        '...'
    ]

    useEffect(() => {
        function randomTime() {
            return Math.floor(Math.random() * 2001) + 2000
        }

        let timer

        function scheduleNext() {
            timer = setTimeout(() => {
                setIsPlaying((playing) => !playing)
            }, randomTime())
        }

        scheduleNext()

        return () => clearTimeout(timer)
    }, [isPlaying])

    function handleInteraction() {
        if (interactionCooldown.current) return

        interactionCooldown.current = true

        setPhrase(phrases[phraseIndex.current])
        phraseIndex.current =
            (phraseIndex.current + 1) % phrases.length

        clearTimeout(phraseTimer.current)

        phraseTimer.current = setTimeout(() => {
            setPhrase('')
        }, 4000)

        setTimeout(() => {
            interactionCooldown.current = false
        }, 1000)
    }

    useEffect(() => {
        return () => {
            clearTimeout(phraseTimer.current)
        }
    }, [])

    return (
        <div className="mouse-pet">
            {phrase && (
                <div className="mouse-phrase">
                    {phrase}
                </div>
            )}

            <div
                onMouseEnter={handleInteraction}
                onClick={handleInteraction}
            >
                {isPlaying ? (
                    <img
                        src="/media/topolino_nobg_crop.gif"
                        alt=""
                    />
                ) : (
                    <img
                        src="/media/topolino_static.png"
                        alt=""
                    />
                )}
            </div>
        </div>
    )
}

export default MousePet