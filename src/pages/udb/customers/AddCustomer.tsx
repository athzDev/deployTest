import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import UDBHeader from 'src/components/common/UdbHeader'
import { CheckboxWrap, FirstCol, FormFieldWrapper, Header, InputWrap, MainInfoWrapper, MasterFormLeftSec, MasterFormRightSec, MasterFormRightTop, MasterFormSec, MasterFormSecBody, MasterFormSecButtonsLeft, MasterFormSecButtonsRight, MasterFormSecButtonsWrap, MasterFormSecTop, MasterFormSecWrapper, MasterFormWrapper, PosBlackBtn, PosBtn, PosTransparentBtn, SvgIcon, TableContainer, TableContainerBody, TableContainerHead, TableContainerWrapper } from 'src/components/udb/commonStyle'
import MasterFormTab from 'src/components/common/MasterFormTab'
import MasterMainBoxes from 'src/components/common/MasterMainBoxes'
import Input from 'src/components/common/Input'
import { loadMaster, saveCustomers } from 'src/config/api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import { CustomerInputWrap } from './EditCustomer'

type CustomerDetailsProps = {
    partner_Id: string,
    partnerName: string,
    partnerCode2: string,
    partnerCode1: string,
    crAmt: string,
    isCust: boolean,
    isFreezeCust: boolean,
    isSupp: boolean,
    email1: string,
    website: string,
    branchID_FK: string,
    salesInchargeID_FK: string,
    partnerType2_FK: string,
    cityID_FK: string,
    partnerGroup2_FK: string,
    address: string,
    telephone: string,
    whatsappNo: string,
    fax: string,
    billName: string,
    partnerType1_FK: string,
    partnerGroup1_FK: string,
    discountVal: string,
    mobileNo: string,
    contactName: string,
    createCustAcc: string,
    custAccID_FK: string,
    custAccName: string,
    parentCustAccID: string,
    officePhno: string,
    residentialAddress: string,
    resiPhno: string,
    creditLimit: string,
    creditdays: string,
    ddlPricing: string,
    ddlPaymentTerms: string,
    ddlTaxingScheme: string,
    ddlbranch: string,
    ddlstaff: string,
    ddlCarrier: string,
    ddlPaymentMethod: string,
    remarks: string,
    remarks2: string,
    officeadress: string,
    ddlPricelist: string
}

type CustomerAddressProps = {
    customerAddress: CustomerAddress[];
}

type CustomerAddress = {
    address_ID: string,
    customerID_FK: string,
    isResidentail: boolean,
    isOfficial: boolean,
    addressLine1: string,
    addressLine2: string,
    cityID_FK: string,
    street: string,
    phoneNumber: string,
    block: string,
    remarks: string,
    counrty: string,
    logInUserID: string,
    custLocationID_Fk: string,
    flatNo: string,
    locationName: string,
    cityName: string
}

const CustomerAddressDefault: CustomerAddress = {
    address_ID: "1",
    customerID_FK: "2",
    isResidentail: true,
    isOfficial: true,
    addressLine1: "",
    addressLine2: "",
    cityID_FK: "1",
    street: "",
    phoneNumber: "",
    block: "",
    remarks: "",
    counrty: "",
    logInUserID: "",
    custLocationID_Fk: "1",
    flatNo: "",
    locationName: "",
    cityName: ""
}

const defaultState: CustomerDetailsProps = {
    partner_Id: "1",
    partnerName: "",
    partnerCode2: "",
    partnerCode1: "",
    crAmt: "",
    isCust: false,
    isFreezeCust: false,
    isSupp: false,
    email1: "",
    website: "",
    branchID_FK: "",
    salesInchargeID_FK: "1",
    partnerType2_FK: "1",
    cityID_FK: "1",
    partnerGroup2_FK: "1",
    address: "",
    telephone: "",
    whatsappNo: "",
    fax: "",
    billName: "",
    partnerType1_FK: "1",
    partnerGroup1_FK: "1",
    discountVal: "",
    mobileNo: "",
    contactName: "",
    createCustAcc: "",
    custAccID_FK: "1",
    custAccName: "",
    parentCustAccID: "",
    officePhno: "000000",
    residentialAddress: "",
    resiPhno: "000000",
    creditLimit: "",
    creditdays: "",
    ddlPricing: "00",
    ddlPaymentTerms: "0",
    ddlTaxingScheme: "0",
    ddlbranch: "",
    ddlstaff: "0",
    ddlCarrier: "",
    ddlPaymentMethod: "",
    remarks: "",
    remarks2: "",
    officeadress: "",
    ddlPricelist: ""
}

