function Stopwatch(props) {
    return (
        <div className="Stopwatch">
            <div className="time-container">
                {props.minutes > 0 ? `${props.minutes} min ` : ""}  {props.seconds} seconds
            </div>
        </div>
    )
}

export default Stopwatch;
