function Calculator() {
    const [input, setInput] = React.useState("");

    const handleClick = (value) => {
        if (value === "=") {
            try {
                setInput(eval(input).toString());
            } catch (error) {
                setInput("Hiba");
            }
        } else if (value === "C") {
            setInput("");
        } else {
            setInput(input + value);
        }
    };

    return (
        <div className="calculator">
            <h2>Calculator</h2>
            <div className="display">{input || "0"}</div>
            <div className="buttons">
                {["7", "8", "9", "/"].map(val => <button onClick={() => handleClick(val)}>{val}</button>)}
                {["4", "5", "6", "*"].map(val => <button onClick={() => handleClick(val)}>{val}</button>)}
                {["1", "2", "3", "-"].map(val => <button onClick={() => handleClick(val)}>{val}</button>)}
                {["C", "0", "=", "+"].map(val => <button onClick={() => handleClick(val)}>{val}</button>)}
            </div>
        </div>
    );
}
