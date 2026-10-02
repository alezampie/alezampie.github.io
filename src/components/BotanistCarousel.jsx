import { useRef, useState } from 'react'

const terrariumPhotos = Array.from(
    { length: 11 },
    (_, index) =>
        `https://res.cloudinary.com/catmvdjs/image/upload/v1790949506/terrario${index + 1}.jpg`
)

function BotanistCarousel() {

    const carouselRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    function scroll(direction) {

        const nextIndex =
            (currentIndex + direction + terrariumPhotos.length) %
            terrariumPhotos.length

        setCurrentIndex(nextIndex)

        if (!carouselRef.current) {
            return
        }

        const amount =
            carouselRef.current.clientWidth

        carouselRef.current.scrollTo({
            left: nextIndex * amount,
            behavior: 'smooth'
        })
    }

    return (
        <div className="botanist-carousel">

            <button
                className="botanist-carousel-button"
                onClick={() => scroll(-1)}
                aria-label="Previous photo"
            >
                &lt;
            </button>

            <div
                ref={carouselRef}
                className="botanist-carousel-viewport"
            >

                <div className="botanist-carousel-container">

                    {terrariumPhotos.map((photo, index) => (
                        <div
                            className="botanist-photo"
                            key={photo}
                        >
                            <img
                                src={photo}
                                alt={`Terrarium photo ${index + 1}`}
                            />
                        </div>
                    ))}

                </div>

            </div>

            <button
                className="botanist-carousel-button"
                onClick={() => scroll(1)}
                aria-label="Next photo"
            >
                &gt;
            </button>

        </div>
    )
}

export default BotanistCarousel