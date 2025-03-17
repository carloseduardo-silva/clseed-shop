import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

//css
import styles from './Cart.module.css'


//componentes
import Nav from '../../components/Nav'

//hooks
import { useGetLocalStorage } from '../../hooks/useGetLocalStorage'
import { useTotalValueShop } from '../../hooks/useTotalValueShop'
import { useAddItem } from '../../hooks/useAddItem'
import { useRemoveItem } from '../../hooks/useRemoveItem'
import { useToLocalStorage } from '../../hooks/useToLocalStorage'



const Cart = () => {

const[shopDatas, setShopDatas] = useState(null)
const [validateError, setValidateError] = useState(null)


const { datas } = useGetLocalStorage()

const {totalValue} = useTotalValueShop(datas)

  //setting datas as shopDatas to be listed on the cart
  useEffect(() =>{
      
      //first item
      if( datas.length == 0 ) {
        
        setValidateError('nao há items adicionados ao carrinho')
      }else{
        setShopDatas(datas)
      }
    
    },[])

  //add a item from a product
  const addItem = (data) =>{
    let newAmount = data.amount + 1
    
    const {productData} = useAddItem(data, newAmount)
    
    useToLocalStorage(productData, productData.key)
    window.location.reload()
  }
 //remove a item from a product
  const removeItem = (data) =>{

    if(data.amount == 1){
        return
    }
    else{
        let newAmount = data.amount - 1
    
        const {productData} = useRemoveItem(data, newAmount)
        
        useToLocalStorage(productData, productData.key)
        window.location.reload()
    }

  }
  

  return (
    <div >
        <Nav/>

        <div className={styles.cart_container}>
            <h1> Seu carrinho </h1>
            
            <div className={styles.cart_header}>
                <span style={{marginLeft:'1.5em'}}>PRODUTO</span>

                <div className={styles.cart_headerInfo}>
                    <span> QUANTIDADE</span>
                    <span> TOTAL </span>
                </div>
            </div>

            <div className={styles.cart_products}>


            {validateError && <h3> {validateError}</h3>}
            {shopDatas && shopDatas.map((data) =>(
                <div className={styles.card_product}>

                    <div className={styles.product_1}>
                        
                            <img src={JSON.parse(data).URLimage} alt="" />
                       
                        <div className={styles.product_info}>
                            <p>{JSON.parse(data).name}</p>
                            <p>{JSON.parse(data).size}</p>
                            <p>R${JSON.parse(data).price},00</p>
                        </div>
                    </div>
                  
                

                    <div className={styles.product_2}>

                        <div class="quantity">    
                            <button onClick={() => removeItem(JSON.parse(data))} class="btn minus1">-</button>
                            <input value={JSON.parse(data).amount}  class="quantity" id="quantity" min="0" name="quantity"  type="number"/>
                            <button onClick={() => addItem(JSON.parse(data))} class="btn add1">+</button>
                      </div>

                        <div className={styles.product_price}>R$ {(JSON.parse(data).price * JSON.parse(data).amount)},00</div>
                        </div>

                </div>
                  ))}

               

            </div>

            <div className={styles.cart_subtotal}>
                    <p> Subtotal: R${totalValue},00</p>
                    <span> CLSEDCLUB (-R$ DESCONTO)</span>
                    <p style={{fontSize:'28px', fontWeight:'500'}}>R$ {totalValue},00</p>

                    <p style={{fontSize:'14px', color:' rgb(90, 90, 90)', margin:'0px'}}> Taxas e frete calculados na próxima página.
                    </p>

                    <div className={styles.subtotal_btn}>
                        <button onClick={() => {refreshShop()}} className={styles.btn_update}> Atualizar</button>
                        <Link to={'/verification'}><button className={styles.btn_shop}> Verificação de Compra</button></Link>
                    </div>
                    

            </div>
        </div>
        
        <div className={styles.paymentInfo_container}>

              <div className={styles.paymentInfo_card}>
                <h3>Formas de pagamento 💳</h3>
                <p>Até 12x no cartão de credito ou a vista via PIX </p>
              </div>

              <div className={styles.paymentInfo_card}>
                <h3>Site 100% seguro 🔒</h3>
                <p>Pagamentos e dados segurados pela empresa PagarMe </p>
              </div>

              <div className={styles.paymentInfo_card}>
                <h3>Frete Grátis ✈️</h3>
                <p>Para todo Brasil nas compras acima de R$349,00 </p>
              </div>

              <div className={styles.paymentInfo_card}>
                <h3>Troca Fácil 🔄</h3>
                <p>Precisou trocar? Sem problemas! </p>

                <p>Nossa equipe de atendimento te auxiliará em todo processo de troca sem nenhum custo</p>
                
              </div>

        </div>



        
    </div>
  )
}

export default Cart
