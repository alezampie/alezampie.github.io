
import { useEffect, useState } from 'react'

function MusicProject({
    name,
    description,
    spotifyUrl,
    instagramUrl,
    instagramText,
    profileCaption,
    tracks
}) {
    const [profileImage, setProfileImage] = useState('')
    const [trackImages, setTrackImages] = useState([])

    useEffect(() => {
        async function loadSpotifyImage(url) {
            try {
                const response = await fetch(
                    `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`
                )

                if (!response.ok) return ''

                const data = await response.json()
                return data.thumbnail_url || ''
            } catch (error) {
                console.error('Spotify image error:', error)
                return ''
            }
        }

        async function loadImages() {
            const profile = await loadSpotifyImage(spotifyUrl)
            setProfileImage(profile)

            const images = await Promise.all(
                tracks.map(track => loadSpotifyImage(track.url))
            )

            setTrackImages(images)
        }

        loadImages()
    }, [spotifyUrl, tracks])

    return (
        <article className="music-project">

            <h3 className="music-project-title">
                {name}
            </h3>

            <div className="music-project-main">

                <div className="music-project-about">

                    <div className="music-project-profile-container">
                        {profileImage && (
                            <img
                                className="music-project-profile"
                                src={profileImage}
                                alt={`${name} profile`}
                            />
                        )}

                        <span>{profileCaption}</span>
                    </div>

                    <div className="music-project-description">
                        {description}
                    </div>

                </div>

                <div className="music-project-tracks">

                    {tracks.map((track, index) => (
                        <a
                            className="music-track"
                            href={track.url}
                            target="_blank"
                            rel="noreferrer"
                            key={track.name}
                        >
                            {trackImages[index] && (
                                <img
                                    src={trackImages[index]}
                                    alt={`${track.name} cover`}
                                />
                            )}

                            <span>{track.name}</span>
                        </a>
                    ))}

                </div>

            </div>

            <div className="music-project-links">

                <span>
                    More music on Spotify:{' '}
                    <a
                        href={spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <strong>click here</strong>
                    </a>
                </span>

                <span>
                    {instagramText}{' '}
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <strong>click here</strong>
                    </a>
                </span>

            </div>

        </article>
    )
}

export default MusicProject
