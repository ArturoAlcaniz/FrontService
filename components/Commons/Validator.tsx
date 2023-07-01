export function setErrors(thisComponent: any, lista: any) {
    thisComponent.setState({
        requestErrors: lista,
        requestOk: new Map<string, string>(),
    });
}