import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container,  } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import MyPDF from '../asset/PDF/a.pdf';


const FormExample = ({newCar, setNewcar})=> {
    const [validated, setValidated] = useState(false);
    const [checkBox, setCheckbox] = useState(false);
    const handleChange = (e) => {
    const {name, value} = e.target;
    setNewcar(prevInput => {
        return(
            {
                ...prevInput,
                [name] : value,
            }
        )
    })    
  }
 
//   Burası validationları kontrol etmek içi yazılmış

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };



  //   burada user bilgilerini getiriyoruzz
  let user = window.JSON.parse(localStorage.getItem("myuser"));

  //   burada yeni aracı database e yolluyoruz

  const postDatabase = async (e) => {
    if(checkBox){
        let mydata = {};
        mydata.data = newCar;
        let userLog = JSON.parse(window.localStorage.getItem("myuser"));
        mydata.data.myuser = userLog.username;

        const LastCheck = window.confirm(
            `${newCar.car_brand} araç markalı, ${newCar.car_model} modeline sahip, ${newCar.plate} plakalı, ${newCar.department} isimli birimin adına kayıt etmek üzeresiniz onaylıyormusunuz?`
        )
        if(LastCheck==true){
            await axios
            .post("http://localhost:1337/api/aracs", mydata)
            .then(response=>{console.log("res--",response)})
            .catch(console.log("hata aldım"))
            let  message={};
            message.data ={log:`${user.username} kullanıcısı tarafından, ${newCar.plate} plakalı ${newCar.car_brand} markalı araç eklenmiştir. `} ;
            await axios.post(`http://localhost:1337/api/logs`, message)    
        }    
        else{ 
        alert("Lütfen Kullanım Koşullarını Onaylayın")  }
    }
    
  }
  
  return (
    <>
    <Container>
    </Container>
        <Container className='form_group_box mt-4 col-9 rounded-2 p-5'>
        <h1 className='text-center'>Araç Kayıt </h1>
            <h3 className='text-start'>Yeni Araç Kayıt</h3>
            <hr/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Araç Türü</Form.Label>
                            <Form.Select type="select"  name="car_type" onChange={(e)=>handleChange(e)}>
                                <option value="BİNEK">BİNEK</option>
                                <option value="KAMYON">KAMYON</option>
                                <option value="KAMYONET">KAMYONET</option>
                                <option value="TIR">TIR</option>
                                <option value="İŞ MAKİNESİ">İS MAKINESİ</option>
                                <option value="ARAZİ ARACI">ARAZİ ARACI</option>
                                <option value="OTOBÜS">OTOBÜS</option>
                                <option value="MİNİBÜS">MİNİBÜS</option>
                                <option value="AKARYAKIT TANKERİ">AKARYAKIT TANKERİ</option>
                                <option value="LOWBET">LOWBET</option>
                                <option value="DORSE">DORSE</option>
                                <option value="SU TANKERİ">SU TANKERİ</option>
                                <option value="ÖZEL AMAÇLI KAMYON">ÖZEL AMAÇLI KAMYON</option>
                                <option value="ÖZEL AMAÇLI KAMYONET (KAPALI KASA KANAL İZLEME ROBOTU)">ÖZEL AMAÇLI KAMYONET (KAPALI KASA KANAL İZLEME ROBOTU)</option>
                                <option value="KAMYON(RAMPALI AÇIK KASA)">KAMYON(RAMPALI AÇIK KASA)</option>
                                <option value="ÖZEL AMAÇLI KAMYON (KOMBİNE KANAL TEMİZLİK ARACI)">ÖZEL AMAÇLI KAMYON (KOMBİNE KANAL TEMİZLİK ARACI)</option>
                                <option value="ÇEKİCİ">ÇEKİCİ</option>
                                <option value="KAMYON (DAMPERLİ)">KAMYON (DAMPERLİ)</option>
                                <option value="TRAKTÖR">TRAKTÖR</option>
                                <option value="KAMYONET(ÇİFT KABİNLİ)">KAMYONET(ÇİFT KABİNLİ)</option>
                                <option value="KAMYON KAPALI KASA (BAKIM ONARIM TERTİBATLI)">KAMYON KAPALI KASA (BAKIM ONARIM TERTİBATLI)</option>
                                <option value="KAMYON KAPALI KASA (SU KANAL MOBİL TAMİR ARACI)">KAMYON KAPALI KASA (SU KANAL MOBİL TAMİR ARACI)</option>
                                <option value="DORSE-YARI RÖMORK AÇIK KASA">DORSE-YARI RÖMORK AÇIK KASA</option>
                                <option value="KAMYON (FRİGOFİRİK KAPALI KASA)">KAMYON (FRİGOFİRİK KAPALI KASA)</option>
                                <option value="KAMYON (LASTİK TAMİR ARACI)">KAMYON (LASTİK TAMİR ARACI)</option>
                                <option value="KAMYON (YAĞLAMA BAKIM ARACI)">KAMYON (YAĞLAMA BAKIM ARACI)</option>
                                <option value="KAMYONET (FRİGOFİRİK KAPALI KASA)">KAMYONET (FRİGOFİRİK KAPALI KASA)</option>
                                <option value="KAMYONET PANELVAN">KAMYONET PANELVAN</option>
                                <option value="KAMYONET (TEK KABİNLİ)">KAMYONET (TEK KABİNLİ)</option>
                                <option value="KAMYONET (KAPALI KASA KAÇAK SU TESPİT ARACI)">KAMYONET (KAPALI KASA KAÇAK SU TESPİT ARACI)</option>
                                <option value="ÖZEL AMAÇLI KAMYONET (VİNÇLİ)">ÖZEL AMAÇLI KAMYONET (VİNÇLİ)</option>
                                <option value="ÖZEL AMAÇLI KAMYON (BAKIM ONARIM TERTİBATLI)">ÖZEL AMAÇLI KAMYON (BAKIM ONARIM TERTİBATLI)</option>
                                <option value="ÖZEL AMAÇLI ARAZÖZ (SU TANKERİ)">ÖZEL AMAÇLI ARAZÖZ (SU TANKERİ)</option>
                                <option value="ÖZEL AMAÇLI (YOL YIKAMA ARACI)">ÖZEL AMAÇLI (YOL YIKAMA ARACI)</option>
                                <option value="ÖZEL AMAÇLI (KURTARICI)">ÖZEL AMAÇLI (KURTARICI)</option>
                                <option value="ÖZEL AMAÇLI (MOTOR KARAVAN)">ÖZEL AMAÇLI (MOTOR KARAVAN)</option>
                                <option value="ÖZEL AMAÇLI (HASTA NAKİL AMBULANSI)">ÖZEL AMAÇLI (HASTA NAKİL AMBULANSI)</option>
                                <option value="ÖZEL AMAÇLI (CENAZE ARACI)">ÖZEL AMAÇLI (CENAZE ARACI)</option>
                                <option value="ÖZEL AMAÇLI KAMYON(KATI SIVI EMİCİ EKSKAVATÖR)">ÖZEL AMAÇLI KAMYON(KATI SIVI EMİCİ EKSKAVATÖR)</option>
                                <option value="ÖZEL AMAÇLI KAMYON (RAMPALI OTO KURTARICI)">ÖZEL AMAÇLI KAMYON (RAMPALI OTO KURTARICI)</option>
                                <option value="ÖZEL AMAÇLI KAMYON (VİNÇLİ)">ÖZEL AMAÇLI KAMYON (VİNÇLİ)</option>
                                <option value="RÖMORK(KARAVAN)">RÖMORK(KARAVAN)</option>
                                <option value="MOTOSİKLET">MOTOSİKLET</option>
                                <option value="DAMPERLİ TIR ÇEKİCİ">DAMPERLİ TIR ÇEKİCİ</option>
                                <option value="KAMYONET (KAPALI KASA KANAL GÖRÜNTÜLEME)">KAMYONET (KAPALI KASA KANAL GÖRÜNTÜLEME)</option>
                                <option value="KAMYONET (KESİCİ ROBOT KANAL TAMİR ARACI)">KAMYONET (KESİCİ ROBOT KANAL TAMİR ARACI)</option>
                                <option value="KAMYON (KONTEYNER KAMYONU)">KAMYON (KONTEYNER KAMYONU)</option>
                                <option value="KAMYON (TAZYİKLİ SU ARACI)">KAMYON (TAZYİKLİ SU ARACI)</option>
                                <option value="KAMYON (VİDANJÖR)">KAMYON (VİDANJÖR)</option>
                                <option value="KAMYON (MOBİL ARAÇ)">KAMYON (MOBİL ARAÇ)</option>
                                <option value="BİNEK KOMBİ VAN">BİNEK KOMBİ VAN</option>
                                <option value="ÖZEL AMAÇLI (YOL BAKIM TAMİR ARACI)">ÖZEL AMAÇLI (YOL BAKIM TAMİR ARACI)</option>
                                <option value="KANAL AÇMA VE TEMİZLEME ARACI">KANAL AÇMA VE TEMİZLEME ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE TAHRİP ARACI">ÖZEL AMAÇLI İTFAİYE TAHRİP ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE PANELVAN ARACI">ÖZEL AMAÇLI İTFAİYE PANELVAN ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE SU TAHLİYE ARACI">ÖZEL AMAÇLI İTFAİYE SU TAHLİYE ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE ÖNCÜ ARACI">ÖZEL AMAÇLI İTFAİYE ÖNCÜ ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE İLK MÜDAHALE ARACI">ÖZEL AMAÇLI İTFAİYE İLK MÜDAHALE ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE HİZMET ARACI ARACI">ÖZEL AMAÇLI İTFAİYE HİZMET ARACI ARACI</option>
                                <option value="ÖZEL AMAÇLI İTFAİYE HİZMET MOBİL BAKIM ARACI">ÖZEL AMAÇLI İTFAİYE HİZMET MOBİL BAKIM ARACI</option>
                                <option value="ford">DİĞER</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Araç Türü Geçerli</Form.Control.Feedback>
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label>Var İse <b>Takip Cihazı</b></Form.Label>
                            <Form.Select name="tracking_device" onChange={(e)=>handleChange(e)}>
                                <option value="YOK">YOK</option>
                                <option value="ARVENTO">ARVENTO</option>
                                <option value="N2 MOBİL">N2 MOBİL</option>
                                <option value="VEKTÖR">VEKTÖR</option>
                                <option value="TRİO">TRİO</option>
                                <option value="POLAR">POLAR</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Takip Cihazı Geçerli</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="validationCustom03">
                        <Form.Label>Takip Cihazı <b>İD</b></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Takip Cihazı İD"
                                defaultValue=""
                                name="tracking_device_id" 
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>İD Geçerli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            İD Girin!
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Takip Cihazı <b>GSM</b></Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Takip Cihazı GSM"
                                defaultValue=""
                                name="tracking_device_gsm"
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>GSM Geçerli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            GSM Girin!
                            </Form.Control.Feedback>
                    </Form.Group>
                    
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col} controlId="validationCustom05">
                        <Form.Label>Araç Markası</Form.Label>
                            <Form.Select name="car_brand" id="carofbrand" onChange={(e)=>handleChange(e)}>
                                <option value="FORD">FORD</option>
                                <option value="RENAULT">RENAULT</option>
                                <option value="BMW">BMW</option>
                                <option value="CITROEN">CITROEN</option>
                                <option value="DACİA">DACIA</option>
                                <option value="HONDA">HONDA</option>
                                <option value="HYUNDAI">HYUNDAI</option>
                                <option value="ISUZU">ISUZU</option>
                                <option value="KIA">KİA</option>
                                <option value="MAZDA">MAZDA</option>
                                <option value="MERCEDES">MERCEDES-BENZ</option>
                                <option value="NISSAN">NISSAN</option>
                                <option value="OPEL">OPEL</option>
                                <option value="PEUGEOT">PEUGEOT</option>
                                <option value="SEAT">SEAT</option>
                                <option value="SKODA">SKODA</option>
                                <option value="SUZUKI">SUZUKİ</option>
                                <option value="TOYOTA">TOYOTA</option>
                                <option value="VOLSWAGEN">VOLSWAGEN</option>
                                <option value="VOLVO">VOLVO</option>
                                <option value="KAMYON">KAMYON</option>
                                <option value="KAMYONET">KAMYONET</option>
                                <option value="TIR">TIR</option>
                                <option value="OTOBUS">OTOBÜS</option>
                                <option value="MINIBUS">MİNÜBÜS</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Araç Markası Geçerli</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Araç Markası Geçerli değil</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>Araç Modeli</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Araç Modeli"
                                defaultValue=""
                                name="car_model"
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>Araç Modeli Geçerli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                           Araç Modeli Girin!
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="4" controlId="validationCustom07">
                        <Form.Label>Araç Model Yılı</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Araç Model Yılı"
                                defaultValue=""
                                name='model_year'
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>Araç Model Yılı Geçerli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Model Yılı Girin!
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                </Row>
                <Row className="mb-2">

                    <Form.Group as={Col} controlId="validationCustom08">
                        <Form.Label>Plaka Türü</Form.Label>
                            <Form.Select
                            required
                            name='plate_type'
                            onChange={(e)=>handleChange(e)}>
                                <option value="SİVİL">SİVİL</option>
                                <option value="RESMİ">RESMİ</option>
                                
                            </Form.Select> 
                        <Form.Control.Feedback>Plaka Türü Geçerli</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom09">
                        <Form.Label>Plaka</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Plaka"
                                defaultValue=""
                                name='plate'
                                onChange={(e)=>handleChange(e)}
                                />
                        <Form.Control.Feedback>Plaka Geçerli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                        Plaka Girin!
                        </Form.Control.Feedback>
                    </Form.Group>
                              
                    <Form.Group as={Col} md="4" controlId="validationCustom10">
                        <Form.Label>Yakıt Tüketimi</Form.Label>
                        <InputGroup >
                            <Form.Control
                            type="number"
                            placeholder="Yakıt Tüketimi"
                            aria-describedby="inputGroupPrepend"
                            required
                            name='fuel_consumption'
                            onChange={(e)=>handleChange(e)}

                            />
                            <Form.Control.Feedback type="invalid">
                            Yakıt Tüketimi Girin!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                
                    </Row>
                    <Row>                 
                <Form.Group as={Col} md="6" controlId="validationCustom11">
                    <Form.Label>Edinim Şekli Seçiniz</Form.Label>
                            <Form.Select
                            required
                            name='form_acquisition'
                            onChange={(e)=>handleChange(e)}>
                                <option value="KİRALIK">KİRALIK</option>
                                <option value="SÖZLEŞME KAPSAMINDA">SÖZLEŞME KAPSAMINDA</option>
                                <option value="KENDİ MALI">KENDİ MALI</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Edinim Şekli Geçerli</Form.Control.Feedback>                                                       
                    </Form.Group>
                    
                    <Form.Group as={Col} md="6" controlId="validationCustom12">
                        <Form.Label>Birim</Form.Label>
                            <Form.Select
                            required
                            name='department'
                            onChange={(e)=>handleChange(e)}>
                                <option value="ASKİ">ASKİ</option>
                                <option value="BİLGİ İŞLEM DAİRESİ BAŞKANLIĞI">BİLGİ İŞLEM DAİRESİ BAŞKANLIĞI</option>
                                <option value="ABONE İŞLERİ DAİRESİ BAŞKANLIĞI">ABONE İŞLERİ DAİRESİ BAŞKANLIĞI</option>
                                <option value="BARAJ İŞLETME VE MAKİNA İKMAL DAİRESİ BAŞKANLIĞI">BARAJ İŞLETME VE MAKİNA İKMAL DAİRESİ BAŞKANLIĞI</option>
                                <option value="DESTEK HİZMELERİ DAİRESİ BAŞKANLIĞI">DESTEK HİZMELERİ DAİRESİ BAŞKANLIĞI</option>
                                <option value="İNSAN KAYNAKLARI VE EĞİTİM DAİRESİ BAŞKANLIĞI">İNSAN KAYNAKLARI VE EĞİTİM DAİRESİ BAŞKANLIĞI</option>
                                <option value="HUKUK MÜŞAVİRLİĞİ">HUKUK MÜŞAVİRLİĞİ</option>
                                <option value="İÇ DENETİM BİRİMİ BAŞKANLIĞI">İÇ DENETİM BİRİMİ BAŞKANLIĞI</option>
                                <option value="ÖZEL KALEM MÜDÜRLÜĞÜ">ÖZEL KALEM MÜDÜRLÜĞÜ</option>
                                <option value="TEFTİŞ KURULU BAŞKANLIĞI">TEFTİŞ KURULU BAŞKANLIĞI</option>
                                <option value="KARARLAR ŞUBE MÜDÜRLÜĞÜ">KARARLAR ŞUBE MÜDÜRLÜĞÜ</option>
                                <option value="BASIN YAYIN ŞUBE MÜDÜRLÜĞÜ">BASIN YAYIN ŞUBE MÜDÜRLÜĞÜ</option>
                                <option value="ÇEVRE KORUMA VE SU HAVZALARI DAİRESİ BAŞKANLIĞI">ÇEVRE KORUMA VE SU HAVZALARI DAİRESİ BAŞKANLIĞI</option>
                                <option value="SU ARITMA DAİRESİ BAŞKANLIĞI">SU ARITMA DAİRESİ BAŞKANLIĞI</option>
                                <option value="PROJELER DAİRESİ BAŞKANLIĞI">PROJELER DAİRESİ BAŞKANLIĞI</option>
                                <option value="ATIKSU ARITMA DAİRESİ BAŞKANLIĞI">ATIKSU ARITMA DAİRESİ BAŞKANLIĞI</option>
                                <option value="STRATEJİ GELİŞTİRME DAİRESİ BAŞKANLIĞI">STRATEJİ GELİŞTİRME DAİRESİ BAŞKANLIĞI</option>
                                <option value="SU İNŞAAT DAİRESİ BAŞKANLIĞI">SU İNŞAAT DAİRESİ BAŞKANLIĞI </option>
                                <option value="KANAL İNŞAAT DAİRESİ BAŞKANLIĞI ">KANAL İNŞAAT DAİRESİ BAŞKANLIĞI </option>
                                <option value="1.BÖLGE SU VE KANAL İŞLETME DAİRESİ BAŞKANLIĞI">1.BÖLGE SU VE KANAL İŞLETME DAİRESİ BAŞKANLIĞI </option>
                                <option value="2.BÖLGE SU VE KANAL İŞLETME DAİRESİ BAŞKANLIĞI">2.BÖLGE SU VE KANAL İŞLETME DAİRESİ BAŞKANLIĞI </option>
                                <option value="3.BÖLGE SU VE KANAL İŞLETME DAİRESİ BAŞKANLIĞI">3.BÖLGE SU VE KANAL İŞLETME DAİRESİ BAŞKANLIĞI </option>
                                <option value="TESİSLER DAİRESİ BAŞKANLIĞI ">TESİSLER DAİRESİ BAŞKANLIĞI </option>  
                            </Form.Select>
                        <Form.Control.Feedback>Birim Geçerli</Form.Control.Feedback>                           
                    </Form.Group>

                </Row>
                <Row className="mb-3">                 
                    <Form.Group as={Col} md="4" controlId="validationCustom13">
                        <Form.Label>Hizmet Edilen Ünvan</Form.Label>
                            <Form.Select
                            required
                            name='belong_officer'
                            onChange={(e)=>handleChange(e)}>
                                <option value="YÖNETİM KURULU BAŞKANI">YÖNETİM KURULU BAŞK.</option>
                                <option value="GENEL MÜDÜR">GENEL MÜDÜR</option>
                                <option value="GENEL MÜDÜR YARDIMCISI">GENEL MÜDÜR YARD.</option>
                                <option value="DAİRE BAŞKANI">DAİRE BAŞK.</option>
                                <option value="ŞUBE MÜDÜRÜ">ŞUBE MÜDÜRÜ</option>
                                <option value="ŞEF">ŞEF</option>
                                <option value="KONTROL">KONTROL</option>
                                <option value="AVUKAT">AVUKAT</option>
                                <option value="PERSONEL">PERSONEL</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Hizmet Edilen Ünvan Geçerli</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="4" controlId="validationCustom14">
                        <Form.Label>Hizmet Edilen İsim Soyisim</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Hizmet Edilen İsim Soyisim"
                            aria-describedby="inputGroupPrepend"
                            defaultValue=""
                            name='officer_name'
                            onChange={(e)=>handleChange(e)}
                            />
                    </Form.Group>
                
                    <Form.Group as={Col} md="4">
                        <Form.Label>Şoför İsim Soyisim</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Şoför İsim Soyisim"
                            name='driver_name'
                            defaultValue=""
                            onChange={(e)=>handleChange(e)}
                            />
                    </Form.Group>
            
                </Row>
                
                    <Form.Group as={Col}   controlId="validationCustom16">
                        <Form.Check
                        required
                        label="Aracın kullanım koşullarını okudum kabul ediyorum"
                        feedback="Kullanım koşullarını kabul etmelisiniz."
                        feedbackType="invalid"
                        name='user_terms'
                        type="checkbox"
                        onChange={()=> setCheckbox(!checkBox)}
                        />
                    <a href={MyPDF} download="My_File.pdf"> İndir </a>
                    </Form.Group>
                    <Button type="submit" className='col-8 p-2 d-flex justify-content-center mx-auto' onClick={() => postDatabase(newCar)}>Kayıt</Button>
            </Form>
        </Container>
    </>
  );
}

export default FormExample;