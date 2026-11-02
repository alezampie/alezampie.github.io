
import MusicProject from './MusicProject'

const personalTracks = [
    {
        name: 'Fidarsi',
        url: 'https://open.spotify.com/track/55DlYbvPh82PHSyJbdzqTX'
    },
    {
        name: 'Cambiare',
        url: 'https://open.spotify.com/track/3rdS6jntWSYYDLcaE1ymPK'
    },
    {
        name: 'Quadrifogli',
        url: 'https://open.spotify.com/track/6DpgmObmoLbqhULuGJsiZ4'
    }
]

const bandTracks = [
    {
        name: 'Abbastanza',
        url: 'https://open.spotify.com/track/2KfLoiT00BtuQx6uiVt8T4'
    },
    {
        name: 'Lunacy',
        url: 'https://open.spotify.com/track/4BaKF505RfSIhdSraUl8H4'
    },
    {
        name: 'Tarot',
        url: 'https://open.spotify.com/track/43IP2X8quSh0Kk6mEsWXNX'
    }
]

function Musician() {
    return (
        <section
            id="musician"
            className="musician"
        >
            <h2>MUSICIAN</h2>

            <MusicProject
                name="ZAMPIEROLO"
                description={
                    <>
                        <p>
                            Electronic, experimental music.
                            Somehow, all my songs end up being love songs.
                            Maybe that's just what I'm made for.
                        </p>

                        <p>
                            I write, sing, play, produce, mix and master
                            everything myself. 100% homemade.
                            You can probably tell.
                        </p>
                    </>
                }
                spotifyUrl="https://open.spotify.com/artist/1405mpUUNRLEd7qZb4Pn31"
                instagramUrl="https://www.instagram.com/ale_zampie/"
                instagramText="Want to see what I'm up to?"
                profileCaption="hi, that's me"
                tracks={personalTracks}
            />

            <MusicProject
                name="DEAR LUNACY"
                description={
                    <>
                        <p>
                            Somewhere between pop-punk, alternative
                            and whatever we're feeling that day.
                        </p>

                        <p>
                            It's what makes me feel cool.
                            Especially when we're playing live.
                        </p>

                        <p>
                            We're still figuring out what we are.
                            The best songs are yet to come.
                        </p>
                    </>
                }
                spotifyUrl="https://open.spotify.com/artist/6nGZB4U2Pp9HUlkRrDGGIE"
                instagramUrl="https://www.instagram.com/dearlunacy_/"
                instagramText="Want to see what we're up to?"
                profileCaption="hi, that's us"
                tracks={bandTracks}
            />

        </section>
    )
}

export default Musician
