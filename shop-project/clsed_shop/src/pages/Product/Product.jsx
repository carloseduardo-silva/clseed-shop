import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";


//css
import styles from "./Product.module.css"

//hooks
import { useFetchData } from '../../hooks/useFetchData'
import { useToLocalStorage } from '../../hooks/useToLocalStorage'
import { useGetLocalStorage } from '../../hooks/useGetLocalStorage'

//components
import Nav from '../../components/Nav'
import Discount from '../../components/Discount'
//hooks
import { useCounterValue } from '../../hooks/useCounterValue'
import { useValidateAddShop } from '../../hooks/useValidateAddShop'
import { useSumAmount } from '../../hooks/useSumAmount'





const Product = () => {

  
  const [size, setSize] = useState(null)
  const [amount, setAmount] = useState(null)
  const [validateError, setValidateError] = useState(null)
  const [imagesArr, setImagesArr] = useState([])
  const [carrouselShow, setCarrouselShow] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('left');


    //get idProduct from URL
    const { id } = useParams()

    //fetch data from DB
    const {data, loading, error:fetchError, image} = useFetchData('products', null, id)

   
    useEffect(() =>{
      window.scroll(0,0)
    }, [])

    useEffect(() =>{
      setImagesArr(data.CarrouselIMG)
      
    })


    //get datas already saved in localStorage
    const {datas} = useGetLocalStorage()

    //return the last key saved on localStorage
    const {counterValue} = useCounterValue(datas)

    //carrousel slides
    const slideVariants = {
      hiddenRight: {
        x: "30%",
        opacity: 0,
      },
      hiddenLeft: {
        x: "-30%",
        opacity: 0,
      },
      visible: {
        x: "0",
        opacity: 1,
        
        transition: {
          duration: 1,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.1,
        display:'none',
        transition: {
          duration: 0,
        },
      },
    };


    //calls the right fn according to the btn value
    const handleProduct = (e) =>{
      e.preventDefault()
      
      let btn = e.nativeEvent.submitter.value

      switch(btn){
        case 'addShop':
          addShop()
          break

        case 'buyNow':
          //buyNow()
          break
      }
    }

    //add product in shoppingCart
    function addShop(){

      var counter;

      //first product in the shoppingCart
      if(datas.length == 0){
        counter = datas.length+1
      } 
      //another one product in the shoppingCart
      else{
      counter = counterValue+1
      }

      const shopDatas = {
        name: data.name,
        price: data.price,
        id: data.idProduct,
        URLimage: data.URLimage,
        key: counter,
        size,
        amount: Number.parseInt(amount)
      }


      if(!size){
        setValidateError('Por favor selecione o tamanho.')
      
      } else if(!amount){
        setValidateError('Por favor selecione a quantidade.')
      
      //same product with the same size has already been added to the shoopingCart  
      } else if(useValidateAddShop(shopDatas, datas)){
        
        let {infoObj} = useSumAmount(shopDatas, datas)
        
        let newAmount = Number.parseInt(infoObj.lastAmount) + Number.parseInt(amount)

        const newShopDatas = {
          name: data.name,
          price: data.price,
          id: data.idProduct,
          URLimage: data.URLimage,
          key: infoObj.key,
          size,
          amount: newAmount
        }

        console.log(newShopDatas)

        if (useToLocalStorage(newShopDatas, infoObj.key)){
          window.location.reload()
        }
        


      }

      //first time adding the current product
      else{
        setValidateError(null)
        //pass object with the datas of the products to the localstorage
       if(useToLocalStorage(shopDatas, counter)){
        window.location.reload()
       }}}

    function nextImage(){
      setCarrouselShow(true)
      setDirection("left");
      setCurrentIndex((prevIndex) =>
      prevIndex + 1 === imagesArr.length ? 0 : prevIndex + 1
    );
    }

    function previousImage(){
      setCarrouselShow(true)
      setDirection("right");
      setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? imagesArr.length - 1 : prevIndex - 1
    );}

    

  return (
    <div>
      <Nav/>
      <Discount/>
        <div className={styles.product_container}> 
        
          <div className={styles.img_container}>
              <span onClick={() => previousImage()} class="material-symbols-outlined back">arrow_back</span>

              {carrouselShow && <AnimatePresence>
                <motion.img 
                key={currentIndex}
              variants={slideVariants}
              initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit" 
              src={imagesArr[currentIndex]} alt="camiseta" /> 
              </AnimatePresence> }
              {!carrouselShow && <img src={image} alt="camiseta" />}
              {!image && <p>Carregando imagem...</p>}

              <span onClick={() => nextImage()} class="material-symbols-outlined forward">arrow_forward</span>

          </div>

          <div className={styles.product_info}>
                <div className={styles.product_header}>
                  <h2> {data.name}</h2>
                  <span>R${data.price},00</span>
                </div>

                <div className={styles.product_description}>
                  <h2>Descrição</h2>
                  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptas ut mollitia commodi dolorum. Eveniet adipisci modi saepe obcaecati aliquam vero, dolores molestias earum rerum nemo, ab tempore omnis odit! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>

                </div>

                <form onSubmit={handleProduct}>
                  
                <label>
                  <p>Tamanho</p>
                  <select  onChange={(e) => setSize(e.target.value)} name="sizes" id="sizes">
                    <option value="P/S">-</option>
                    <option value="P/S">P/S</option>
                    <option value="M">M</option>
                    <option value="G/L">G/L</option>
                    <option value="GG/XL">GG/XL</option>
                  </select>
                </label>

                <label>
                  <p>Quantidade</p>
                  <input onChange={(e) => setAmount(e.target.value)} min={0} type="number" name="amount" id="amount" />
                </label>

                <div className={styles.button_container}>
                  <button value='buyNow' className={styles.buyNow} type='submit'>Compre já</button>
                  <button value='addShop' className={styles.addShop} type='submit'>Adicionar ao carrinho</button>
                  {validateError && <p> {validateError}</p>}
                </div>

                </form>


          </div>

        </div>

        <div className={styles.apresentation}>
          <p>Mais que uma marca...</p>

          <p>Somos referencia no streetwear nacional desde 2015</p>

          <p>Vestimos alguns dos artistas e criadores mais influentes do momento</p>

          <p>Mais de 20mil pedidos enviados para o mundo inteiro</p>

          <p>  
            Produtos de qualidade feitos para durarem décadas
          </p>

          <p>Mais de 2mil membros ativos no Captive Club
            </p>  
        </div>


      
    </div>
  )
}

export default Product
