import React, { useEffect, useState } from 'react'
import UDBHeader from 'src/components/common/UdbHeader'
import { ActionsWrap, FirstCol, Header, MainInfoWrapper, PosBlackBtn, PosBtn, SearchInputWrap, SubBodyHeader, SubBodyHeadLeft, SubBodyHeadRight, SubBodyMain, SubBodyWrapper, SvgIcon, TableContainer, TableContainerBody, TableContainerFooter, TableContainerHead, TableContainerWrapper } from 'src/components/udb/commonStyle'
import styled from "styled-components"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEmployeeDetails, getEmployeeDetailsById, getEmployeeDetailsCSV } from 'src/config/api';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CSVLink } from "react-csv";

//image imports
import searchIcon from "../../../images/png/search-icon.png"
import printerIcon from "../../../images/png/printer-icon.png"
import downloadIcon from "../../../images/png/download-icon.png"
import ViewIcon from 'src/components/Icon/ViewIcon';
import EditIcon from 'src/components/Icon/EditIcon';
import Pagination from 'src/components/common/Pagination';
import { useNavigate } from 'react-router-dom';

type Props = {}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#ffe6e2',
  border: '1px solid #ffffff',
  boxShadow: 24,
  borderRadius: 5
};


const EmployeeList = (props: Props) => {
  const [employees, setEmployees] = useState<any>([])
  const [customerDetails, setCustomerDetails] = useState([])
  const [employeeCSV, setEmployeesCSV] = useState([])
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1); //pagination
  let limit = 5;
  const navigate = useNavigate();

  //modal logics
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    getEmployeeDetailsById(id).then((response) => {
      const data = response.data
      setCustomerDetails(data[0]);
      if (response.data.success === false) {
        toast.error(response.data.data.status);
      }
    })
    .catch((err) => toast.error("Something Went Wrong, Please Try Again"));
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  useEffect(() => {
    getCustomerDetailsCSV();
    getEmployees(page, limit);
    setOpen(false);
  }, [])
     
  const getEmployees= (page, limit) => {
    let params = {
        page: page,
        limit
    }
    getEmployeeDetails(params)
      .then((response) => {
        const data = response.data
        setEmployees(data.employees);
        setCount(data.count)
        
        if (response.data.success === false) {
          toast.error(response.data.data.status);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
    }   

    const getCustomerDetailsCSV = () => {
      getEmployeeDetailsCSV().then((res) => {
        setEmployeesCSV(res.data.employees)
      }).catch((err) => toast.error("Something Went Wrong, Please Try Again"));
    }
  
    const handleChangePageIndex = (index: number) => {
      const value = index;
      setPage(value)
      getEmployees(value, limit);
    };
  
  return (
    <MainInfoWrapper>
        <Header>
            <FirstCol>
              <UDBHeader title="Employees List"/>
            </FirstCol>
        </Header>
        <SubBodyWrapper>
            <SubBodyHeader>
               <SubBodyHeadLeft>
                 <PosBtn onClick={() => navigate("/employees/add-employee")}>+ Add New</PosBtn>
                 <PosBlackBtn><CSVLink data={employeeCSV} filename={"employee-list.csv"}>Export to excel</CSVLink></PosBlackBtn>
                 <SearchInputWrap>
                    <img src={searchIcon} alt="icon" />
                    <input type="text" placeholder='Search'/>
                </SearchInputWrap>
               </SubBodyHeadLeft>
               <SubBodyHeadRight>
                   <img src={printerIcon} alt="icon" />
                   <img src={downloadIcon} alt="icon" />
               </SubBodyHeadRight>
            </SubBodyHeader>
            <SubBodyMain>
              <TableContainerWrapper>
               <TableContainer>
                <TableContainerHead>
                    <tr>
                      <th>SL No</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </TableContainerHead>

                <TableContainerBody>
                  {employees.length !== 0 ?
                   employees.map((customer, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{customer.empName ? customer.empName : "NA"}</td>
                          <td>{customer.phoneNumber ? customer.phoneNumber : "NA"}</td>
                          <td>{customer.emailId ? customer.emailId : "NA"}</td>
                          <ActionsWrap>
                            <SvgIcon onClick={() => handleOpen(customer.emp_ID)}>
                               <ViewIcon />
                            </SvgIcon>
                            <SvgIcon onClick={() => navigate(`/employees/employees-list/edit-employee/${customer.emp_ID}`)}>
                               <EditIcon />
                            </SvgIcon>
                          </ActionsWrap>
                      </tr>
                  )) : <>No data found</>}
                </TableContainerBody>
               </TableContainer>
                <TableContainerFooter>
                  <Pagination
                    numberPerPage={5}
                    totalLength={count}
                    onClick={handleChangePageIndex}
                    currentIndex={page}
                   />
                  {/* <p>01-50 of 250 pages</p> */}
                </TableContainerFooter>
              </TableContainerWrapper>
            </SubBodyMain>
        </SubBodyWrapper>

        <ModalWrapper>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                 <ModalTopHead>
                    <h3>Customer details</h3>
                 </ModalTopHead>
                 <ModalBody>
                   <ModalBodyTop>
                     <ModalBodyTopLeft>
                        <ModalBodyDetails>
                          <h6>Name</h6>
                          <p>: Tom Kirkman</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>Code</h6>
                          <p>: 00122303</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>City</h6>
                          <p>: 00122303</p>
                        </ModalBodyDetails>
                     </ModalBodyTopLeft>
                     <ModalBodyTopRight>
                        <ModalBodyDetails>
                          <h6>Area/Location</h6>
                          <p>: New Bel Road</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>Email</h6>
                          <p>: tomkirkman012@gmail.com</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>Phone No.</h6>
                          <p>: +91-7736495852</p>
                        </ModalBodyDetails>
                    </ModalBodyTopRight>
                   </ModalBodyTop>
                   <TableContainer style={{border:'0.5px solid #FB260145', borderRadius: '7px',marginTop:"10px",borderBottom:"0px"}}>
                        <TableContainerHead>
                            <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                            </tr>
                        </TableContainerHead>

                        <TableContainerBody>
                        {employees.length !== 0 ?
                        employees.map((customer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{customer.empName ? customer.empName : "NA"}</td>
                                <td>{customer.phoneNumber ? customer.phoneNumber : "NA"}</td>
                                <td>{customer.emailId ? customer.emailId : "NA"}</td>
                            </tr>
                        )) : <>No data found</>}
                        </TableContainerBody>
                    </TableContainer>
                 </ModalBody>
              </Box>
            </Modal>
        </ModalWrapper>

    </MainInfoWrapper>
  )
}

export default EmployeeList;

const ModalWrapper = styled.div`
    
`
export const ModalTopHead = styled.div`
    background-color: #F76F20;
    width: 100%;
    height: auto;
    border-radius: 20px 20px 0px 0px;

    & h3 {
       font-size: 20px;
       font-weight: 500;
       color: #ffffff;
       padding: 10px 15px;
       font-family: 'Inter';
    }
`

export const ModalBody = styled.div`
  padding: 10px;
`
export const ModalBodyTop = styled.div`
   background-color: #ffffff;
   height: auto;
   padding: 10px;
   width: 98%;
   border-radius: 10px;
   display: flex;
   justify-content: space-between;
`
export const ModalBodyTopLeft = styled.div`
   width: 50%;
`
export const ModalBodyTopRight = styled.div`
    width: 50%;
`
export const ModalBodyDetails = styled.div`
     display: flex;
     justify-content: space-between;
     width: 100%;

      & h6 {
       font-size: 15px;
       font-weight: 600;
       color: #000000;
       margin: 3px 3px;
       font-family: 'Inter';
       width: 30%;
    }

    & p {
       font-size: 15px;
       font-weight: 500;
       color: #000000;
       margin: 3px 0px;
       font-family: 'Inter';  
       width: 70%;
    }
`