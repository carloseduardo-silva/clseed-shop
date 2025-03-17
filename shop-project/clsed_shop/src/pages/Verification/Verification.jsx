import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//css
import styles from "./Verification.module.css"

//componentes


import { useTotalValueShop } from '../../hooks/useTotalValueShop'
import { useGetLocalStorage } from '../../hooks/useGetLocalStorage'

const Verification = () => {

    const[shopDatas, setShopDatas] = useState(null)
    const [shopSumaryShow, setShopSumaryShow] = useState(false)

    const { datas } = useGetLocalStorage()

    const {totalValue} = useTotalValueShop(datas)
    
    useEffect(() =>{
        setShopDatas(datas)
    }, [])
    
    const toggleShopSumaryModal = () =>{
        if(shopSumaryShow == true){
            setShopSumaryShow(false)
        }
        else{
            setShopSumaryShow(true)
        }

    }

  return (
    <div className={styles.verification_container}>
        
        <div className={styles.clientInfo_container}>
            <h1 className={styles.title_desktop}>CLSEDSHOP</h1>
                <nav>
                    <div className={styles.nav_Card}>
                        <Link to={'/cart'}>Carrinho</Link><span class="material-symbols-outlined">navigate_next</span>
                    </div>
                    <div className={styles.nav_Card}>
                        <span className={styles.active}>Informações</span><span class="material-symbols-outlined">navigate_next</span>
                    </div>
                    <div className={styles.nav_Card}>
                        <span>Frete</span><span class="material-symbols-outlined">navigate_next</span>
                    </div>
                    <div className={styles.nav_Card}>
                        <span>Pagamento</span><span class="material-symbols-outlined">navigate_next</span>
                    </div>
                </nav>
           

            <form>
                <div className={styles.clientInfo_contact}>
                    <label>
                        <h4>Contato</h4>
                        <input placeholder='E-mail ou número de celular' type="text" />
                        <div className={styles.checkBox}>
                            <input type="checkbox" name="emails" id="emails" />
                            <p>Enviar novidades e ofertas para mim por e-mail</p>
                        </div>
                    </label>
                </div>
                
                <div className={styles.clientInfo_adress}>
                    <h4>Endereço de Entrega</h4>
                    <select  name="country" id="country">
                        <option value="Brasil">Brasil</option>
                        <option value="USA">USA</option>
                    </select>
                    <input required placeholder='Nome Completo' type="text" />
                    <input required placeholder='Rua e número da casa' type="text" />
                    <input required placeholder='Apartamento, bloco ou ref.' type="text" />
                    <input required placeholder='Cidade' type="text" />
                    <select required  name="state" id="state">
                        <option value="São Paulo">São Paulo</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                    </select>
                    <input required placeholder='CEP' type="number" />
                    <input required placeholder='Telefone' type="tel" />

                    <div className={styles.checkBox}>
                            <input type="checkbox" name="infos" id="infos" />
                            <p>Salvar minhas informações para a próxima vez</p>
                    </div>
                </div>

                <div className={styles.clientInfo_buttons}>
                    <button type='submit'> Continuar com o frete</button>
                    <Link to={'/cart'}>  Voltar ao carrinho</Link>
                </div>

            </form>

        </div>


        {shopSumaryShow && 
        <div className={styles.ShopSumary_container}>
                <div className={styles.cart_products}>

                    {shopDatas && shopDatas.map((data) =>(
                        <div className={styles.card_product}>

                            <div className={styles.product_1}>
                                
                                    <img src={JSON.parse(data).URLimage} alt="" />
                            
                                <div className={styles.product_info}>
                                    <p>{JSON.parse(data).name}</p>
                                    <p>{JSON.parse(data).size}</p>
                                    <p>R${JSON.parse(data).price},00  x {JSON.parse(data).amount}</p>
                                </div>
                            </div>
                        
                

                        <div className={styles.product_2}>
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
                    
                </div>

        </div>
        }

        <div onClick={() =>{toggleShopSumaryModal()}} className={styles.clientShop_container}>
            

            <div  className={styles.summayExibition}>
                <span class="material-symbols-outlined">shopping_cart</span>Exibir resumo da compra
               {!shopSumaryShow && <span style={{paddingTop:'6px'}} class="material-symbols-outlined">expand_more</span>}
              {shopSumaryShow  && <span style={{paddingTop:'6px'}} class="material-symbols-outlined">expand_less</span>}
            </div>

            <div className={styles.subtotal}>R${totalValue},00</div>
        </div>
        
        <h1 className={styles.title_mobile}>CLSEDSHOP</h1>

        <div className={styles.ShopSumaryDesktop_container}>
                <div className={styles.cart_products}>

                    {shopDatas && shopDatas.map((data) =>(
                        <div className={styles.card_product}>

                            <div className={styles.product_1}>
                                
                                    <img src={JSON.parse(data).URLimage} alt="" />
                            
                                <div className={styles.product_info}>
                                    <p>{JSON.parse(data).name}</p>
                                    <p>{JSON.parse(data).size}</p>
                                    <p>R${JSON.parse(data).price},00  x {JSON.parse(data).amount}</p>
                                </div>
                            </div>
                        
                

                        <div className={styles.product_2}>
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
                    
                </div>

        </div>

    </div>
  )
}

export default Verification
