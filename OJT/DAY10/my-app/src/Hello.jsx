function Hello() {
    const yourname = 'BHATTJI'
    const yourname2 = 'BHATT HIRAK'

    const getname = (name) => {
        return name || 'BHATTJII'
    }

    function handleclick() {
        alert('button clicked')
    }

    const handleinput = (event) => {
        console.log(event.target.value)
        console.log('input value changed')
    }

    return (
        <>
            <h1>HELLO {getname(yourname)}</h1>
            <h2>bye {getname(yourname2)}</h2>
            <button onClick={handleclick}>CLICK ME</button>
            <button onClick={() => alert('button clicked')}>CLICK ME</button>
            <br />
            <input type="text" onChange={handleinput} placeholder="Enter your name" />
        </>
     )
}

export default Hello