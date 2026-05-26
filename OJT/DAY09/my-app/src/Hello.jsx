import './App.css'

function Hello({ name = "Hirak" }) {
    return <h2 className='test'>Hello, {name}!</h2>
}

export default Hello 