import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import ExPagination from "./Pagination";
import { json, Link } from "react-router-dom";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../comp_tools/ComponentToPrint';


// getirme işlemi için kullandığım fonsiyon 

function TableEx(newCar, setNewcar) {
  const[cars, setCars] = useState([]);
  const[currentPage, setCurrentPage]=useState(1);
  const[totalCount, setTotalCount]=useState();
  const[pageSize, setPageSize]=useState(5);
  const tableRef = useRef(null);
  const componentRef = useRef();
  const pageNumbers = [] ; 

  /////////////BURADA SERİ HOOK ////////////////
  const[searchTxt1, setSearchTxt1] = useState(null);
  const[searchCln1, setSearchCln1] = useState(null);
//
  const[searchTxt2, setSearchTxt2] = useState(null);
  const[searchCln2, setSearchCln2] = useState(null);
//
  const[searchTxt3, setSearchTxt3] = useState(null);
  const[searchCln3, setSearchCln3] = useState(null);
//
  const[searchTxt4, setSearchTxt4] = useState(null);
  const[searchCln4, setSearchCln4] = useState(null);
//
  const[searchTxt5, setSearchTxt5] = useState(null);
  const[searchCln5, setSearchCln5] = useState(null);
//
  const[searchTxt6, setSearchTxt6] = useState(null);
  const[searchCln6, setSearchCln6] = useState(null);
//
  const[searchTxt7, setSearchTxt7] = useState(null);
  const[searchCln7, setSearchCln7] = useState(null);
//
  const[searchTxt8, setSearchTxt8] = useState(null);
  const[searchCln8, setSearchCln8] = useState(null);
//
  const[searchTxt9, setSearchTxt9] = useState(null);
  const[searchCln9, setSearchCln9] = useState(null);
//
  const[searchTxt10, setSearchTxt10] = useState(null);
  const[searchCln10, setSearchCln10] = useState(null);
//
  const[searchTxt11, setSearchTxt11] = useState(null);
  const[searchCln11, setSearchCln11] = useState(null);
//
  const[searchTxt12, setSearchTxt12] = useState(null);
  const[searchCln12, setSearchCln12] = useState(null);
//
  const[searchTxt13, setSearchTxt13] = useState(null);
  const[searchCln13, setSearchCln13] = useState(null);
//
  const[searchTxt14, setSearchTxt14] = useState(null);
  const[searchCln14, setSearchCln14] = useState(null);
//
  const[searchTxt15, setSearchTxt15] = useState(null);
  const[searchCln15, setSearchCln15] = useState(null);
//

  let searchUrl1;
  let searchUrl2;
  let searchUrl3;
  let searchUrl4;
  let searchUrl5;
  let searchUrl6;
  let searchUrl7;
  let searchUrl8;
  let searchUrl9;
  let searchUrl10;
  let searchUrl11;
  let searchUrl12;
  let searchUrl13;
  let searchUrl14;
  let searchUrl15;
  searchTxt1  !=null ? searchUrl1  =  `filters[${searchCln1}][$containsi]=${searchTxt1}&`   : searchUrl1 =null
  searchTxt2  !=null ? searchUrl2  =  `filters[${searchCln2}][$containsi]=${searchTxt2}&`   : searchUrl2 =null
  searchTxt3  !=null ? searchUrl3  =  `filters[${searchCln3}][$containsi]=${searchTxt3}&`   : searchUrl3 =null
  searchTxt4  !=null ? searchUrl4  =  `filters[${searchCln4}][$containsi]=${searchTxt4}&`   : searchUrl4 =null
  searchTxt5  !=null ? searchUrl5  =  `filters[${searchCln5}][$containsi]=${searchTxt5}&`   : searchUrl5 =null
  searchTxt6  !=null ? searchUrl6  =  `filters[${searchCln6}][$containsi]=${searchTxt6}&`   : searchUrl6 =null
  searchTxt7  !=null ? searchUrl7  =  `filters[${searchCln7}][$containsi]=${searchTxt7}&`   : searchUrl7 =null
  searchTxt8  !=null ? searchUrl8  =  `filters[${searchCln8}][$containsi]=${searchTxt8}&`   : searchUrl8 =null
  searchTxt9  !=null ? searchUrl9  =  `filters[${searchCln9}][$containsi]=${searchTxt9}&`   : searchUrl9 =null
  searchTxt10 !=null ? searchUrl10 =  `filters[${searchCln10}][$containsi]=${searchTxt10}&` : searchUrl10 =null
  searchTxt11 !=null ? searchUrl11 =  `filters[${searchCln11}][$containsi]=${searchTxt11}&` : searchUrl11 =null
  searchTxt12 !=null ? searchUrl12 =  `filters[${searchCln12}][$containsi]=${searchTxt12}&` : searchUrl12 =null
  searchTxt13 !=null ? searchUrl13 =  `filters[${searchCln13}][$containsi]=${searchTxt13}&` : searchUrl13 =null
  searchTxt14 !=null ? searchUrl14 =  `filters[${searchCln14}][$containsi]=${searchTxt14}&` : searchUrl14 =null
  searchTxt15 !=null ? searchUrl15 =  `filters[${searchCln15}][$containsi]=${searchTxt15}&` : searchUrl15 =null
  /////////BİTİŞ////////////////////

let user = window.JSON.parse(localStorage.getItem("myuser"));
// console.log(user.username);
  let userToken = window.JSON.parse(localStorage.getItem("USER_TOKEN"));
  // const AuthStr = 'Bearer '+ USER_TOKEN;
  async function fetchData() {
    try {
      
      const urls=(`http://localhost:1337/api/aracs?`+searchUrl1+searchUrl2+searchUrl3+searchUrl4+searchUrl5+searchUrl6+searchUrl7+searchUrl8+searchUrl9+searchUrl10+searchUrl11+searchUrl12+searchUrl13+searchUrl14+searchUrl15+`&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort[0]=id&filters[isActive][$eq]=true`);
      const result = await axios.get(urls);
      setTotalCount(result.data.meta.pagination.total)
      setCars(result.data);
    } catch (error) {console.log("veriler alınırken hata olustu");}  
  }    

// silme işlemi için kullandığım fonsiyon 

  const deleteHandling = (e, car) => {
    const deleteLastCheck = window.confirm( `${car.attributes.car_brand} araç markalı, ${car.attributes.car_model} modeline sahip, ${car.attributes.plate} plakalı, ${car.attributes.department} isimli birimin adına kayıtlı aracı silmek üzeresiniz kabul ediyormusunuz?`)
    if(deleteLastCheck){
      let mydata = {};
      let newdata = {isActive:false}
      mydata.data=newdata;
      // console.log(mydata);
      axios.put(`http://localhost:1337/api/aracs/${car.id}`, mydata);
      
      let  message={};
      message.data ={log:`${user.username} kullanıcısı tarafından, ${car.attributes.plate} plakalı ${car.attributes.car_brand} markalı araç silinmiştir. `} ;
      axios.post(`http://localhost:1337/api/logs`, message)
      window.location.reload(false);

    }
  }

//yazdırma işlemi için yukarıdaki ref le beraber kullanılır

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    })
  
    
    //pagination componenti içerisindeki toplam sayfa sayısını belirlemek için kullandıgımız
    
    for ( let i = 1;  i <= Math.ceil(totalCount / pageSize) ; i++) {
      pageNumbers.push(i);
    }
    
    //Search inputuna bazı değerler girildiğinde jquery ile verilerin listelenmesi
    
    const searchHand1 = (e, k) => {
      if(k==1){
        setSearchTxt1(e.target.value) //seçilen araç arama inputundan gelen veriyi buradan cekiyoruz
        setSearchCln1(e.target.name)  //seçilen araç arama inputundan gelen veri hangi kolona ait olduğunu buradan cekiyoruz
      }else if(k==2){
        setSearchTxt2(e.target.value) 
        setSearchCln2(e.target.name)  
      }else if(k==3){
        setSearchTxt3(e.target.value) 
        setSearchCln3(e.target.name)  
      }else if(k==4){
        setSearchTxt4(e.target.value) 
        setSearchCln4(e.target.name)  
      }else if(k==5){
        setSearchTxt5(e.target.value) 
        setSearchCln5(e.target.name)  
      }else if(k==6){
        setSearchTxt6(e.target.value) 
        setSearchCln6(e.target.name)  
      }else if(k==7){
        setSearchTxt7(e.target.value) 
        setSearchCln7(e.target.name)  
      }else if(k==8){
        setSearchTxt8(e.target.value) 
        setSearchCln8(e.target.name)  
      }else if(k==9){
        setSearchTxt9(e.target.value) 
        setSearchCln9(e.target.name)  
      }else if(k==10){
        setSearchTxt10(e.target.value) 
        setSearchCln10(e.target.name)  
      }else if(k==11){
        setSearchTxt11(e.target.value) 
        setSearchCln11(e.target.name)  
      }else if(k==12){
        setSearchTxt12(e.target.value) 
        setSearchCln12(e.target.name)  
      }else if(k==13){
        setSearchTxt13(e.target.value) 
        setSearchCln13(e.target.name)  
      }
      else if(k==14){
        setSearchTxt14(e.target.value) 
        setSearchCln14(e.target.name)  
      }
      else if(k==15){
        setSearchTxt15(e.target.value) 
        setSearchCln15(e.target.name)  
      }
      
    }    
    
  useEffect(() => {
    fetchData();
  }, [currentPage, searchTxt1,searchTxt2,searchTxt3,searchTxt4,searchTxt5,searchTxt6,searchTxt7,searchTxt8,searchTxt9,searchTxt10,searchTxt11,searchTxt12,searchTxt13,searchTxt14,searchTxt15]);

