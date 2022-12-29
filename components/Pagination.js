import { Button, Container, FormSelect } from "react-bootstrap";

function ExPagination({
  setCurrentPage,
  totalCount,
  currentPage,
  pageNumbers,
}) {
  const changeHandler = (e) => {
    // console.log("e.target.value", e.target.value);
    setCurrentPage(e.target.value);
  };

  const nextsibling = () => {
    if (currentPage <= pageNumbers.at(-1) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevsibling = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // console.log("pageNumbers.length--", pageNumbers.length);
  return (
    <>
      <p className="d-flex justify-content-center ">{`Toplamda ${pageNumbers.length} sayfadan,  ${currentPage}. sayfadasınız. Toplam Araç ${totalCount} `}</p>

      <Container className="d-flex  col-3 mb-5">
        <Button
          className="mx-1 btn btn-secondary"
          size="sm"
          onClick={() => {
            setCurrentPage(pageNumbers.at(0));
          }}
        >
          <i className="bi bi-chevron-double-left"></i>
        </Button>
        <Button
          className="mx-1 btn btn-secondary"
          size="sm"
          onClick={prevsibling}
        >
          {" "}
          <i className="bi bi-chevron-left"></i>
        </Button>
        <FormSelect
          onChange={changeHandler}
          value={currentPage}
          className="text-center"
        >
          {pageNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </FormSelect>
        <Button
          className="mx-1 btn btn-secondary"
          size="sm"
          onClick={nextsibling}
        >
          {" "}
          <i className="bi bi-chevron-right"></i>
        </Button>
        <Button
          className="mx-1 btn btn-secondary"
          size="sm"
          onClick={() => {
            setCurrentPage(pageNumbers.at(-1));
          }}
        >
          {" "}
          <i className="bi bi-chevron-double-right"></i>
        </Button>
      </Container>
    </>
  );
}

export default ExPagination;