const defaultErrorState = {
    partner_Id: false,
    partnerName: false,
    partnerCode2: false,
    partnerCode1: false,
    crAmt: false,
    isCust: false,
    isFreezeCust: false,
    isSupp: false,
    email1: false,
    website: false,
    branchID_FK: false,
    salesInchargeID_FK: false,
    partnerType2_FK: false,
    cityID_FK: false,
    partnerGroup2_FK: false,
    address: false,
    telephone: false,
    whatsappNo: false,
    fax: false,
    billName: false,
    partnerType1_FK: false,
    partnerGroup1_FK: false,
    discountVal: false,
    mobileNo: false,
    contactName: false,
    createCustAcc: false,
    custAccID_FK: false,
    custAccName: false,
    parentCustAccID: false,
    officePhno: false,
    residentialAddress: false,
    resiPhno: false,
    creditLimit: false,
    creditdays: false,
    ddlPricing: false,
    ddlPaymentTerms: false,
    ddlTaxingScheme: false,
    ddlbranch: false,
    ddlstaff: false,
    ddlCarrier: false,
    ddlPaymentMethod: false,
    remarks: false,
    remarks2: false,
    officeadress: false,
    ddlPricelist: false
}

const tabData = [
    {
        id: 1,
        tabTitle: "Personal Info"
    },
    {
        id: 2,
        tabTitle: "Address Information"
    },
    {
        id: 3,
        tabTitle: "Extra Information"
    },
    {
        id: 4,
        tabTitle: "Account Information"
    },
    {
        id: 5,
        tabTitle: "Remark Labels"
    },
    {
        id: 6,
        tabTitle: "Order History"
    },
    {
        id: 7,
        tabTitle: "Payment History"
    },
    {
        id: 8,
        tabTitle: "Contracts"
    },
]

