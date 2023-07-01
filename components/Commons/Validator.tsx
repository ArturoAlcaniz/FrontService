export function setErrors(thisComponent: any, componentError: string, errorMsg: string, formError: string) {
    let lista: Map<string, string> = new Map<string, string>();
    lista.set(componentError, errorMsg);
    thisComponent.setState({
        formError: formError,
        requestErrors: lista,
        requestOk: new Map<string, string>(),
    });
}