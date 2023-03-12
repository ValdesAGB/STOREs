const { createContext, useState } = require('react')

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

  // const [userID, setUserID] = useState(login ? JSON.parse(login) : {})
  const ProductModel = {
    name: nameProduct,
    description: descriptionProduct,
    price: priceProduct,
    cover: coverProduct,
    inStock: inStockProduct,
    //date: time,
    // userID: userID.userId,
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
