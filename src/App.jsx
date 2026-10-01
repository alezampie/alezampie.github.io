import './App.css'

function App() {
    const name = 'Alessio'
    const role = 'Programmer / Musician / Creative Technologist'

    const sections = ['THE NERD', 'THE CREATIVE', 'THE MUSICIAN', 'THE PLANT GUY']

    return (
        <>
            <h1>Hi, I'm {name}.</h1>
            <p>{role}</p>

            <ul>
                {sections.map((section) => (
                    <li key={section}>{section}</li>
                ))}
            </ul>
        </>
    )
}

export default App