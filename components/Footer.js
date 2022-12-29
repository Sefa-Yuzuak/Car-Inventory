import React from 'react'
import {  Container } from 'react-bootstrap'

function footer() {
  return (
    <Container className='mt-5 footer justify-content-end d-flex'>
        <footer className='py-1 my-3 d-flex'>
            <Container className='d-flex'>
                <ul className='nav list-unstyled d-flex'>
                    <li className='ms-3 d-flex align-items-center'>2022 © ASKi Genel Müdürlüğü Bilgi İşlem Dairesi Başkanlığı</li>
                    <li className='ms-3 '><a className='btn' href='https://www.instagram.com/askibaskentankara/'><i className="bi bi-instagram"></i></a><a className='btn' href='https://tr-tr.facebook.com/askigenelmudurlugu/'><i className="bi bi-facebook"></i></a><a className='btn' href='https://twitter.com/askiankara'><i className="bi bi-twitter"></i></a></li>
                </ul>
                
            </Container>
        </footer>
    </Container>
  )
}
export default footer