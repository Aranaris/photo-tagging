import '../styles/Button.css';

function Button({onClick, text, as: Component = 'button', ...rest}) {
    return (
        <div className="Button">
            <Component {...rest}>
                {text}
            </Component>
        </div>
    )
}

export default Button;