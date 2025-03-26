import {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";

//css
import styles from "./Home.module.css"

//components
import Nav from '../../components/Nav'

//hooks
import { useFetchDatas } from '../../hooks/useFetchDatas'


const Home = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');
    const [imagesArr, setImagesArr] = useState([])


    const {datas, loading, error} = useFetchDatas('products')

    //carrousel slides
    const slideVariants = {
            hiddenRight: {
            x: "20%",
            opacity: 0.6,
            },
            hiddenLeft: {
            x: "-20%",
            opacity: 0.6,
            },
            visible: {
            x: "0",
            opacity: 1,
            
            transition: {
                duration: 0.4,
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

    useEffect(() =>{
        window.scroll(0,0)
        }, [])
    
    //carrousel de imagens banner home
    useEffect(() =>{
        setImagesArr(['https://cdn.vox-cdn.com/thumbor/Gzz0B3GqZRXvAqphlWA5pUifZGM=/88x0:1509x1066/1200x675/filters:focal(88x0:1509x1066)/cdn.vox-cdn.com/uploads/chorus_image/image/50128435/wmns9.0.0.jpg',
        "https://uncoverla.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/10/29125942/fred-segal-stadium-goods-pop-up-west-hollywood_2019_10_02-scaled.jpg",
        "https://images.the500hiddensecrets.com/2019-03/new_york-shop-kith.jpg?auto=format&fit=max&h=1080&ixlib=php-1.1.0&q=65&w=1920&s=1e89fe8a766debb0395ac9625bcbacfa",
        "https://images.405magazine.com/wp-content/uploads/2022/02/img-5630-scaled-1.jpg"
        ])
        },[])


    //Events and Listeners from Image hover on products card
    
    useEffect(() =>{
        
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
    })

    
    function nextImage(){
    
        setDirection("left");
        setCurrentIndex((prevIndex) =>
        prevIndex + 1 === imagesArr.length ? 0 : prevIndex + 1

        );}
    

    function previousImage(){

    setDirection("right");
    setCurrentIndex((prevIndex) =>
    prevIndex - 1 < 0 ? imagesArr.length - 1 : prevIndex - 1
    );}
      

 
  return (
    <>
        <Nav/>

        <div className={styles.advertisement_container}>

            <span onClick={() => previousImage()} class="material-symbols-outlined back">arrow_back</span>

            <AnimatePresence>
                <motion.img 
                key={currentIndex}
                variants={slideVariants}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit" 
                src={imagesArr[currentIndex]} alt="camiseta" /> 
            </AnimatePresence>

            <div className={styles.title}>
                <p>WELCOME TO CLSEED SHOP</p>
                <h1> CLSEED SHOP NEW COLLECTION 2024</h1>
                <Link to={'/collection/all'} className={styles.show_more}> Ver Produtos</Link>
            </div>

            <span onClick={() => nextImage()} class="material-symbols-outlined forward">arrow_forward</span>

        </div>

        <div className={styles.shop_container}>
            <h1>Shop</h1>
           
            <div  className={styles.card_container}>
        
            {datas.map((data) =>(
                <Link to={`/products/${data.idProduct}`}  id='productCard' data-id={data.idProduct}>  
                <div key={data.idProduct} className={styles.card}>
                    <div className={styles.img_card}>
                        <img class='cardImg' src={data.URLimage} alt="camiseta" />
                    </div>
                    <p className={styles.data_name}> {data.name}</p>
                    <p> R${data.price},00</p>
                </div>
             </Link>


            ))}
               
            </div>

        </div>
     
    
    </>
  )
}

export default Home
