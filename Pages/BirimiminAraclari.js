import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import FormExample from '../components/Input_Group'
import TableEx from '../components/Table'
import Footer from '../components/Footer'


const BirimiminAraclari = () => {
  // const [user, setUser] = useState({})
  
  // useEffect(() => {
  //   let userLog = JSON.parse(window.localStorage.getItem("myuser"));
  //   if (userLog) {
  //     setUser(JSON.stringify(userLog.username));
  //     setNewcar(prevInput => {
  //       return(
  //           {
  //               ...prevInput,
  //               myuser : {user}
  //           }
  //       )
  //   })
  //     }
  //   else{console.log("user bilgisi gelmedi");}
  // }, []);
  
  const [newCar, setNewcar] = useState({
    car_type:"BİNEK",
    tracking_device:"YOK",
    tracking_device_id:null,
    tracking_device_gsm:null,
    car_brand:"FORD",
    car_model:null,
    model_year:null,
    plate_type:"Sivil",
    plate:null,
    fuel_consumption:null,
    form_acquisition:"KİRALIK",
    department:"ASKİ",
    belong_officer:"YÖNETİM KURULU BAŞKANI",
    officer_name:"",
    driver_name:"",
    user_terms:"",
    myuser:"",
  });

  // console.log(newCar);
  
  return (
    <>
    <div>
      <Header></Header>
      <FormExample newCar={newCar} setNewcar={setNewcar}></FormExample>
      <TableEx newCar={newCar} setNewcar={setNewcar}></TableEx>
      <Footer/>
    </div>
  </>
  )
}

export default BirimiminAraclari