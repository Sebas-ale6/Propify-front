
const Button = ({text, action}) => {

    return(

        <button className="Button_button" onClick={action}> {text} </button>

    )

};


export default Button;