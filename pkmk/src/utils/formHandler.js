export const formHandler = (type, data, setStates) => {
    switch (type) {
        case "email":
            setStates(data)
            break;
        case "password":
            setStates(data)
            break;
        case "username":
            setStates(data);
            break;
    }
}