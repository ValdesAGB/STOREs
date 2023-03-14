const { createContext, useState, useEffect } = require('react')
const user = localStorage.getItem('user')

export const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([])
  const [oneProduct, setOneProduct] = useState({})
  const [oneProductToUpdate, setOneProductToUpdate] = useState()
  const [nameProductToUpdate, setNameProductToUpdate] = useState()
  const [descriptionProductToUpdate, setDescriptionProductToUpdate] = useState()
  const [priceProductToUpdate, setPriceProductToUpdate] = useState()
  const [coverProductToUpdate, setCoverProductToUpdate] = useState()
  const [inStockProductToUpdate, setInStockProductToUpdate] = useState()

  const ProductUpdate = {
    name: nameProductToUpdate,
    description: descriptionProductToUpdate,
    price: priceProductToUpdate,
    cover: coverProductToUpdate,
    inStock: inStockProductToUpdate,
  }

  const toggleAllProducts = (prods) => {
    setAllProducts(prods)
  }
  const toggleOneProduct = (prod) => {
    setOneProduct(prod)
  }

  const toggleOneProductToUpdate = (prod) => {
    setOneProductToUpdate(prod)
  }

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        toggleAllProducts,
        oneProduct,
        toggleOneProduct,
        oneProductToUpdate,
        toggleOneProductToUpdate,
        ProductUpdate,
        setNameProductToUpdate,
        setDescriptionProductToUpdate,
        setPriceProductToUpdate,
        setCoverProductToUpdate,
        setInStockProductToUpdate,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const NewProductContext = createContext()
export const NewProductProvider = ({ children }) => {
  const [nameProduct, setNameProduct] = useState('')
  const [descriptionProduct, setDescriptionProduct] = useState('')
  const [priceProduct, setPriceProduct] = useState(0)
  const [coverProduct, setCoverProduct] = useState('')
  const [inStockProduct, setInStockProduct] = useState(true)
  const [userID, setUserID] = useState(user ? JSON.parse(user) : {})

  const ProductModel = {
    name: nameProduct,
    description: descriptionProduct,
    price: priceProduct,
    cover: coverProduct,
    inStock: inStockProduct,
    userId: userID.userId,
  }

  return (
    <NewProductContext.Provider
      value={{
        ProductModel,
        inStockProduct,
        setNameProduct,
        setDescriptionProduct,
        setPriceProduct,
        setCoverProduct,
        setInStockProduct,
      }}
    >
      {children}
    </NewProductContext.Provider>
  )
}

export const MessageContext = createContext()
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const toggleMessage = (mes) => {
    setMessage(mes)
  }

  return (
    <MessageContext.Provider value={{ message, toggleMessage, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export const LoadingContext = createContext()
export const LoadingProvider = ({ children }) => {
  const [isDataLoading, setIsDataLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isDataLoading, setIsDataLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const UserContext = createContext()
export const UserProvider = ({ children }) => {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const UserInformations = {
    lastName,
    firstName,
    mail,
    password,
    confirmPassword,
  }
  const [loginMail, setLoginMail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginInformations = {
    loginMail,
    loginPassword,
  }

  const [userLogin, setUserLogin] = useState(user ? JSON.parse(user) : null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUserLogin(JSON.parse(user))
    }
  }, [])

  const [userProducts, setUserProducts] = useState([])

  return (
    <UserContext.Provider
      value={{
        setLastName,
        setFirstName,
        setMail,
        setPassword,
        setConfirmPassword,
        setShowPassword,
        showPassword,
        UserInformations,
        setLoginMail,
        setLoginPassword,
        loginInformations,
        userLogin,
        userProducts,
        setUserProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