//----------------------------------------------------------------------------------------------------------

  return (
    <>
    <Container className="Table_Birim_box mt-5 rounded-3 p-4 table-responsive"  >
      <h1 className='text-center mt-1 mb-4 shadow-lg p-3'>Birimimin Araçları</h1>
      <Container>
        <Stack direction="horizontal" className="">
          
          <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
              >
              <Button size="sm" className="btn btn-secondary mb-1 me-1 aling start"> Excel Format</Button>
          </DownloadTableExcel>

          <ComponentToPrint ref={tableRef} />
          <Button size="sm" className="btn btn-secondary mb-1" onClick={handlePrint}>Yazdır</Button>
        </Stack>
      </Container>

      <Table className="table table-bordered rounded-3 table-hover table-striped table-sm aling-item-center shadow-lg mb-5 bg-body rounded" ref={componentRef}>
        <thead>
          <tr className='text-center text-wrap fw-bold '>
            <th>Araç Türü 
              <InputGroup className="mb-3 " >
                <Form.Control 
                  placeholder="Arama"
                  name="car_type "
                  size='sm'
                  onChange={e=>searchHand1(e,1)}
                />
              </InputGroup>
            </th>
            <th>Takip Cihazı
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="tracking_device"
                  onChange={e=>searchHand1(e,2)}
                />
              </InputGroup>
            </th>
            <th>Cihaz İD
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="tracking_device_id"
                  onChange={e=>searchHand1(e,3)}
                />
              </InputGroup>
            </th>
            <th>Cihaz GSM
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="tracking_device_gsm"
                  onChange={e=>searchHand1(e,4)}
                />
              </InputGroup>
            </th>
            <th>Araç Markası
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="car_brand"
                  onChange={e=>searchHand1(e,5)}
                />
              </InputGroup>
            </th>
            <th>Araç Modeli
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="car_model"
                  onChange={e=>searchHand1(e,6)}
                />
              </InputGroup>
            </th>
            <th>Araç Model Yılı
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="model_year"
                  onChange={e=>searchHand1(e,7)}
                />
              </InputGroup>
            </th>
            <th>Plaka Türü
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="plate_type"
                  onChange={e=>searchHand1(e,8)}
                />
              </InputGroup>
            </th>
            <th>Plaka
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="plate"
                  onChange={e=>searchHand1(e,9)}
                />
              </InputGroup>
            </th>
            <th>Yakıt Tüketimi
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="fuel_consumption"
                  onChange={e=>searchHand1(e,10)}
                />
              </InputGroup>
            </th>
            <th>Edinim Şekli
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="form_acquisition"
                  onChange={e=>searchHand1(e,11)}
                />
              </InputGroup>
            </th>
            <th>Birim
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="department"
                  onChange={e=>searchHand1(e,12)}
                />
              </InputGroup>
            </th>
            <th>Hiz Edilen Ünvan
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="belong_officer"
                  onChange={e=>searchHand1(e,13)}
                />
              </InputGroup>
            </th>
            <th>Hiz Edilen İsim-Soyisim
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="officer_name"
                  onChange={e=>searchHand1(e,14)}
                />
              </InputGroup>
            </th>
            <th>Şoför İsim-Soyisim
            <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Arama"
                  size='sm'
                  name="driver_name"
                  onChange={e=>searchHand1(e,15)}
                />
              </InputGroup>
            </th >
            <th className="d-flex mt-3  justify-content-center">Silme-Düzenleme</th>
            
          </tr>
        </thead>
        <tbody>
          {cars && cars.data 
            ? cars.data.map((car) => {

                return (
                  <tr  key={uuidv4()} id={car.attributes.id} className='text-center align-middle'>
                    <td  key={uuidv4()}>{car.attributes.car_type}</td>
                    <td  key={uuidv4()}>{car.attributes.tracking_device}</td>
                    <td  key={uuidv4()}>{car.attributes.tracking_device_id}</td>
                    <td  key={uuidv4()}>{car.attributes.tracking_device_gsm}</td>
                    <td  key={uuidv4()}>{car.attributes.car_brand}</td>
                    <td  key={uuidv4()}>{car.attributes.car_model}</td>
                    <td  key={uuidv4()}>{car.attributes.model_year}</td>
                    <td  key={uuidv4()}>{car.attributes.plate_type}</td>
                    <td  key={uuidv4()}>{car.attributes.plate}</td>
                    <td  key={uuidv4()}>{car.attributes.fuel_consumption}</td>
                    <td  key={uuidv4()}>{car.attributes.form_acquisition}</td>
                    <td  key={uuidv4()}>{car.attributes.department}</td>
                    <td  key={uuidv4()}>{car.attributes.belong_officer}</td>
                    <td  key={uuidv4()}>{car.attributes.officer_name}</td>
                    <td  key={uuidv4()}>{car.attributes.driver_name}</td>
                    <td  key={uuidv4()}><Stack direction="horizontal"><Button onClick={(e)=> deleteHandling(e, car) } className="btn btn-danger me-1" size="sm"><i className="bi bi-trash"></i></Button>
                    <Link to={`/details/${car.id}`} ><Button  className="btn btn-secondary " size="sm"><i className="bi bi-eye"></i></Button></Link></Stack></td>
                </tr>
                );
              })
            : null}
        </tbody>
      </Table>
          <ExPagination pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} totalCount={totalCount} pageSize={pageSize} setPageSize={setPageSize} currentPage={currentPage}/>
    </Container>
    <Container className="p-5">
      <span></span>
    </Container>
    </>
  );
}

export default TableEx;