const AddCustomer = () => {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState("Personal Info")
    const [customerState, setCustomerState] = useState(defaultState);
    const [customerAddressState, setCustomerAddressState] = useState(CustomerAddressDefault)
    const [errorState, setErrorState] = useState(defaultErrorState);
    //masters state
    const [customerType, setCustomerType] = useState([]);
    const [customerGroup, setCustomerGroup] = useState([]);
    const [customerCity, setCustomerCity] = useState([]);
    const [customerLocation, setCustomerLocation] = useState([]);
    const [customerCurrency, setCustomerCurrency] = useState([]);
    const [customerPayment, setCustomerPayment] = useState([]);
    const [carriers, setCarriers] = useState([])
    const [taxingData, setTaxingData] = useState([])
    

    useEffect(() => {
        prefillSelectInputs();
    },[])

    //date handlers
    const [startAt, setStartAt] = useState(new Date(new Date().setHours(0, 0, 0))); //Date
    const [endAt, setEndAt] = useState(new Date(new Date().setHours(23, 59, 59))); //Data
    const date = new Date();
    const minDate = date.setDate(new Date().getDate() - 90);

    //change handler
    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const _elm = e.target;
        const _val = _elm.value;
        const _name = _elm.name;

        setCustomerState(prevProp => ({ ...prevProp, [_name]: _val }));
        setCustomerAddressState(prevProp => ({ ...prevProp, [_name]: _val }))
        setErrorState(prevProp => ({ ...prevProp, [_name]: !_val }));
    }


    const formatInput = (e) => {
        return /\s/g.test(e);
    }

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

    // filling master select inputs
    const prefillSelectInputs = () => {
        loadMaster("2,5,15,6,9,21,25,20").then(res => {
           setCustomerCity(res.data[0].data)
           setCustomerLocation(res.data[1].data)
           setCustomerType(res.data[3].data)
           setCustomerGroup(res.data[4].data)
           setCustomerCurrency(res.data[2].data)
           setCustomerPayment(res.data[7].data)
           setCarriers(res.data[6].data)
           setTaxingData(res.data[5].data)
        }).catch(err => {
            toast.error(err.res.data)
        })
    }



    const submitCustomerDetails = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (errorState.partnerName || errorState.email1 || errorState.crAmt || errorState.mobileNo || errorState.billName || errorState.whatsappNo || errorState.website) {
            console.log("not allowed");
        }
        else {

            let customerInfo = {
                partner: customerState,
                customerAddress: [
                    customerAddressState
                ]
            };

            saveCustomers(customerInfo).then(res => {
                if (res.data.message_status === "Success") {
                    toast.success("Customer Added Succesfully")
                    setTimeout(() => {
                        navigate("/customers/customer-list")
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
        setCustomerState({ ...defaultState })
        setErrorState(defaultErrorState);
    }



    const handleTabChange = (e, title, index) => {
        setFilterType(title)
    }



    return (
        <MainInfoWrapper>
            <Header>
                <FirstCol>
                    <UDBHeader title="Add Customer" />
                </FirstCol>
            </Header>
            <MasterFormWrapper>
                <MasterFormLeftSec>
                    <div>
                        {tabData.map((tab, index) => (
                            <MasterFormTab key={tab.id} onClick={(e) => handleTabChange(e, tab.tabTitle, index)} isActive={tab.tabTitle === filterType} tabTitle={tab.tabTitle} />
                        ))}
                        <ToastContainer />
                    </div>
                </MasterFormLeftSec>
                <MasterFormRightSec>
                    <MasterFormRightTop>
                        <MasterMainBoxes boxTitle="Customer Since" boxCount='2022' boxIcon='CustomerSince' />
                        <MasterMainBoxes boxTitle="Purchases" boxCount='12' boxIcon='PurchasesIcon' />
                        <MasterMainBoxes boxTitle="Amount" boxCount='12.00' boxIcon='AmountIcon' />
                        <MasterMainBoxes boxTitle="Points" boxCount='12212' boxIcon='PointsIcon' />
                    </MasterFormRightTop>
                    <MasterFormSec>
                        {filterType === "Personal Info" ?
                            <MasterFormSecWrapper>
                                <>
                                    <MasterFormSecTop>
                                        <h5>Personal Info</h5>
                                    </MasterFormSecTop>
                                    <MasterFormSecBody>
                                        <form onSubmit={submitCustomerDetails}>
                                          <FormFieldWrapper>
                                            <CustomerInputWrap>

                                                <InputWrap>
                                                    <label htmlFor="code">Code</label>
                                                    <input
                                                        className={errorState.partnerCode1 ? 'error' : ''}
                                                        id="code"
                                                        placeholder="Enter Code"
                                                        type="text"
                                                        // onKeyDown={formatInput}
                                                        value={customerState.partnerCode1}
                                                        onChange={changeHandler}
                                                        name="partnerCode1"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>



                                                <InputWrap>
                                                    <label htmlFor="balance">Balance</label>
                                                    <input
                                                        id="balance"
                                                        placeholder="Enter Balance"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value=""
                                                        name="balance"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>



                                                <InputWrap>
                                                    <label htmlFor="partnerName">Name</label>
                                                    <input
                                                        className={errorState.partnerName ? 'error' : ''}
                                                        id="partnerName"
                                                        placeholder="Enter Name"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.partnerName}
                                                        name="partnerName"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>

                                            </CustomerInputWrap>
                                            <CustomerInputWrap>
                                                <InputWrap>
                                                    <label htmlFor="phone">Phone</label>
                                                    <input
                                                        className={errorState.telephone ? 'error' : ''}
                                                        id="telephone"
                                                        placeholder="Enter Phone No"
                                                        type="number"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.telephone}
                                                        name="telephone"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>


                                                <InputWrap>
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        className={errorState.email1 ? 'error' : ''}
                                                        id="email1"
                                                        placeholder="Enter Email"
                                                        type="email"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.email1}
                                                        name="email1"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>

                                                <InputWrap>
                                                    <label htmlFor="website">Website</label>
                                                    <input
                                                        className={errorState.website ? 'error' : ''}
                                                        id="website"
                                                        placeholder="Enter Website"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.website}
                                                        name="website"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>
                                            </CustomerInputWrap>

                                            <CustomerInputWrap>
                                                <InputWrap>
                                                    <label htmlFor="billName">Bill Name</label>
                                                    <input
                                                        className={errorState.billName ? 'error' : ''}
                                                        id="billName"
                                                        placeholder="Enter Billname"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.billName}
                                                        name="billName"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>

                                                <InputWrap>
                                                    <label htmlFor="partnerType1_FK">Type</label>
                                                    <select id='partnerType1_FK' placeholder='Select Type' onChange={changeHandler} value={customerState.partnerType1_FK} name="partnerType1_FK">
                                                        <option value="">Select Type</option>
                                                        {customerType.map((types) => (
                                                            <option value={types.master_ID}>{types.masterName}</option>
                                                        ))}
                                                    </select>
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>

                                                <InputWrap>
                                                    <label htmlFor="partnerGroup1_FK">Group</label>
                                                    <select id='partnerGroup1_FK' placeholder='Select Group' onChange={changeHandler} value={customerState.partnerGroup1_FK} name="partnerGroup1_FK">
                                                        <option value="">Select Group</option>
                                                        {customerGroup.map((groups) => (
                                                           <option value={groups.master_ID}>{groups.masterName}</option>
                                                        ))}

                                                    </select>
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>

                                            </CustomerInputWrap>
                                            <CustomerInputWrap>

                                                <InputWrap>
                                                    <label htmlFor="crAmt">Credit</label>
                                                    <input
                                                        className={errorState.crAmt ? 'error' : ''}
                                                        id="crAmt"
                                                        placeholder="Enter Credit"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.crAmt}
                                                        name="crAmt"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>



                                                <InputWrap>
                                                    <label htmlFor="whatsappNo">WhatsApp Number</label>
                                                    <input
                                                        className={errorState.whatsappNo ? 'error' : ''}
                                                        id="whatsappNo"
                                                        placeholder="Enter W/A Number"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.whatsappNo}
                                                        name="whatsappNo"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>


                                                <InputWrap>
                                                    <label htmlFor="fax">Fax</label>
                                                    <input
                                                        className={errorState.fax ? 'error' : ''}
                                                        id="fax"
                                                        placeholder="Enter Fax"
                                                        type="text"
                                                        onChange={changeHandler}
                                                        onKeyDown={formatInput}
                                                        value={customerState.fax}
                                                        name="fax"
                                                    />
                                                    {/* <p>{error && error.message}</p> */}
                                                </InputWrap>

                                            </CustomerInputWrap>
                                            </FormFieldWrapper>
                                            <MasterFormSecButtonsWrap>
                                                <MasterFormSecButtonsLeft>
                                                    <PosBlackBtn onClick={(event) => { event.preventDefault(); setFilterType("Address Information")}}>Next</PosBlackBtn>
                                                </MasterFormSecButtonsLeft>
                                                <MasterFormSecButtonsRight>
                                                    <PosTransparentBtn onClick={resetCustomerDetail}>Discard Changes</PosTransparentBtn>
                                                    <PosBtn type="submit">Save</PosBtn>
                                                </MasterFormSecButtonsRight>
                                            </MasterFormSecButtonsWrap>
                                        </form>
                                    </MasterFormSecBody>
                                </>



                            </MasterFormSecWrapper> :
                            filterType === "Address Information" ?
                                <MasterFormSecWrapper>
                                    <>
                                        <MasterFormSecTop>
                                            <h5>Address Information</h5>
                                        </MasterFormSecTop>
                                        <MasterFormSecBody>
                                            <form onSubmit={submitCustomerDetails}>
                                            <FormFieldWrapper>
                                                <CustomerInputWrap>
                                                    <InputWrap>
                                                        <label htmlFor="cityName">City</label>
                                                        <select id='cityName' placeholder='Select City' onChange={changeHandler} value={customerAddressState.cityName} name="cityName">
                                                            <option value="">Select City</option>
                                                            {customerCity.map((city) => (
                                                                <option value={city.master_ID}>{city.masterName}</option>
                                                            ))}
                                                           
                                                        </select>
                                                        {/* <p>{error && error.message}</p> */}
                                                    </InputWrap>



                                                    <InputWrap>
                                                        <label htmlFor="locationName">Area/Location</label>
                                                        <select id='locationName' placeholder='Select Area' onChange={changeHandler} value={customerAddressState.locationName} name="locationName">
                                                            <option value="">Select Area</option>
                                                            {customerLocation.map((location) => (
                                                                 <option value={location.master_ID}>{location.masterName}</option>
                                                            ))}
                                                        </select>
                                                        {/* <p>{error && error.message}</p> */}
                                                    </InputWrap>



                                                    <InputWrap>
                                                        <label htmlFor="type">Block</label>
                                                        <input
                                                            id="block"
                                                            placeholder="Enter block"
                                                            type="text"
                                                            onChange={changeHandler}
                                                            onKeyDown={formatInput}
                                                            value={customerAddressState.block}
                                                            name={"block"}
                                                        />
                                                        {/* <p>{error && error.message}</p> */}
                                                    </InputWrap>

                                                </CustomerInputWrap>
                                                <CustomerInputWrap>

                                                    <InputWrap>
                                                        <label htmlFor="type">Street</label>
                                                        <input
                                                            id="street"
                                                            placeholder="Enter Street"
                                                            type="text"
                                                            onChange={changeHandler}
                                                            onKeyDown={formatInput}
                                                            value={customerAddressState.street}
                                                            name={"street"}
                                                        />
                                                        {/* <p>{error && error.message}</p> */}
                                                    </InputWrap>



                                                    <InputWrap>
                                                        <label htmlFor="flatNo">Building</label>
                                                        <input
                                                            id="flatNo"
                                                            placeholder="Enter Building"
                                                            type="text"
                                                            onChange={changeHandler}
                                                            onKeyDown={formatInput}
                                                            value={customerAddressState.flatNo}
                                                            name={"flatNo"}
                                                        />
                                                        {/* <p>{error && error.message}</p> */}
                                                    </InputWrap>



                                                    <InputWrap>
                                                        <label htmlFor="phoneNumber">Phone</label>
                                                        <input
                                                            id="phoneNumber"
                                                            placeholder="Enter Phone"
                                                            type="text"
                                                            onChange={changeHandler}
                                                            onKeyDown={formatInput}
                                                            value={customerAddressState.phoneNumber}
                                                            name={"phoneNumber"}
                                                        />
                                                        {/* <p>{error && error.message}</p> */}
                                                    </InputWrap>

                                                </CustomerInputWrap>
                                                </FormFieldWrapper>
                                                <MasterFormSecButtonsWrap>
                                                    <MasterFormSecButtonsLeft>
                                                        <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Personal Info")}}>Previous</PosBlackBtn>
                                                        <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Extra Information")}}>Next</PosBlackBtn>
                                                    </MasterFormSecButtonsLeft>
                                                    <MasterFormSecButtonsRight>
                                                        <PosTransparentBtn onClick={resetCustomerDetail}>Discard Changes</PosTransparentBtn>
                                                        <PosBtn>Save</PosBtn>
                                                    </MasterFormSecButtonsRight>
                                                </MasterFormSecButtonsWrap>
                                            </form>
                                        </MasterFormSecBody>
                                    </>


                                </MasterFormSecWrapper>
                                :
                                filterType === "Extra Information" ?
                                    <MasterFormSecWrapper>
                                        <>
                                            <MasterFormSecTop>
                                                <h5>Extra Information</h5>
                                            </MasterFormSecTop>
                                            <MasterFormSecBody>
                                                <form onSubmit={submitCustomerDetails}>
                                                <FormFieldWrapper>
                                                    <CustomerInputWrap>
                                                        {/* 
                                                        <InputWrap>
                                                            <label htmlFor="currency">Currency</label>
                                                            <select id='currency' placeholder='Select Currency' onChange={changeHandler} value="" name={"currency"}>
                                                                <option value="">Select Currency</option>
                                                                {customerCurrency.map((currency) => (
                                                                   <option value={currency.master_ID}>{currency.masterName}</option>
                                                                ))}
                                                            </select>
                                                        </InputWrap> */}



                                                        <InputWrap>
                                                            <label htmlFor="ddlPaymentTerms">Payment</label>
                                                            <select id='ddlPaymentTerms' placeholder='Select Payment' onChange={changeHandler} value={customerState.ddlPaymentTerms} name={"ddlPaymentTerms"}>
                                                                <option value="">Select Payment</option>
                                                                {customerPayment.map((payment) => (
                                                                   <option value={payment.master_ID}>{payment.masterName}</option>
                                                                ))}
                                                            </select>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>



                                                        <InputWrap>
                                                            <label htmlFor="ddlTaxingScheme">Taxing</label>
                                                            <select id='ddlTaxingScheme' placeholder='Select Taxing' onChange={changeHandler} value={customerState.ddlTaxingScheme} name={"ddlTaxingScheme"}>
                                                                <option value="">Select Taxing</option>
                                                                {taxingData.map((taxing) => (
                                                                   <option value={taxing.master_ID}>{taxing.masterName}</option>
                                                                ))}
                                                            </select>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>

                                                        <InputWrap>
                                                            <label htmlFor="discount">Discount %</label>
                                                            <input
                                                                id="discount"
                                                                placeholder="Enter Discount"
                                                                type="text"
                                                                onChange={changeHandler}
                                                                onKeyDown={formatInput}
                                                                value={customerState.discountVal}
                                                                name={"discountVal"}
                                                            />
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>

                                                    </CustomerInputWrap>
                                                    <CustomerInputWrap>

                                                        <InputWrap>
                                                            <label htmlFor="ddlbranch">Branch</label>
                                                            <select id='ddlbranch' placeholder='Select Branch' onChange={changeHandler} value={customerState.ddlbranch} name={"ddlbranch"}>
                                                                <option value="">Select Branch</option>
                                                                <option value="0">Dubai</option>
                                                                <option value="1">Kuwait</option>
                                                            </select>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>



                                                        <InputWrap>
                                                            <label htmlFor="salesInchargeID_FK">Default Sales Rep</label>
                                                            <select id='salesInchargeID_FK' placeholder='Default Sales Rep' onChange={changeHandler} value={customerState.salesInchargeID_FK} name={"salesInchargeID_FK"}>
                                                                <option value="">Default Sales Rep</option>
                                                                <option value="0">0 - 1</option>
                                                                <option value="1">1 - 100</option>
                                                            </select>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>



                                                        <InputWrap>
                                                            <label htmlFor="ddlCarrier">Carrier</label>
                                                            <select id='ddlCarrier' placeholder='Carrier' onChange={changeHandler} value={customerState.ddlCarrier} name={"ddlCarrier"}>
                                                                <option value="">Select Carrier</option>
                                                                {carriers.map((carrier) => (
                                                                   <option value={carrier.master_ID}>{carrier.masterName}</option>
                                                                ))}
                                                            </select>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>

                                                    </CustomerInputWrap>
                                                    <CustomerInputWrap>

                                                        <InputWrap>
                                                            <label htmlFor="customerCategory">Customer Category</label>
                                                            <select id='customerCategory' placeholder='Customer Category' onChange={changeHandler} value="" name={"customerCategory"}>
                                                                <option value="">Select Customer</option>
                                                                <option value="0">0 - 1</option>
                                                                <option value="1">1 - 100</option>
                                                            </select>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>



                                                      

                                                    </CustomerInputWrap>
                                                    <CustomerInputWrap>
                                                        <InputWrap>
                                                            <CheckboxWrap>
                                                                <input
                                                                    type="checkbox"
                                                                    id="byValue"
                                                                    placeholder=""
                                                                    onChange={changeHandler}
                                                                    value=""
                                                                    name={"byValue"}
                                                                />
                                                                <label htmlFor="byValue" style={{ marginLeft: "5px", fontWeight: "500" }}> By Value</label>
                                                            </CheckboxWrap>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>


                                                        <InputWrap>
                                                            <CheckboxWrap>
                                                                <input
                                                                    type="checkbox"
                                                                    id="byPercentage"
                                                                    placeholder=""
                                                                    onChange={changeHandler}
                                                                    value=""
                                                                    name={"byPercentage"}
                                                                />
                                                                <label htmlFor="byPercentage" style={{ marginLeft: "5px", fontWeight: "500" }}> By %</label>
                                                            </CheckboxWrap>
                                                            {/* <p>{error && error.message}</p> */}
                                                        </InputWrap>

                                                    </CustomerInputWrap>
                                                    </FormFieldWrapper>
                                                    <MasterFormSecButtonsWrap>
                                                        <MasterFormSecButtonsLeft>
                                                            <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Address Information")}}>Previous</PosBlackBtn>
                                                            <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Account Information")}}>Next</PosBlackBtn>
                                                        </MasterFormSecButtonsLeft>
                                                        <MasterFormSecButtonsRight>
                                                            <PosTransparentBtn onClick={resetCustomerDetail}>Discard Changes</PosTransparentBtn>
                                                            <PosBtn>Save</PosBtn>
                                                        </MasterFormSecButtonsRight>
                                                    </MasterFormSecButtonsWrap>
                                                </form>
                                            </MasterFormSecBody>
                                        </>

                                    </MasterFormSecWrapper>
                                    :
                                    filterType === "Account Information" ?
                                        <MasterFormSecWrapper>
                                            <>
                                                <MasterFormSecTop>
                                                    <h5>Account Information</h5>
                                                </MasterFormSecTop>
                                                <MasterFormSecBody>
                                                    <form onSubmit={submitCustomerDetails}>
                                                    <FormFieldWrapper>
                                                        <CustomerInputWrap>
                                                            <InputWrap>
                                                                <label htmlFor="createCustAcc">Create A/c</label>
                                                                <select id='createCustAcc' placeholder='Select Create A/c' onChange={changeHandler} value={customerState.createCustAcc} name={"createCustAcc"}>
                                                                    <option value="">Select Create A/c</option>
                                                                    <option value="0">0 - 1</option>
                                                                    <option value="1">1 - 100</option>
                                                                </select>
                                                                {/* <p>{error && error.message}</p> */}
                                                            </InputWrap>



                                                            <InputWrap>
                                                                <label htmlFor="partnerCode2">A/c code</label>
                                                                <select id='partnerCode2' placeholder='Select A/c code' onChange={changeHandler} value={customerState.partnerCode2} name={"partnerCode2"}>
                                                                    <option value="">Select A/c code</option>
                                                                    <option value="0">0 - 1</option>
                                                                    <option value="1">1 - 100</option>
                                                                </select>
                                                                {/* <p>{error && error.message}</p> */}
                                                            </InputWrap>


                                                            <InputWrap>
                                                                <label htmlFor="partnerType2_FK">A/c Type</label>
                                                                <select id='partnerType2_FK' placeholder='Select A/c code' onChange={changeHandler} value={customerState.partnerType2_FK} name={"partnerType2_FK"}>
                                                                    <option value="">Select A/c code</option>
                                                                    <option value="0">0 - 1</option>
                                                                    <option value="1">1 - 100</option>
                                                                </select>
                                                                {/* <p>{error && error.message}</p> */}
                                                            </InputWrap>

                                                        </CustomerInputWrap>

                                                        <CustomerInputWrap>

                                                            <InputWrap>
                                                                <label htmlFor="custAccName">A/c Name</label>
                                                                <input
                                                                    id="custAccName"
                                                                    placeholder="Enter Name"
                                                                    type="text"
                                                                    onChange={changeHandler}
                                                                    onKeyDown={formatInput}
                                                                    value={customerState.custAccName}
                                                                    name={"custAccName"}
                                                                />
                                                                {/* <p>{error && error.message}</p> */}
                                                            </InputWrap>



                                                            <InputWrap>
                                                                <label htmlFor="parentCustAccID">A/c Parent</label>
                                                                <input
                                                                    id="parentCustAccID"
                                                                    placeholder="Enter Parent"
                                                                    type="text"
                                                                    onChange={changeHandler}
                                                                    onKeyDown={formatInput}
                                                                    value={customerState.parentCustAccID}
                                                                    name={"parentCustAccID"}
                                                                />
                                                                {/* <p>{error && error.message}</p> */}
                                                            </InputWrap>

                                                        </CustomerInputWrap>
                                                        </FormFieldWrapper>
                                                        <MasterFormSecButtonsWrap>
                                                            <MasterFormSecButtonsLeft>
                                                                <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Extra Information")}}>Previous</PosBlackBtn>
                                                                <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Remark Labels")}}>Next</PosBlackBtn>
                                                            </MasterFormSecButtonsLeft>
                                                            <MasterFormSecButtonsRight>
                                                                <PosTransparentBtn onClick={resetCustomerDetail}>Discard Changes</PosTransparentBtn>
                                                                <PosBtn>Save</PosBtn>
                                                            </MasterFormSecButtonsRight>
                                                        </MasterFormSecButtonsWrap>
                                                    </form>
                                                </MasterFormSecBody>
                                            </>

                                        </MasterFormSecWrapper>
                                        :
                                        filterType === "Remark Labels" ?
                                            <MasterFormSecWrapper>
                                                <>
                                                    <MasterFormSecTop>
                                                        <h5>Remark Labels</h5>
                                                    </MasterFormSecTop>
                                                    <MasterFormSecBody>
                                                        <form onSubmit={submitCustomerDetails}>
                                                        <FormFieldWrapper>
                                                            <CustomerInputWrap>
                                                                <InputWrap style={{ width: "95%" }}>
                                                                    <label htmlFor="remarks">Remark 1</label>
                                                                    <textarea
                                                                        rows={4}
                                                                        cols={5}
                                                                        id="remarks"
                                                                        placeholder="Type here"
                                                                        onChange={(e) => setCustomerState(prevProp => ({ ...prevProp, remarks: e.target.value }))}
                                                                        value={customerState.remarks}
                                                                        name={"remarks"}
                                                                    />
                                                                    {/* <p>{error && error.message}</p> */}
                                                                </InputWrap>
                                                            </CustomerInputWrap>
                                                            <CustomerInputWrap>
                                                                <InputWrap style={{ width: "95%" }}>
                                                                    <label htmlFor="remark2">Remark 2</label>
                                                                    <textarea
                                                                        rows={4}
                                                                        cols={50}
                                                                        id="remark2"
                                                                        placeholder="Type here"
                                                                        onChange={(e) => setCustomerState(prevProp => ({ ...prevProp, remarks2: e.target.value }))}
                                                                        value={customerState.remarks2}
                                                                        name={"remark2"}
                                                                    />
                                                                    {/* <p>{error && error.message}</p> */}
                                                                </InputWrap>

                                                            </CustomerInputWrap>
                                                            </FormFieldWrapper>
                                                            <MasterFormSecButtonsWrap>
                                                                <MasterFormSecButtonsLeft>
                                                                    <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Account Information")}}>Previous</PosBlackBtn>
                                                                    <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Order History")}}>Next</PosBlackBtn>
                                                                </MasterFormSecButtonsLeft>
                                                                <MasterFormSecButtonsRight>
                                                                    <PosTransparentBtn>Discard Changes</PosTransparentBtn>
                                                                    <PosBtn>Save</PosBtn>
                                                                </MasterFormSecButtonsRight>
                                                            </MasterFormSecButtonsWrap>
                                                        </form>
                                                    </MasterFormSecBody>
                                                </>

                                            </MasterFormSecWrapper>
                                            :
                                            filterType === "Order History" ?
                                                <MasterFormSecWrapper>
                                                    <>
                                                        <MasterFormSecTop>
                                                            <h5>Order History</h5>
                                                            <PosBlackBtn style={{ width: "auto" }}>Export to excel</PosBlackBtn>
                                                        </MasterFormSecTop>
                                                        <MasterFormSecBody>
                                                            <TableContainer>
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

                                                        </MasterFormSecBody>
                                                    </>
                                                    <MasterFormSecButtonsWrap>
                                                        <MasterFormSecButtonsLeft>
                                                            <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Remark Labels")}}>Previous</PosBlackBtn>
                                                            <PosBlackBtn onClick={(event) => {event.preventDefault();setFilterType("Payment History")}}>Next</PosBlackBtn>
                                                        </MasterFormSecButtonsLeft>
                                                        <MasterFormSecButtonsRight>
                                                            <PosTransparentBtn>Discard Changes</PosTransparentBtn>
                                                            <PosBtn>Save</PosBtn>
                                                        </MasterFormSecButtonsRight>
                                                    </MasterFormSecButtonsWrap>
                                                </MasterFormSecWrapper>
                                                :
                                                filterType === "Payment History" ?
                                                    <MasterFormSecWrapper>
                                                        <>
                                                            <MasterFormSecTop>
                                                                <h5>Payment History</h5>
                                                                <PosBlackBtn style={{ width: "auto" }}>Export to excel</PosBlackBtn>
                                                            </MasterFormSecTop>
                                                            <MasterFormSecBody>
                                                                <TableContainer>
                                                                    <TableContainerHead>
                                                                        <tr>
                                                                            <th>Date</th>
                                                                            <th>Due Date</th>
                                                                            <th>Transaction</th>
                                                                            <th>Amount</th>
                                                                            <th>Credit Bal</th>
                                                                            <th>Paid</th>
                                                                            <th>Balance</th>
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

                                                            </MasterFormSecBody>
                                                        </>
                                                        <MasterFormSecButtonsWrap>
                                                            <MasterFormSecButtonsLeft>
                                                                <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Order History")}}>Previous</PosBlackBtn>
                                                                <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Contracts")}}>Next</PosBlackBtn>
                                                            </MasterFormSecButtonsLeft>
                                                            <MasterFormSecButtonsRight>
                                                                <PosTransparentBtn>Discard Changes</PosTransparentBtn>
                                                                <PosBtn>Save</PosBtn>
                                                            </MasterFormSecButtonsRight>
                                                        </MasterFormSecButtonsWrap>
                                                    </MasterFormSecWrapper>
                                                    :
                                                    filterType === "Contracts" ?
                                                        <MasterFormSecWrapper>
                                                            <>
                                                                <MasterFormSecTop>
                                                                    <h5>Contracts</h5>
                                                                    <PosBlackBtn style={{ width: "auto" }} onClick={() => setFilterType("Add New Record")}>+ Add New Record</PosBlackBtn>
                                                                </MasterFormSecTop>
                                                                <MasterFormSecBody>
                                                                    <TableContainer>
                                                                        <TableContainerHead>
                                                                            <tr>
                                                                                <th>Valid From</th>
                                                                                <th>Valid To</th>
                                                                                <th>Remarks</th>
                                                                                <th>Attach</th>
                                                                                <th>Att. Name</th>
                                                                                <th>Paid</th>
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
                                                                    <ActionsWrap>
                                                                        <SvgIcon onClick={() => handleOpen(customer.partner_Id)}>
                                                                        <ViewIcon />
                                                                        </SvgIcon>
                                                                        <SvgIcon>
                                                                        <EditIcon />
                                                                        </SvgIcon>
                                                                    </ActionsWrap>
                                                                </tr>
                                                            )) : <p>No data found</p>} */}
                                                                        </TableContainerBody>
                                                                    </TableContainer>

                                                                </MasterFormSecBody>
                                                            </>
                                                            <MasterFormSecButtonsWrap>
                                                                <MasterFormSecButtonsLeft>
                                                                    <PosBlackBtn onClick={(event) => {event.preventDefault(); setFilterType("Payment History")}}>Previous</PosBlackBtn>
                                                                </MasterFormSecButtonsLeft>
                                                                <MasterFormSecButtonsRight>
                                                                    <PosTransparentBtn>Discard Changes</PosTransparentBtn>
                                                                    <PosBtn>Save</PosBtn>
                                                                </MasterFormSecButtonsRight>
                                                            </MasterFormSecButtonsWrap>
                                                        </MasterFormSecWrapper>
                                                        : filterType === "Add New Record" ?
                                                            <MasterFormSecWrapper>
                                                                <>
                                                                    <MasterFormSecTop>
                                                                        <h5>+ Add New Record</h5>
                                                                    </MasterFormSecTop>
                                                                    <MasterFormSecBody>
                                                                        {/* <form>
                                                        <CustomerInputWrap>
                                                                    <InputWrap>
                                                                        <label htmlFor="createAc">Valid From</label>
                                                                        <DatePicker
                                                                            selected={startAt}
                                                                            onChange={handlefromDateChange}
                                                                            onChangeRaw={handleDateChangeRaw}
                                                                            minDate={minDate}
                                                                            maxDate={new Date()}
                                                                            placeholderText="From"
                                                                        />
                                                                         <p>{error && error.message}</p> 
                                                                    </InputWrap>
                                                               
                                                                    <InputWrap>
                                                                        <label htmlFor="AcCode">Valid To</label>
                                                                        <DatePicker
                                                                            selected={endAt}
                                                                            onChange={handletoDateChange}
                                                                            onChangeRaw={handleDateChangeRaw}
                                                                            minDate={minDate}
                                                                            maxDate={new Date()}
                                                                            placeholderText="To"
                                                                        />
                                                                     <p>{error && error.message}</p> 
                                                                    </InputWrap>
                                                                )}
                                                            />
        
                                                        </CustomerInputWrap>
                                                      
                                                        <CustomerInputWrap>
                                                                <InputWrap>
                                                                    <label htmlFor="attachFile">A/c Name</label>
                                                                    <Input
                                                                        id="attachFile"
                                                                        placeholder="Enter Name"
                                                                        type="text"
                                                                        onChange={onChange}
                                                                        onKeyDown={formatInput}
                                                                        value={value}
                                                                        error={error}
                                                                        req={true}
                                                                        name={"attachFile"}
                                                                    />
                                                                     <p>{error && error.message}</p> 
                                                                </InputWrap>
        
                                                                <InputWrap>
                                                                    <label htmlFor="attachmentName">A/c Parent</label>
                                                                    <Input
                                                                        id="attachmentName"
                                                                        placeholder="Enter Parent"
                                                                        type="text"
                                                                        onChange={onChange}
                                                                        onKeyDown={formatInput}
                                                                        value={value}
                                                                        error={error}
                                                                        req={true}
                                                                        name={"attachmentName"}
                                                                    />
                                                                     <p>{error && error.message}</p> 
                                                                </InputWrap>
                                                    
                                                        </CustomerInputWrap>
                                                        <CustomerInputWrap>
                                                    
                                                                <InputWrap style={{width:"70%"}}>
                                                                       <label htmlFor="remark1">Remarks</label>
                                                                        <textarea 
                                                                            rows={4}
                                                                            cols={5}
                                                                            id="remarks"
                                                                            placeholder="Type here"
                                                                            onChange={onChange}
                                                                            value={value}                                             
                                                                            name={"remarks"}
                                                                        />
                                                                 <p>{error && error.message}</p> 
                                                                </InputWrap>
                                                        
                                                        </CustomerInputWrap>
                                                    </form> */}

                                                                    </MasterFormSecBody>
                                                                </>
                                                                <MasterFormSecButtonsWrap>
                                                                    <MasterFormSecButtonsLeft>
                                                                        <PosBlackBtn>Previous</PosBlackBtn>
                                                                        <PosBlackBtn>Next</PosBlackBtn>
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


export default AddCustomer;