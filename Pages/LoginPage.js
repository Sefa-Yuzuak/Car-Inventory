import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, FormGroup, Image,  } from 'react-bootstrap'
import Logo from '../asset/LogoKurum/logo_kurum.png'
import '../asset/App.css'
import { motion } from "framer-motion"
import { useAuth } from '../comp_tools/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'

const LoginPage = () => {
    const [user, setUser] = useState({
        username:'', 
        password:''})
    const [error, setError] = useState(false)
    const [errorMsg, setMsg] = useState(null)

    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const redirectPath =  '/'

    const loginReq = () => {
        if(user.username!='' && user.password!= '') { // şifre de boş ise boş olamaz yazısı yazdır
            try {
                const urls=(`http://localhost:1337/api/auth/local`);
                axios
                .post(urls, {  
                    "identifier":user.username,
                    "password":user.password})
                .then(response=>{
                    if(response && response.data.jwt){
                    window.localStorage.setItem("USER_TOKEN", JSON.stringify(response.data.jwt))
                    auth.login(user)
                    navigate(redirectPath, {replace: true})
                    }
                }

                
                    )
                .catch((setMsg("Kullanıcı Adınız veya Şifreniz Hatalıdır.")) )
            } catch (error) {console.log("veriler alınırken hata olustu");}  
        }
        else{
            return(
                setError(true), 
                setMsg("Kullanıcı ve Parola kısımları boş geçilemez.")
            )}
    
      }    
        

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
      }

    const [flag, setFlag] = useState(false)
    
    useEffect(() => {
        
        const Timer = setTimeout(() => {
            setFlag(true);
        }, 2000);
        
        return () => clearInterval(Timer);
    }, []);
    
    const openingPage = 
        
        <div className='contact splash-logo'>
            <motion.div  
                animate={{
                    scale:0.5,
                    y:-332,
                }}
                transition={{
                    duration:2.5,
                }}
                >
                <Image src={Logo} width={360}/>
            </motion.div>

        </div>
    const closingPage  = 
    <div className='contact'>
    
            <div 
                className='d-flex justify-content-center mt-5 mb-3 '>
                <Image src={Logo} width={180}/>
            </div>
            
        <motion.div 
            className={'font-family '}  
            initial={{
                opacity:0
            }}
            animate={{
                opacity:1
            }}
            transition={{
                duration:2
            }}
        >
            <Container className=' text-login col-10 d-flex justify-content-center rounded-2 ' >
                <h1 className='text-center'>Ankara Su ve Kanalizasyon İdaresi <br></br> Genel Müdürlüğü</h1>
            </Container>
            <Container className='text-login col-8 d-flex justify-content-center mb-4 rounded-2'>
                <h3>Araç Envanter Sistemi</h3>
            </Container> 
            <Container className='form-login col-lg-3 col-md-6 col-sm-6 bg-opacity-25 p-5  rounded-2 mt-2 d-lex justify-content-center '>
                
                    <Container className='d-flex justify-content-center'>     
                        <h3><i className="bi bi-person-square"></i> Giriş Paneli</h3>
                    </Container>
                    <hr></hr>
                <FormGroup className="mb-3">
                    <FormCheckLabel>Kullanıcı Adı</FormCheckLabel>
                    <FormControl type="Text" placeholder="Kullanıcı" name='username' onChange={changeHandler}/>
                </FormGroup>
        
                <FormGroup className="mb-3">
                    <FormCheckLabel>Şifre</FormCheckLabel>
                    <FormControl type="password" placeholder="Şifreniz" name='password' onChange={changeHandler} />
                </FormGroup>
                {errorMsg != null ? <Alert key={'danger'} variant={'danger'} >
                    {errorMsg}
                </Alert> : null}
                <Container className='d-grid gap-2 mt-4 login-button'>
                    <Button  type="submit" onClick={loginReq}>
                        Giriş Yap
                    </Button>
                </Container>
                <Container className='d-flex justify-content-center mt-1'>
                    <a href='/' className='text-link'>Şifrenizi mi unuttunuz?</a>
                </Container>
                
            </Container>
            <Container className=' mt-4 text-center'>
                <p>Bu sistem içeriğindeki tüm materyaller, yazı, makale, görüntü, doküman, fotoğraf, resim, ses, 
                    işaret veya sair fikir ürünleri Telif Hakları ile ilgili yasal mevzuat uyarınca korunmakta olup, 
                    Aski Genel Müdürlüğü Yazılım Geliştirme Şube Müdürlüğü'nün yazılı izni olmadıkça kullanılamaz.</p>
                <p>Created by O.Sefa YÜZÜAK</p>
            </Container>

        </motion.div>
    </div>

    let result = null
    
    flag === true ? result = closingPage : result= openingPage 

  return (result)
}

export default LoginPage

