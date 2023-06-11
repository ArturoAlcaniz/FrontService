export default function CustomOkMessage(msg: string): JSX.Element {
    return (
            msg ? (
                <div className="help form-feedback-ok">
                    {msg}
                </div>
            ) : (
                <div></div>
            )
    )
}