import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import UDBHeader from 'src/components/common/UdbHeader'
import { CheckboxWrap, FirstCol, Header, InputWrap, MainInfoWrapper, MasterFormLeftSec, MasterFormRightSec, MasterFormRightTop, MasterFormSec, MasterFormSecBody, MasterFormSecButtonsLeft, MasterFormSecButtonsRight, MasterFormSecButtonsWrap, MasterFormSecTop, MasterFormSecWrapper, MasterFormWrapper, PosBlackBtn, PosBtn, PosTransparentBtn, SvgIcon, TableContainer, TableContainerBody, TableContainerHead, TableContainerWrapper } from 'src/components/udb/commonStyle'
import MasterFormTab from 'src/components/common/MasterFormTab'
import MasterMainBoxes from 'src/components/common/MasterMainBoxes'
import { Controller, useForm } from 'react-hook-form'
import Input from 'src/components/common/Input'
import { saveCustomers, saveEmployee } from 'src/config/api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'

type EmployeeTypes = {
  pwd: string,
  empName: string,
  emp_ID: string,
  empCode: string,
  phoneNumber: string,
  userRank: string,
  emailId: string,
  emailPswd: string,
  loginID: string,
  dateOfBirth: string,
  isConsultant: boolean,
  isSalesMan: boolean,
  isDisPermission: boolean,
  isUser: boolean,
  branchID: string,
  userrank_Type: string,
  empimage: string,
  totalDependant: string,
  isEmployee: string,
  salary: string,
  userID: string
}

const EmployeeStateDefault: EmployeeTypes = {
  pwd: "",
  empName: "",
  emp_ID: "",
  empCode: "",
  phoneNumber: "",
  userRank: "",
  emailId: "",
  emailPswd: "",
  loginID: "",
  dateOfBirth: "",
  isConsultant: false,
  isSalesMan: false,
  isDisPermission: false,
  isUser: false,
  branchID: "",
  userrank_Type: "",
  empimage: "",
  totalDependant: "",
  isEmployee: "",
  salary: "",
  userID: ""
}

const defaultErrorState = {
  pwd: false,
  empName: false,
  emp_ID: false,
  empCode: false,
  phoneNumber: false,
  userRank: false,
  emailId: false,
  emailPswd: false,
  loginID: false,
  dateOfBirth: false,
  isConsultant: false,
  isSalesMan: false,
  isDisPermission: false,
  isUser: false,
  branchID: false,
  userrank_Type: false,
  empimage: false,
  totalDependant: false,
  isEmployee: false,
  salary: false,
  userID: false
}

const tabData = [
  {
    id: 1,
    tabTitle: "Employee Details"
  },
  {
    id: 2,
    tabTitle: "Account Information"
  },
  {
    id: 3,
    tabTitle: "Approval Pending Sales"
  },
]

const AddEmployee = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("Employee Details")
  const [employeeState, setEmployeeState] = useState(EmployeeStateDefault);
  const [errorState, setErrorState] = useState(defaultErrorState);
  const [page, setPage] = useState(1); //pagination
  let limit = 5;
  const [startAt, setStartAt] = useState(new Date(new Date().setHours(0, 0, 0))); //Date
  const [endAt, setEndAt] = useState(new Date(new Date().setHours(23, 59, 59))); //Data
  const date = new Date();
  const minDate = date.setDate(new Date().getDate() - 90);

  
  //modal logics
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);


  //ADD NEW CONTRACTS DATEPICKER
  const handlefromDateChange = (startAt: Date | null) => {
    setStartAt(startAt);
  };

  const handletoDateChange = (endAt: Date | null) => {
    setEndAt(endAt);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

    //change handler
    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const _elm = e.target;
      const _val = _elm.value;
      const _name = _elm.name;

      setEmployeeState(prevProp => ({ ...prevProp, [_name]: _val }));
      setErrorState(prevProp => ({ ...prevProp, [_name]: !_val }));
  }

  const formatInput = (e) => {
    return /\s/g.test(e);
}




  const submitEmployeeDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorState.phoneNumber || errorState.emailPswd || errorState.emailId || errorState.empName) {
        console.log("not allowed");
    }
    else {
  
    saveEmployee(employeeState).then(res => {
            if (res.data.message_status === "Success") {
                toast.success("Employee Added Succesfully")
                setTimeout(() => {
                    navigate("/employees/employee-list")
                }, 1000)
            }
            else {
                toast.error(res.data.message_status)
            }
        }).catch(e => {
            let error = 'Something went wrong please try again'
            toast.error(error)
            if (e.response && e.response.data) {
                error = e.response.data.message_status;
                toast.error(error)
            }
        }
        )
    }
}

