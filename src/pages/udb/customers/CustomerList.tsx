import React, { useEffect, useState } from 'react'
import UDBHeader from 'src/components/common/UdbHeader'
import { ActionsWrap, FirstCol, Header, MainInfoWrapper, PosBlackBtn, PosBtn, SearchInputWrap, SubBodyHeader, SubBodyHeadLeft, SubBodyHeadRight, SubBodyMain, SubBodyWrapper, SvgIcon, TableContainer, TableContainerBody, TableContainerFooter, TableContainerHead, TableContainerWrapper } from 'src/components/udb/commonStyle'
import styled from "styled-components"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCustomerById, getCustomersList, getCustomerDetailsCSV} from 'src/config/api';
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
import { ModalBody, ModalBodyDetails, ModalBodyTop, ModalBodyTopLeft, ModalBodyTopRight, ModalTopHead } from '../employees/EmployeeList';

type CustomerDetailsProps = {
    partner_Id: string,
    partnerName: string,
    partnerCode1: string,
    credit: string,
    isCust: string,
    telephone: string,
    whatsappNo: string,
    fax: string,
    email1: string,
    website: string,
    billName: string,
    type:string,
    group: string
}

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


const CustomerList = () => {
  const [customers, setCustomers] = useState<any>([])
  const [customersCSV, setCustomersCSV] = useState([])
  const [customerDetails, setCustomerDetails] = useState({} as CustomerDetailsProps)
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1); //pagination
  let limit = 5;
  const navigate = useNavigate();

  //modal logics
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    getCustomerById(id).then((response) => {
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
    getCustomerCSV();
    getCustomers(page, limit);
  }, [])
     
const getCustomers= (page, limit) => {
    let params = {
        page: page,
        limit
    }
      getCustomersList(params)
      .then((response) => {
          const data = response.data
          setCustomers(data.employees);
          setCount(data.count)
          if (response.data.success === false) {
            toast.error(response.data.data.status);
          }
      })
      .catch((err) => toast.error("Something Went Wrong, Please Try Again"));
    }

    const getCustomerCSV = () => {
      getCustomerDetailsCSV().then((res) => {
        setCustomersCSV(res.data.employees)
      }).catch((err) => toast.error("Something Went Wrong, Please Try Again"));
    }
    
  
    const handleChangePageIndex = (index: number) => {
      const value = index;
      setPage(value)
      getCustomers(value, limit);
    };
  
  return (
    <MainInfoWrapper>
        <Header>
            <FirstCol>
              <UDBHeader title="Customer List"/>
            </FirstCol>
        </Header>
        <SubBodyWrapper>
            <SubBodyHeader>
               <SubBodyHeadLeft>
                 <PosBtn onClick={() => navigate("/customers/add-customer")}>+ Add New</PosBtn>
                 <PosBlackBtn><CSVLink data={customersCSV} filename={"customer-list.csv"}>Export to excel</CSVLink></PosBlackBtn>
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
                      <th>Code</th>
                      <th>A/c Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </TableContainerHead>

                <TableContainerBody>
                  {customers.length !== 0 ?
                   customers.map((customer, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{customer.name ? customer.name : "NA"}</td>
                          <td>{customer.code ? customer.code: "NA"}</td>
                          <td>{customer.accName ? customer.accName: "NA" }</td>
                          <td>{customer.phone ? customer.phone : "NA"}</td>
                          <td>{customer.email ? customer.email : "NA"}</td>
                          <ActionsWrap>
                            <SvgIcon onClick={() => handleOpen(customer.partner_Id)}>
                               <ViewIcon />
                            </SvgIcon>
                            <SvgIcon onClick={() => navigate(`edit-customer/${customer.partner_Id}`)}>
                               <EditIcon />
                            </SvgIcon>
                          </ActionsWrap>
                      </tr>
                  )) : <p>No data found</p>}
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
                          <p>: {customerDetails.partnerName ? customerDetails.partnerName : "NA" }</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>Code</h6>
                          <p>: {customerDetails.partnerCode1 ? customerDetails.partnerCode1 : "NA"}</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>City</h6>
                          <p>: NA </p>
                        </ModalBodyDetails>
                     </ModalBodyTopLeft>
                     <ModalBodyTopRight>
                        <ModalBodyDetails>
                          <h6>Area/Location</h6>
                          <p>: NA</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>Email</h6>
                          <p>: {customerDetails.email1 ? customerDetails.email1 : "NA"}</p>
                        </ModalBodyDetails>
                        <ModalBodyDetails>
                          <h6>Phone No.</h6>
                          <p>: {customerDetails.telephone ? customerDetails.telephone : "NA"}</p>
                        </ModalBodyDetails>
                    </ModalBodyTopRight>
                   </ModalBodyTop>
                   <TableContainer style={{border:'0.5px solid #FB260145', borderRadius: '7px',marginTop:"10px",borderBottom:"0px"}}>
                        <TableContainerHead>
                            <tr>
                            <th>SL No</th>
                            <th>Order Code</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Balance</th>
                            </tr>
                        </TableContainerHead>

                        <TableContainerBody>
                        {customers.length !== 0 ?
                        customers.map((customer, index) => (
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

export default CustomerList;

const ModalWrapper = styled.div`
    
`