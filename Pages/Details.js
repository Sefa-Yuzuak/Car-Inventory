import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Row, Col, Container, Form, InputGroup } from 'react-bootstrap'
import MyPDF from '../asset/PDF/a.pdf';
import Footer from '../components/Footer'


function Details() {
    const { id } = useParams()
    const [result, setResult] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [validated, setValidated] = useState(false);
    const [checkBox, setCheckbox] = useState(false);
    const [newCar, setNewcar] = useState({ });
    useEffect(() => {
      async function fetchData(){
        setLoading(true)
        try{
            const res = await axios.get(`http://localhost:1337/api/aracs/${id}`)

            setResult(res.data.data.attributes)
            setNewcar({
                car_type:result.car_type,
                tracking_device:result.tracking_device,
                tracking_device_id:result.tracking_device_id,
                tracking_device_gsm:result.tracking_device_gsm,
                car_brand:result.car_brand,
                car_model:result.car_model,
                model_year:result.model_year,
                plate_type:result.plate_type,
                plate:result.plate,
                fuel_consumption:result.fuel_consumption,
                form_acquisition:result.form_acquisition,
                department:result.department,
                belong_officer:result.belong_officer,
                officer_name:result.officer_name,
                driver_name:result.driver_name})
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
      }
      fetchData()
    }, [id])

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error...</p>
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
  //   burada user bilgilerini getiriyoruzz
  let user = window.JSON.parse(localStorage.getItem("myuser"));
    
  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewcar(prevInput => {
        return(
            {
                ...prevInput,
                [name] : value
            }
        )
    })    
  }
 
//   Buras?? validationlar?? kontrol etmek i??i yaz??lm????

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  //   burada yeni arac?? database e yolluyoruz

  const postDatabase = async (e) => {
    
    if(checkBox){
        let mydata = {};
        mydata.data = newCar;
        const LastCheck = window.confirm(
        `${result.car_brand} ara?? markal??, ${result.car_model} modeline sahip, ${result.plate} plakal??, ${result.department} isimli birimin ad??na kay??tl?? arac??, d??zelterek ${newCar.car_brand} ara?? markal??, ${newCar.car_model} modeline sahip, ${newCar.plate} plakal??, ${newCar.department} isimli birimin ad??na kay??t etmek ??zeresiniz onayl??yormusunuz?`)
        
        if(LastCheck){
            await axios
            .put(`http://localhost:1337/api/aracs/${id}`, mydata)
            .then(response=>{console.log("res--",response)})
            .catch(console.log("hata ald??m"))
            let message={};
            message.data= {log:`${user.username} kullan??c??s?? taraf??ndan,${result.tracking_device_id} takip cihaz?? numaral??, ${result.belong_officer} ki??isi ??zerine kay??tl??, ${newCar.plate} plaka,  ${newCar.car_brand} marka , ${result.newCar} takip cihaz?? numaras??, ${result.belong_officer} ki??isi ??zerine, ${newCar.plate} plakal??,  ${newCar.car_brand} marka ile g??ncelledi.`}
            await axios.post(`http://localhost:1337/api/logs`, message)
        } 
        // console.log(mydata);   
    }
    else{ 
    alert("L??tfen Kullan??m Ko??ullar??n?? Onaylay??n")  }
    
  }
    
  return (
    <>
     <Header></Header>
        <Container className='form_group_box mt-4 mb-5 col-9 rounded-2 p-5'>
        <h1 className='text-center'>Ara?? Bilgileri </h1>
            <h3 className='text-start'>Ara?? Bilgilerini D??zenle</h3>
            <hr/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    
                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Ara?? T??r??</Form.Label>
                            <Form.Select type="select"  name="car_type" defaultValue={result.car_type} onChange={(e)=>handleChange(e)}>
                                <option value="B??NEK">B??NEK</option>
                                <option value="KAMYON">KAMYON</option>
                                <option value="KAMYONET">KAMYONET</option>
                                <option value="TIR">TIR</option>
                                <option value="???? MAK??NES??">???? MAK??NES??</option>
                                <option value="ARAZ?? ARACI">ARAZ?? ARACI</option>
                                <option value="OTOB??S">OTOB??S</option>
                                <option value="M??N??B??S">M??N??B??S</option>
                                <option value="AKARYAKIT TANKER??">AKARYAKIT TANKER??</option>
                                <option value="LOWBET">LOWBET</option>
                                <option value="DORSE">DORSE</option>
                                <option value="SU TANKER??">SU TANKER??</option>
                                <option value="??ZEL AMA??LI KAMYON">??ZEL AMA??LI KAMYON</option>
                                <option value="??ZEL AMA??LI KAMYONET (KAPALI KASA KANAL ??ZLEME ROBOTU)">??ZEL AMA??LI KAMYONET (KAPALI KASA KANAL ??ZLEME ROBOTU)</option>
                                <option value="KAMYON(RAMPALI A??IK KASA)">KAMYON(RAMPALI A??IK KASA)</option>
                                <option value="??ZEL AMA??LI KAMYON (KOMB??NE KANAL TEM??ZL??K ARACI)">??ZEL AMA??LI KAMYON (KOMB??NE KANAL TEM??ZL??K ARACI)</option>
                                <option value="??EK??C??">??EK??C??</option>
                                <option value="KAMYON (DAMPERL??)">KAMYON (DAMPERL??)</option>
                                <option value="TRAKT??R">TRAKT??R</option>
                                <option value="KAMYONET(????FT KAB??NL??)">KAMYONET(????FT KAB??NL??)</option>
                                <option value="KAMYON KAPALI KASA (BAKIM ONARIM TERT??BATLI)">KAMYON KAPALI KASA (BAKIM ONARIM TERT??BATLI)</option>
                                <option value="KAMYON KAPALI KASA (SU KANAL MOB??L TAM??R ARACI)">KAMYON KAPALI KASA (SU KANAL MOB??L TAM??R ARACI)</option>
                                <option value="DORSE-YARI R??MORK A??IK KASA">DORSE-YARI R??MORK A??IK KASA</option>
                                <option value="KAMYON (FR??GOF??R??K KAPALI KASA)">KAMYON (FR??GOF??R??K KAPALI KASA)</option>
                                <option value="KAMYON (LAST??K TAM??R ARACI)">KAMYON (LAST??K TAM??R ARACI)</option>
                                <option value="KAMYON (YA??LAMA BAKIM ARACI)">KAMYON (YA??LAMA BAKIM ARACI)</option>
                                <option value="KAMYONET (FR??GOF??R??K KAPALI KASA)">KAMYONET (FR??GOF??R??K KAPALI KASA)</option>
                                <option value="KAMYONET PANELVAN">KAMYONET PANELVAN</option>
                                <option value="KAMYONET (TEK KAB??NL??)">KAMYONET (TEK KAB??NL??)</option>
                                <option value="KAMYONET (KAPALI KASA KA??AK SU TESP??T ARACI)">KAMYONET (KAPALI KASA KA??AK SU TESP??T ARACI)</option>
                                <option value="??ZEL AMA??LI KAMYONET (V??N??L??)">??ZEL AMA??LI KAMYONET (V??N??L??)</option>
                                <option value="??ZEL AMA??LI KAMYON (BAKIM ONARIM TERT??BATLI)">??ZEL AMA??LI KAMYON (BAKIM ONARIM TERT??BATLI)</option>
                                <option value="??ZEL AMA??LI ARAZ??Z (SU TANKER??)">??ZEL AMA??LI ARAZ??Z (SU TANKER??)</option>
                                <option value="??ZEL AMA??LI (YOL YIKAMA ARACI)">??ZEL AMA??LI (YOL YIKAMA ARACI)</option>
                                <option value="??ZEL AMA??LI (KURTARICI)">??ZEL AMA??LI (KURTARICI)</option>
                                <option value="??ZEL AMA??LI (MOTOR KARAVAN)">??ZEL AMA??LI (MOTOR KARAVAN)</option>
                                <option value="??ZEL AMA??LI (HASTA NAK??L AMBULANSI)">??ZEL AMA??LI (HASTA NAK??L AMBULANSI)</option>
                                <option value="??ZEL AMA??LI (CENAZE ARACI)">??ZEL AMA??LI (CENAZE ARACI)</option>
                                <option value="??ZEL AMA??LI KAMYON(KATI SIVI EM??C?? EKSKAVAT??R)">??ZEL AMA??LI KAMYON(KATI SIVI EM??C?? EKSKAVAT??R)</option>
                                <option value="??ZEL AMA??LI KAMYON (RAMPALI OTO KURTARICI)">??ZEL AMA??LI KAMYON (RAMPALI OTO KURTARICI)</option>
                                <option value="??ZEL AMA??LI KAMYON (V??N??L??)">??ZEL AMA??LI KAMYON (V??N??L??)</option>
                                <option value="R??MORK(KARAVAN)">R??MORK(KARAVAN)</option>
                                <option value="MOTOS??KLET">MOTOS??KLET</option>
                                <option value="DAMPERL?? TIR ??EK??C??">DAMPERL?? TIR ??EK??C??</option>
                                <option value="KAMYONET (KAPALI KASA KANAL G??R??NT??LEME)">KAMYONET (KAPALI KASA KANAL G??R??NT??LEME)</option>
                                <option value="KAMYONET (KES??C?? ROBOT KANAL TAM??R ARACI)">KAMYONET (KES??C?? ROBOT KANAL TAM??R ARACI)</option>
                                <option value="KAMYON (KONTEYNER KAMYONU)">KAMYON (KONTEYNER KAMYONU)</option>
                                <option value="KAMYON (TAZY??KL?? SU ARACI)">KAMYON (TAZY??KL?? SU ARACI)</option>
                                <option value="KAMYON (V??DANJ??R)">KAMYON (V??DANJ??R)</option>
                                <option value="KAMYON (MOB??L ARA??)">KAMYON (MOB??L ARA??)</option>
                                <option value="B??NEK KOMB?? VAN">B??NEK KOMB?? VAN</option>
                                <option value="??ZEL AMA??LI (YOL BAKIM TAM??R ARACI)">??ZEL AMA??LI (YOL BAKIM TAM??R ARACI)</option>
                                <option value="KANAL A??MA VE TEM??ZLEME ARACI">KANAL A??MA VE TEM??ZLEME ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE TAHR??P ARACI">??ZEL AMA??LI ??TFA??YE TAHR??P ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE PANELVAN ARACI">??ZEL AMA??LI ??TFA??YE PANELVAN ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE SU TAHL??YE ARACI">??ZEL AMA??LI ??TFA??YE SU TAHL??YE ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE ??NC?? ARACI">??ZEL AMA??LI ??TFA??YE ??NC?? ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE ??LK M??DAHALE ARACI">??ZEL AMA??LI ??TFA??YE ??LK M??DAHALE ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE H??ZMET ARACI ARACI">??ZEL AMA??LI ??TFA??YE H??ZMET ARACI ARACI</option>
                                <option value="??ZEL AMA??LI ??TFA??YE H??ZMET MOB??L BAKIM ARACI">??ZEL AMA??LI ??TFA??YE H??ZMET MOB??L BAKIM ARACI</option>
                                <option value="ford">D????ER</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Ara?? T??r?? Ge??erli</Form.Control.Feedback>
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label>Var ??se <b>Takip Cihaz??</b></Form.Label>
                            <Form.Select name="tracking_device" defaultValue={result.tracking_device} onChange={(e)=>handleChange(e)}>
                                <option value="YOK">YOK</option>
                                <option value="ARVENTO">ARVENTO</option>
                                <option value="N2 MOB??L">N2 MOB??L</option>
                                <option value="VEKT??R">VEKT??R</option>
                                <option value="TR??O">TR??O</option>
                                <option value="POLAR">POLAR</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Takip Cihaz?? Ge??erli</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="validationCustom03">
                        <Form.Label>Takip Cihaz?? <b>??D</b></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Takip Cihaz?? ??D"
                                defaultValue={result.tracking_device_id}
                                name="tracking_device_id" 
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>??D Ge??erli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            ??D Girin!
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Takip Cihaz?? <b>GSM</b></Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Takip Cihaz?? GSM"
                                defaultValue={result.tracking_device_gsm}
                                name="tracking_device_gsm"
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>GSM Ge??erli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            GSM Girin!
                            </Form.Control.Feedback>
                    </Form.Group>
                    
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col} controlId="validationCustom05">
                        <Form.Label>Ara?? Markas??</Form.Label>
                            <Form.Select name="car_brand" id="carofbrand" defaultValue={result.car_brand} onChange={(e)=>handleChange(e)}>
                                <option value="FORD">FORD</option>
                                <option value="RENAULT">RENAULT</option>
                                <option value="BMW">BMW</option>
                                <option value="CITROEN">CITROEN</option>
                                <option value="DAC??A">DACIA</option>
                                <option value="HONDA">HONDA</option>
                                <option value="HYUNDAI">HYUNDAI</option>
                                <option value="ISUZU">ISUZU</option>
                                <option value="KIA">K??A</option>
                                <option value="MAZDA">MAZDA</option>
                                <option value="MERCEDES">MERCEDES-BENZ</option>
                                <option value="NISSAN">NISSAN</option>
                                <option value="OPEL">OPEL</option>
                                <option value="PEUGEOT">PEUGEOT</option>
                                <option value="SEAT">SEAT</option>
                                <option value="SKODA">SKODA</option>
                                <option value="SUZUKI">SUZUK??</option>
                                <option value="TOYOTA">TOYOTA</option>
                                <option value="VOLSWAGEN">VOLSWAGEN</option>
                                <option value="VOLVO">VOLVO</option>
                                <option value="KAMYON">KAMYON</option>
                                <option value="KAMYONET">KAMYONET</option>
                                <option value="TIR">TIR</option>
                                <option value="OTOBUS">OTOB??S</option>
                                <option value="MINIBUS">M??N??B??S</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Ara?? Markas?? Ge??erli</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>Ara?? Markas?? Ge??erli de??il</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>Ara?? Modeli</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ara?? Modeli"
                                defaultValue={result.car_model}
                                name="car_model"
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>Ara?? Modeli Ge??erli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                           Ara?? Modeli Girin!
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="4" controlId="validationCustom07">
                        <Form.Label>Ara?? Model Y??l??</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Ara?? Model Y??l??"
                                defaultValue={result.model_year}
                                name='model_year'
                                onChange={(e)=>handleChange(e)}
                            />
                        <Form.Control.Feedback>Ara?? Model Y??l?? Ge??erli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Model Y??l?? Girin!
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                </Row>
                <Row className="mb-2">

                    <Form.Group as={Col} controlId="validationCustom08">
                        <Form.Label>Plaka T??r??</Form.Label>
                            <Form.Select
                            required
                            name='plate_type'
                            onChange={(e)=>handleChange(e)}>
                                <option value="S??V??L">S??V??L</option>
                                <option value="RESM??">RESM??</option>
                                
                            </Form.Select> 
                        <Form.Control.Feedback>Plaka T??r?? Ge??erli</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom09">
                        <Form.Label>Plaka</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Plaka"
                                defaultValue={result.plate}
                                name='plate'
                                onChange={(e)=>handleChange(e)}
                                />
                        <Form.Control.Feedback>Plaka Ge??erli</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                        Plaka Girin!
                        </Form.Control.Feedback>
                    </Form.Group>
                              
                    <Form.Group as={Col} md="4" controlId="validationCustom10">
                        <Form.Label>Yak??t T??ketimi</Form.Label>
                        <InputGroup >
                            <Form.Control
                            type="number"
                            placeholder="Yak??t T??ketimi"
                            aria-describedby="inputGroupPrepend"
                            required
                            name='fuel_consumption'
                            defaultValue={result.fuel_consumption}
                            onChange={(e)=>handleChange(e)}

                            />
                            <Form.Control.Feedback type="invalid">
                            Yak??t T??ketimi Girin!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                
                    </Row>
                    <Row>                 
                <Form.Group as={Col} md="6" controlId="validationCustom11">
                    <Form.Label>Edinim ??ekli Se??iniz</Form.Label>
                            <Form.Select
                            required
                            name='form_acquisition'
                            defaultValue={result.form_acquisition}
                            onChange={(e)=>handleChange(e)}>
                                <option value="K??RALIK">K??RALIK</option>
                                <option value="S??ZLE??ME KAPSAMINDA">S??ZLE??ME KAPSAMINDA</option>
                                <option value="KEND?? MALI">KEND?? MALI</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Edinim ??ekli Ge??erli</Form.Control.Feedback>                                                       
                    </Form.Group>
                    
                    <Form.Group as={Col} md="6" controlId="validationCustom12">
                        <Form.Label>Birim</Form.Label>
                            <Form.Select
                            required
                            defaultValue={result.department}
                            name='department'
                            onChange={(e)=>handleChange(e)}>
                                <option value="ASK??">ASK??</option>
                                <option value="B??LG?? ????LEM DA??RES?? BA??KANLI??I">B??LG?? ????LEM DA??RES?? BA??KANLI??I</option>
                                <option value="ABONE ????LER?? DA??RES?? BA??KANLI??I">ABONE ????LER?? DA??RES?? BA??KANLI??I</option>
                                <option value="BARAJ ????LETME VE MAK??NA ??KMAL DA??RES?? BA??KANLI??I">BARAJ ????LETME VE MAK??NA ??KMAL DA??RES?? BA??KANLI??I</option>
                                <option value="DESTEK H??ZMELER?? DA??RES?? BA??KANLI??I">DESTEK H??ZMELER?? DA??RES?? BA??KANLI??I</option>
                                <option value="??NSAN KAYNAKLARI VE E????T??M DA??RES?? BA??KANLI??I">??NSAN KAYNAKLARI VE E????T??M DA??RES?? BA??KANLI??I</option>
                                <option value="HUKUK M????AV??RL??????">HUKUK M????AV??RL??????</option>
                                <option value="???? DENET??M B??R??M?? BA??KANLI??I">???? DENET??M B??R??M?? BA??KANLI??I</option>
                                <option value="??ZEL KALEM M??D??RL??????">??ZEL KALEM M??D??RL??????</option>
                                <option value="TEFT???? KURULU BA??KANLI??I">TEFT???? KURULU BA??KANLI??I</option>
                                <option value="KARARLAR ??UBE M??D??RL??????">KARARLAR ??UBE M??D??RL??????</option>
                                <option value="BASIN YAYIN ??UBE M??D??RL??????">BASIN YAYIN ??UBE M??D??RL??????</option>
                                <option value="??EVRE KORUMA VE SU HAVZALARI DA??RES?? BA??KANLI??I">??EVRE KORUMA VE SU HAVZALARI DA??RES?? BA??KANLI??I</option>
                                <option value="SU ARITMA DA??RES?? BA??KANLI??I">SU ARITMA DA??RES?? BA??KANLI??I</option>
                                <option value="PROJELER DA??RES?? BA??KANLI??I">PROJELER DA??RES?? BA??KANLI??I</option>
                                <option value="ATIKSU ARITMA DA??RES?? BA??KANLI??I">ATIKSU ARITMA DA??RES?? BA??KANLI??I</option>
                                <option value="STRATEJ?? GEL????T??RME DA??RES?? BA??KANLI??I">STRATEJ?? GEL????T??RME DA??RES?? BA??KANLI??I</option>
                                <option value="SU ??N??AAT DA??RES?? BA??KANLI??I">SU ??N??AAT DA??RES?? BA??KANLI??I </option>
                                <option value="KANAL ??N??AAT DA??RES?? BA??KANLI??I ">KANAL ??N??AAT DA??RES?? BA??KANLI??I </option>
                                <option value="1.B??LGE SU VE KANAL ????LETME DA??RES?? BA??KANLI??I">1.B??LGE SU VE KANAL ????LETME DA??RES?? BA??KANLI??I </option>
                                <option value="2.B??LGE SU VE KANAL ????LETME DA??RES?? BA??KANLI??I">2.B??LGE SU VE KANAL ????LETME DA??RES?? BA??KANLI??I </option>
                                <option value="3.B??LGE SU VE KANAL ????LETME DA??RES?? BA??KANLI??I">3.B??LGE SU VE KANAL ????LETME DA??RES?? BA??KANLI??I </option>
                                <option value="TES??SLER DA??RES?? BA??KANLI??I ">TES??SLER DA??RES?? BA??KANLI??I </option>  
                            </Form.Select>
                        <Form.Control.Feedback>Birim Ge??erli</Form.Control.Feedback>                           
                    </Form.Group>

                </Row>
                <Row className="mb-3">                 
                    <Form.Group as={Col} md="4" controlId="validationCustom13">
                        <Form.Label>Hizmet Edilen ??nvan</Form.Label>
                            <Form.Select
                            required
                            name='belong_officer'
                            defaultValue={result.belong_officer}
                            onChange={(e)=>handleChange(e)}>
                                <option value="Y??NET??M KURULU BA??KANI">Y??NET??M KURULU BA??K.</option>
                                <option value="GENEL M??D??R">GENEL M??D??R</option>
                                <option value="GENEL M??D??R YARDIMCISI">GENEL M??D??R YARD.</option>
                                <option value="DA??RE BA??KANI">DA??RE BA??K.</option>
                                <option value="??UBE M??D??R??">??UBE M??D??R??</option>
                                <option value="??EF">??EF</option>
                                <option value="KONTROL">KONTROL</option>
                                <option value="AVUKAT">AVUKAT</option>
                                <option value="PERSONEL">PERSONEL</option>
                            </Form.Select> 
                        <Form.Control.Feedback>Hizmet Edilen ??nvan Ge??erli</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group as={Col} md="4" controlId="validationCustom14">
                        <Form.Label>Hizmet Edilen ??sim Soyisim</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Hizmet Edilen ??sim Soyisim"
                            aria-describedby="inputGroupPrepend"
                            defaultValue={result.officer_name}
                            name='officer_name'
                            onChange={(e)=>handleChange(e)}
                            />
                    </Form.Group>
                
                    <Form.Group as={Col} md="4">
                        <Form.Label>??of??r ??sim Soyisim</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="??of??r ??sim Soyisim"
                            name='driver_name'
                            defaultValue={result.driver_name}
                            onChange={(e)=>handleChange(e)}
                            />
                    </Form.Group>
            
                </Row>
                <Row>
                    <Form.Group as={Col} md="12" >
                        <Form.Label >Ara?? Notu</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Ara?? Notu"
                            name='notes'
                            defaultValue={result.notes}
                            onChange={(e)=>handleChange(e)}
                            style={{height:65}}
                            />
                    </Form.Group>
                    
                </Row>

                    <Form.Group as={Col}   controlId="validationCustom16">
                        <Form.Check
                        required
                        label="Kullan??m Ko??ullar??n?? okudum kabul ediyorum."
                        feedback="Kullan??m ko??ullar??n?? kabul etmelisiniz."
                        feedbackType="invalid"
                        name='user_terms'
                        type="checkbox"
                        onChange={()=> setCheckbox(!checkBox)}
                        />
                    <a href={MyPDF} download="My_File.pdf"> ??ndir </a>
                    </Form.Group>
                    <Button type="submit" className='col-8 p-2 d-flex justify-content-center mx-auto' onClick={() => postDatabase(newCar)}>D??zenle</Button>
            </Form>
        </Container>
        <Container className="p-5">
        <span></span>
        </Container>
        <Footer></Footer>
    </>
    )
}

export default Details