const resetCustomerDetail = (e) => {
    e.preventDefault();
    setEmployeeState({ ...EmployeeStateDefault })
    setErrorState(defaultErrorState);
}

 

  const handleTabChange = (e, title, index) => {
    setFilterType(title)
  }



  return (
    <MainInfoWrapper>
      <Header>
        <FirstCol>
          <UDBHeader title="Add Employee Details" />
        </FirstCol>
      </Header>
      <MasterFormWrapper>
        <MasterFormLeftSec>
          <div>
            {tabData.map((tab, index) => (
              <MasterFormTab onClick={(e) => handleTabChange(e, tab.tabTitle, index)} isActive={tab.tabTitle === filterType} tabTitle={tab.tabTitle} />
            ))}
            <ToastContainer />
          </div>
        </MasterFormLeftSec>
        <MasterFormRightSec>
          <MasterFormSec>
            {filterType === "Employee Details" ?
              <MasterFormSecWrapper >
                <>
                  <MasterFormSecTop>
                    <h5>Personal Info</h5>
                  </MasterFormSecTop>
                  <MasterFormSecBody>
                    <form style={{flexDirection:"row"}}>
                      <CustomerInputWrap>
                            <InputWrap>
                              <label htmlFor="empName">Name</label>
                              <input
                                id="empName"
                                placeholder="Enter Name"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.empName}
                                name={"empName"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                          
                            <InputWrap>
                              <label htmlFor="emailId">Email</label>
                              <input
                                id="emailId"
                                placeholder="Email"
                                type="email"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.emailId}
                                name={"emailId"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                          

                       
                            <InputWrap>
                              <label htmlFor="name">Position</label>
                              <select id='group' placeholder='Select Group' onChange={changeHandler} value="" name={"group"}>
                                <option value="">Select</option>
                                <option value="0">0 - 1</option>
                                <option value="1">1 - 100</option>
                              </select>
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                         

                      
                            <InputWrap>
                              <label htmlFor="name">Default Branch*</label>
                              <select id='group' placeholder='Select Group' onChange={changeHandler} value="" name={"group"}>
                                <option value="">Select</option>
                                <option value="0">0 - 1</option>
                                <option value="1">1 - 100</option>
                              </select>
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                          

                        
                            <InputWrap>
                              <label htmlFor="name">Reporting To *</label>
                              <select id='group' placeholder='Select Group' onChange={changeHandler} value="" name={"group"}>
                                <option value="">Select</option>
                                <option value="0">0 - 1</option>
                                <option value="1">1 - 100</option>
                              </select>
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                        

                     
                            <InputWrap>
                              <label htmlFor="emailPswd">Password *</label>
                              <input
                                id="emailPswd"
                                placeholder="Enter password"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.emailPswd}
                                name={"emailPswd"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                         

                     
                      </CustomerInputWrap>
                      <CustomerInputWrap>
                      
                            <InputWrap>
                              <label htmlFor="phoneNumber">Phone</label>
                              <input
                                id="phoneNumber"
                                placeholder="Enter Phone Number"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.phoneNumber}
                                name={"phoneNumber"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                         

                        
                            <InputWrap>
                              <label htmlFor="emailPswd">Email Password *</label>
                              <input
                                id="emailPswd"
                                placeholder="Enter Email"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.emailPswd}
                                name={"emailPswd"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                          

                       
                            <InputWrap>
                              <label htmlFor="dateOfBirth">Date Of Birth *</label>
                              <input
                                id="dateOfBirth"
                                placeholder="Select"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.dateOfBirth}
                                name={"dateOfBirth"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                          
                            <InputWrap>
                              <label htmlFor="group">User Rank *</label>
                              <select id='group' placeholder='Select Group' onChange={changeHandler} value={employeeState.userRank} name={"userRank"}>
                                <option value="">Select Group</option>
                                <option value="0">0 - 1</option>
                                <option value="1">1 - 100</option>
                              </select>
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                          
                       
                            <InputWrap>
                              <label htmlFor="discount">Discount Limit</label>
                              <input
                                id="discount"
                                placeholder="Discount Limit"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value=""
                                name={"discount"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                         

                     
                            <InputWrap>
                              <label htmlFor="pwd">Confirm Password</label>
                              <input
                                id="pwd"
                                placeholder="Confirm Password"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.pwd}
                                name={"pwd"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                        

                      </CustomerInputWrap>
                      <CustomerInputWrap>

                           <InputWrap>
                              <label htmlFor="empimage">Image</label>
                              <input
                                id="empimage"
                                type="file"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.empimage}
                                name={"empimage"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                      
                            <InputWrap>
                              <label htmlFor="userID">User ID *</label>
                              <input
                                id="userID"
                                placeholder="Enter User Id"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.userID}
                                name={"userID"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                      
                            <InputWrap>
                              <label htmlFor="salary">Salary</label>
                              <input
                                id="salary"
                                placeholder="Enter Salary"
                                type="text"
                                onChange={changeHandler}
                                onKeyDown={formatInput}
                                value={employeeState.salary}
                                name={"salary"}
                              />
                              {/* <p>{error && error.message}</p> */}
                            </InputWrap>
                         
                      </CustomerInputWrap>
                     
                    </form>
                    <MasterFormSecButtonsWrap>
                        <MasterFormSecButtonsLeft>
                          <PosBlackBtn onClick={() => setFilterType("Account Information")}>Next</PosBlackBtn>
                        </MasterFormSecButtonsLeft>
                        <MasterFormSecButtonsRight>
                          <PosTransparentBtn onClick={resetCustomerDetail}>Discard Changes</PosTransparentBtn>
                          <PosBtn>Save</PosBtn>
                        </MasterFormSecButtonsRight>
                      </MasterFormSecButtonsWrap>
                  </MasterFormSecBody>
                </>
              </MasterFormSecWrapper> :
              filterType === "Account Information" ?
                <MasterFormSecWrapper>
                  <>
                    <MasterFormSecTop>
                      <h5>Account Information</h5>
                    </MasterFormSecTop>
                    <MasterFormSecBody>
                      <form style={{flexDirection:"row"}}>
                        <CustomerInputWrap>
                        
                              <InputWrap>
                                <label htmlFor="type">Create A/c</label>
                                <select id='city' placeholder='Select City' onChange={changeHandler} value="" name={"city"}>
                                  <option value="">Select City</option>
                                  <option value="0">0 - 1</option>
                                  <option value="1">1 - 100</option>
                                </select>
                                {/* <p>{error && error.message}</p> */}
                              </InputWrap>

                              <InputWrap>
                                <label htmlFor="phoneAddress">Phone</label>
                                <input
                                  id="phoneAddress"
                                  placeholder="Enter Phone"
                                  type="text"
                                  onChange={changeHandler}
                                  onKeyDown={formatInput}
                                  value=""
                                  name={"phoneAddress"}
                                />
                                {/* <p>{error && error.message}</p> */}
                              </InputWrap>

                              <InputWrap>
                                <label htmlFor="phoneAddress">Phone</label>
                                <input
                                  id="phoneAddress"
                                  placeholder="Enter Phone"
                                  type="text"
                                  onChange={changeHandler}
                                  onKeyDown={formatInput}
                                  value=""
                                  name={"phoneAddress"}
                                />
                                {/* <p>{error && error.message}</p> */}
                              </InputWrap>
                            
                        </CustomerInputWrap>
                        <CustomerInputWrap>
                              <InputWrap>
                                <label htmlFor="phoneAddress">Phone</label>
                                <input
                                  id="phoneAddress"
                                  placeholder="Enter Phone"
                                  type="text"
                                  onChange={changeHandler}
                                  onKeyDown={formatInput}
                                  value=""
                                  name={"phoneAddress"}
                                />
                                {/* <p>{error && error.message}</p> */}
                              </InputWrap>
                        </CustomerInputWrap>
                      </form>
                    </MasterFormSecBody>
                  </>
                  <MasterFormSecButtonsWrap>
                    <MasterFormSecButtonsLeft>
                      <PosBlackBtn onClick={() => setFilterType("Employee Details")}>Previous</PosBlackBtn>
                      <PosBlackBtn onClick={() => setFilterType("Approval Pending Sales")}>Next</PosBlackBtn>
                    </MasterFormSecButtonsLeft>
                    <MasterFormSecButtonsRight>
                      <PosTransparentBtn>Discard Changes</PosTransparentBtn>
                      <PosBtn>Save</PosBtn>
                    </MasterFormSecButtonsRight>
                  </MasterFormSecButtonsWrap>

                </MasterFormSecWrapper>
                :
                filterType === "Approval Pending Sales" ?
                  <MasterFormSecWrapper>
                    <>
                      <MasterFormSecTop>
                        <h5>Approval Pending Sales</h5>
                        <PosBlackBtn style={{ width: "auto" }}>Export to excel</PosBlackBtn>
                      </MasterFormSecTop>
                      <MasterFormSecBody>
                        <TableContainerWrapper>
                          <TableContainer>
                            <TableContainerHead>
                              <tr>
                                <th>Code</th>
                                <th>Order Date</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Req. Shipment Date</th>
                                <th>Total</th>
                                <th>Action</th>
                              </tr>
                            </TableContainerHead>

                            <TableContainerBody>
                              {/* {customers?.length !== 0 ?
                                                  customers?.map((customer, index) => (
                                                      <tr key={index}>
                                                          <td>{index}</td>
                                                          <td>{customer.name ? customer.name : "NA"}</td>
                                                          <td>{customer.code ? customer.code: "NA"}</td>
                                                          <td>{customer.accName ? customer.accName: "NA" }</td>
                                                          <td>{customer.phone ? customer.phone : "NA"}</td>
                                                          <td>{customer.email ? customer.email : "NA"}</td>
                                                          <td>{customer.code ? customer.code : "NA"}</td>
                                                      </tr>
                                                  )) : <p>No data found</p>} */}
                            </TableContainerBody>
                          </TableContainer>
                        </TableContainerWrapper>

                      </MasterFormSecBody>
                    </>
                    <MasterFormSecButtonsWrap>
                      <MasterFormSecButtonsLeft>
                        <PosBlackBtn onClick={() => setFilterType("Employee Details")}>Previous</PosBlackBtn>
                        {/* <PosBlackBtn onClick={() => setFilterType("Payment History")}>Next</PosBlackBtn> */}
                      </MasterFormSecButtonsLeft>
                      <MasterFormSecButtonsRight>
                        <PosTransparentBtn>Discard Changes</PosTransparentBtn>
                        <PosBtn>Save</PosBtn>
                      </MasterFormSecButtonsRight>
                    </MasterFormSecButtonsWrap>
                  </MasterFormSecWrapper>
                    : <></>
            }
          </MasterFormSec>
        </MasterFormRightSec>
      </MasterFormWrapper>
    </MainInfoWrapper>
  )
}

export default AddEmployee

const CustomerInputWrap = styled.div`
display: flex;
flex-direction: column;
width: 100%;
gap: 10px;

${InputWrap} {
  width: 90%;
}
`