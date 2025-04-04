import { useEffect, useLayoutEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'


//css
import styles from './Collection.module.css'

//components
import Nav from '../../components/Nav'

//hooks
import { useFetchDatas } from '../../hooks/useFetchDatas'
import { useFetchCollection } from '../../hooks/useFetchCollection'

const Collection = () => {

const [lastQuery, setLastQuery] = useState(null)
const [search, setSearch] = useState(null)
const [shopDatas, setShopDatas] = useState([])
const [shopFilterDatas, setShopFilterDatas] = useState([])
const [filterMobileOn, setFilterMobileOn] = useState(null)
const [validateError, setValidateError] = useState(null)
const [sizeModalShow, setSizeModalShow] = useState(false)
const [orderModalShow, setOrderModalShow] = useState(false)
const [priceModalShow, setPriceModalShow] = useState(false)
const [sizeMobileModalShow, setMobileSizeModalShow] = useState(false)
const [orderMobileModalShow, setMobileOrderModalShow] = useState(false)
const [priceMobileModalShow, setMobilePriceModalShow] = useState(false)
const [filterOrderCounter, setFilterOrderCounter] = useState(null)
const [filterMinPrice, setFilterMinPrice] = useState(0)
const [filterMaxPrice, setFilterMaxPrice] = useState(349)



const { section } = useParams()


//UseEffects
useEffect(() =>{
  window.scroll(0,0)
}, [])


useLayoutEffect(() =>{

switch(section){
  case 'all':
    setSearch('all')
    break;
  
  case 'camiseta':
    setSearch("camiseta")
    break;

  case 'moletom':
    setSearch('moletom')
    break;
      
  case 'bottom':
    setSearch('bottom')
    break;

  case 'acessories':
    setSearch('acessório')
    break;

        

}})


//hook fetching datas
const {datas, loading, error} = useFetchDatas('products', search)

let arrayFilters = []

//Events and Listeners from Image hover on products card
let urlBack = ''
let urlFront = ''
document.querySelectorAll('#productCard').forEach((card) =>{
  card.addEventListener('mouseover', () =>{
    datas.map((product) =>{
      if(product.idProduct == card.dataset.id){
         urlBack = product.CarrouselIMG['1']
         return
      }
    })
    card.querySelector('.cardImg').src = urlBack
  })
})

document.querySelectorAll('#productCard').forEach((card) =>{
  card.addEventListener('mouseout', () =>{
    datas.map((product) =>{
      if(product.idProduct == card.dataset.id){
         urlFront = product.CarrouselIMG['0']
         return
      }
    })
    card.querySelector('.cardImg').src = urlFront
  })
})

//setting datas from hook
useEffect(() =>{
  if(datas.length > 0 ){
    setShopDatas(datas)
  }
},[datas])

//collection reload
useEffect(() =>{
  if(!search ){
    setLastQuery(section)
  }
  else if(lastQuery && lastQuery !== section){
    window.location.reload()
  }
}, [search])



//fn
const togglePriceModalShow = () =>{
  if(priceModalShow){
    setPriceModalShow(false)
    setShopDatas(datas)
    setFilterMinPrice(0)
    setFilterMaxPrice(349)
  } else{
    setPriceModalShow(true)
  }
}

const toggleSizeModalShow = () =>{
  if(sizeModalShow){
    setSizeModalShow(false)
    setShopDatas(datas)
  } else{
    setSizeModalShow(true)
  }
}

const toggleOrderModalShow = () =>{
  if(orderModalShow){
    setOrderModalShow(false)
    setFilterOrderCounter(null)
  } else{
    setOrderModalShow(true)
  }
}

const toggleMobilePriceModalShow = () =>{
  if(priceMobileModalShow){
    const body = document.querySelector('body')
    body.classList.remove('transparent2')
    setMobilePriceModalShow(false)
    
  } else{
    const body = document.querySelector('body')
    body.classList.toggle('transparent2')
    setMobilePriceModalShow(true)
  }
}

const toggleMobileSizeModalShow = () =>{
  if(sizeMobileModalShow){
    const body = document.querySelector('body')
    body.classList.remove('transparent2')
    setMobileSizeModalShow(false)
  } else{
    const body = document.querySelector('body')
    body.classList.toggle('transparent2')
    setMobileSizeModalShow(true)
  }
}

const toggleMobileOrderModalShow = () =>{
  if(orderMobileModalShow){
    const body = document.querySelector('body')
    body.classList.remove('transparent2')
    setMobileOrderModalShow(false)
  } else{
    const body = document.querySelector('body')
    body.classList.toggle('transparent2')
    setMobileOrderModalShow(true)
  }
}

const excludeFilter = () =>{
  setFilterMobileOn(null)
  setShopDatas(datas)
}

//function that add the size filters
const pushFilters = (filter) =>{
  if(arrayFilters.includes(filter)){
    if(arrayFilters.length == 1){
      arrayFilters.pop()
    }
    else{
      arrayFilters.map((size) =>{
        if(size == filter){
          arrayFilters.splice(arrayFilters.indexOf(size), 1)
        }
      })
    }
    
  }else{
    arrayFilters.push(filter)
  }

  let productsFilter = []

  datas.forEach((product) =>{
    if(product.sizes.includes(arrayFilters.join(','))){
      productsFilter.push(product)
    }
  })
  setFilterMobileOn(`Tamanho: ${filter}`)
  setShopFilterDatas(productsFilter)
  
 
 
  
 
}

//set the datas filtered
useEffect(() =>{

  setShopDatas(shopFilterDatas)

},[shopFilterDatas])


const handleFilterPrice = (e) =>{
  e.preventDefault()
  let producstFilter = []

  if(Number.parseFloat(filterMinPrice) >= Number.parseFloat(filterMaxPrice)){
    setValidateError('O valor mínino necessita ser menor que o valor máximo de filtro!')
  }
  else{
    setValidateError(null)
    datas.forEach((product) =>{
      if(product.price > filterMinPrice && product.price < filterMaxPrice){
        producstFilter.push(product)
      }
    })
    
    setFilterMobileOn(`Preço: R$${filterMinPrice} - R$${filterMaxPrice}`)
    setShopFilterDatas(producstFilter)

  }


}


  return (
    <div>
      <Nav/>

      

      <div className={styles.collection_container}>

        
         {/*Filter DeskTop */}
        <div className={styles.filter_container}>

          <div onClick={() => toggleSizeModalShow()} className={styles.filter_Card}>
          <p>Tamanho</p>
          {!sizeModalShow &&<span class="material-symbols-outlined expand">expand_more</span>}
          {sizeModalShow &&<span class="material-symbols-outlined">close</span>}</div>
          {sizeModalShow &&  
          <form className={styles.filterCheck}>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="P/S" value="P/S" />
                P/S
              </label>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="M" value="M" />
                M
              </label>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="G/L" value="G/L" />
                G/L
              </label>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="GG/XL" value="GG/XL" />
                GG/XL
              </label>

              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="XGG/XXL" value="XGG/XXL" />
                XGG/XXL
              </label>
        
            
          </form>}



          <div  onClick={() => togglePriceModalShow()} className={styles.filter_Card}>
            <p>Preço</p>
          {!priceModalShow &&<span class="material-symbols-outlined expand">expand_more</span>}
          {priceModalShow &&<span class="material-symbols-outlined">close</span>}
          </div>
          {priceModalShow &&  
          <form onSubmit={handleFilterPrice}  className={styles.filter_price}>
            <label>R$<input value={filterMinPrice} onChange={(e) =>{setFilterMinPrice(e.target.value)}} placeholder='0' type="number" />  </label> 

              <h2>-</h2>

             <label> R$<input value={filterMaxPrice} onChange={(e) =>{setFilterMaxPrice(e.target.value)}} placeholder='349'  type="number" />  </label>

              <button > Filtrar</button>

          </form>}
          {validateError && <p class='error'> {validateError}</p>}



          <div onClick={() => toggleOrderModalShow()} className={styles.filter_Card}>
            <p>Ordenar {filterOrderCounter &&`(${filterOrderCounter})`}</p>
          {!orderModalShow &&<span class="material-symbols-outlined expand">expand_more</span>}
          {orderModalShow &&<span class="material-symbols-outlined">close</span>}
          </div>
          {orderModalShow &&  
          <form className={styles.filterCheck}>
         
            <label>
              <input onChange={(e) => {setFilterOrder(e.target.value)}} type="radio" name="order" id="Relevância"  value="Mais-Vendidos"/>
              Relevância
            </label>
            <label>
              <input onChange={(e) => {setFilterOrder(e.target.value)}} type="radio" name="order" id="Alfabética" value="Alfabética" />
              Ordem Alfabética
            </label>
            <label>
              <input onChange={(e) => {setFilterOrder(e.target.value)}} type="radio" name="order" id="Menor-preço" value="Menor-preço" />
              Menor Preço
            </label>

            <label>
              <input onChange={(e) => {setFilterOrder(e.target.value)}} type="radio" name="order" id="Maior-preço" value="Maior-preço" />
              Maior Preço
            </label>
        
            
          </form>}

        </div>

         {/*Filter Mobile*/}
        <div className={styles.filterMobile_container}>

          <div onClick={() => toggleMobileSizeModalShow()} className={styles.filter_Card}>
          <p>Tamanho</p>
          {!sizeMobileModalShow &&<span class="material-symbols-outlined expand">expand_more</span>}
          {sizeMobileModalShow &&<span class="material-symbols-outlined">expand_less</span>}</div>

  


          <div onClick={() => toggleMobilePriceModalShow()} className={styles.filter_Card}>
            <p>Preço</p>
          {!priceMobileModalShow &&<span class="material-symbols-outlined expand">expand_more</span>}
          {priceMobileModalShow &&<span class="material-symbols-outlined">expand_less</span>}
          </div>

          


          <div onClick={() => toggleMobileOrderModalShow()} className={styles.filter_Card}>
            <p>Ordenar</p>
          {!orderMobileModalShow &&<span class="material-symbols-outlined expand">expand_more</span>}
          {orderMobileModalShow &&<span class="material-symbols-outlined">expand_less</span>}
          </div>


        </div>
        
        {/*Filter Mobile On*/}
        {filterMobileOn && 
        <div onClick={excludeFilter} className={styles.filterOn}> <p> {filterMobileOn}</p>
        <span class="material-symbols-outlined">close</span>
        </div>
        }

        {/* Products */}
        <div className={styles.productsQuery_container}>
          {loading && <p style={{fontWeight:"bold", fontSize:"20px"}}>Carregando produtos...</p>}
          {shopDatas.length == 0 && !loading && <p style={{fontWeight:"bold", fontSize:"20px"}}>Não foi encontrado produtos com essa faixa de preço...</p>}
          {shopDatas.length > 0 &&  shopDatas.map((product) =>(
            <Link to={`/products/${product.idProduct}`} className={styles.product_Card}  id='productCard' data-id={product.idProduct}>
              <div  key={product.idProduct}>
                <div>
                  <img class="cardImg" src={product.URLimage} alt={product.name} />
                </div>
                <div>
                  <p className={styles.data_name}>{product.name}</p>
                  <p>R${product.price}.00</p>
                </div>
              
              </div>
            </Link>
          ))}

        </div>

      </div>

    {/* Filter Mobile Modals */}
    {sizeMobileModalShow &&  
        <div className={styles.filterMobile_modal}>

          <div className={styles.filter_Header}>
            <h2>Tamanho</h2> 
            <span onClick={() => toggleMobileSizeModalShow()}  class="material-symbols-outlined">close</span>
          </div>

            <form className={styles.filterCheck}>
            <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="P/S"  value="P/S"/>
                P/S
              </label>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="M" value="M" />
                M
              </label>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="G/L"  value="G/L"/>
                G/L
              </label>
              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="GG/XL" value="GG/XL" />
                GG/XL
              </label>

              <label>
                <input onChange={(e) =>{pushFilters(e.target.value)}} type="radio" name="size" id="XGG/XXL" value="XGG/XXL" />
                XGG/XXL
              </label>

            
          </form>

    </div>}

    {priceMobileModalShow && 
     <div className={styles.filterMobile_modal}>

        <div className={styles.filter_Header}>
            <h2>Preço</h2> 
            <span onClick={() => toggleMobilePriceModalShow()}  class="material-symbols-outlined">close</span>
        </div>

        <form onSubmit={handleFilterPrice}  className={styles.filter_price}>
              <label>R$ <input value={filterMinPrice} onChange={(e) =>{setFilterMinPrice(e.target.value)}} placeholder='0' type="number" />  
              </label> 

              <h2>-</h2>

              <label> R$ <input value={filterMaxPrice} onChange={(e) =>{setFilterMaxPrice(e.target.value)}} placeholder='349'  type="number" />  </label>

              <button> Filtrar</button>
        </form>

      </div>}

    {orderMobileModalShow &&  
         <div className={styles.filterMobile_modal}>

            <div className={styles.filter_Header}>
              <h2>Ordenar</h2> 
              <span onClick={() => toggleMobileOrderModalShow()} class="material-symbols-outlined">close</span>
            </div>

           <form className={styles.filterCheck}>
    
            <label>
              <input type="radio" name="order" id="Relevância" />
              Relevância
            </label>
            <label>
              <input type="radio" name="order" id="Alfabética" />
              Ordem Alfabética
            </label>
            <label>
              <input type="radio" name="order" id="Menor-preço" />
              Menor Preço
            </label>

            <label>
              <input type="radio" name="order" id="Maior-preço" />
              Maior Preço
            </label>
            </form>
      </div>}




    </div>

    



  )
}

export default Collection
