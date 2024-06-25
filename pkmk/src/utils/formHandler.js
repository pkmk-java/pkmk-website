export const formHandler = (type, data, setStates) => {
  switch (type) {
    case "email":
      setStates(data);
      break;
    case "password":
      setStates(data);
      break;
    case "username":
      setStates(data);
      break;
    case "productName":
      setStates(data);
      break;
    case "description":
      setStates(data);
      break;
    case "price":
      setStates(data);
      break;
    case "stock":
      setStates(data);
      break;
    case "image":
      setStates(data);
      break;
  }
};
