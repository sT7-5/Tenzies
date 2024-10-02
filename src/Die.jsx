

export default function Die(props){

    return(
        <div className={props.isHeld ? 'diceHeld' :'diceNotHeld'} onClick={props.holdDice}>

            <h2 className="dieNum">{props.value}</h2>
        </div>
    )
}