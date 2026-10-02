import BotanistCarousel from './BotanistCarousel'

function Botanist() {
    return (
        <section
            id="botanist"
            className="botanist"
        >

            <h2>BOTANIST</h2>

            <div className="botanist-content">

                <div className="botanist-text">

                    <p>
                        I have 67+ orchids, and apparently that's not enough.
                        I love plants, terrariums, and building little ecosystems.
                    </p>

                    <p>
                        This is my terrarium. The bad boy has been living on its own for months.
                        I built the whole thing around Arduino.
                        It has a display showing the time, temperature and humidity,
                        PWM-controlled lighting that simulates sunrise and sunset,
                        an internal mister, and an internal circulation fan.
                        There's also a servo-controlled door that opens to exchange
                        air with the outside, together with another fan to help with the airflow.
                    </p>

                    <p>
                        Basically, I built a tiny ecosystem and then gave it a computer.
                    </p>

                </div>

                <BotanistCarousel />

            </div>

        </section>
    )
}

export default Botanist