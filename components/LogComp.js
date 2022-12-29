import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useReactToPrint } from 'react-to-print';
import { v4 as uuidv4 } from 'uuid';
import { ComponentToPrint } from '../comp_tools/ComponentToPrint';
import ExPagination from "./Pagination";


function LogList() {
  const[cars, setCars] = useState([]);
  const[currentPage, setCurrentPage]=useState(1);
  const[totalCount, setTotalCount]=useState([]);
  const[pageSize, setPageSize]=useState(15);
  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:1337/api/logs?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort[0]=id`);
      setTotalCount(result.data.meta.pagination.total)
      setCars(result.data);
    } catch (error) {}  }    

    useEffect(() => {
      fetchData();
    }, [currentPage]);

    const pageNumbers = [] ; // 3 lü olacak

      for ( let i = 1;  i <= Math.ceil(totalCount / pageSize) ; i++) {
        pageNumbers.push(i);
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    })

    const tableRef = useRef(null);

  return (
    <>
    <Container className='Logging_List col-10 mt-2 p-3 rounded-4 shadow-lg p-3 bg-white rounded '><br/>
      <h1 className='text-center shadow-lg p-2 rounded-4'> İşlem Geçmişi Sayfası</h1><br/>

      <Stack direction="horizontal" className='mb-2'>
          <ComponentToPrint ref={tableRef} />
          <Button size="sm" className="btn btn-secondary mb-1" onClick={handlePrint}>Yazdır</Button>
      </Stack>
        <ListGroup className='shadow-lg mb-4' >
        {cars && cars.data
            ? cars.data.map((car) => {
              return (
                <>
                    <ListGroup.Item disabled  key={uuidv4()}> {car.attributes.createdAt.substring(0,16).replace('T', ' tarihinde ve ' )} saatinde, {car.attributes.log}  </ListGroup.Item>
                  </>
                  );
                })
                : null}
        </ListGroup>
        <ExPagination pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} totalCount={totalCount} pageSize={pageSize} setPageSize={setPageSize} currentPage={currentPage}/>

    </Container>
    <Container className="p-5">
      <span></span>
    </Container>
    </>
  );
}

export default LogList;