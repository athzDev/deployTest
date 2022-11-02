import React from 'react'
import { useNavigate } from 'react-router-dom';
import HomeOption from 'src/components/udb/home/HomeOption'
import OrderHistory from 'src/components/udb/home/OrderHistory';
import ProductsCard from 'src/components/udb/home/ProductsCard';
import styled from 'styled-components'



type Props = {
  titleSize?: string;
}

const Home = (props: Props) => {
  const navigate = useNavigate();
  return (
    <HomeWrapper>
       <Title>Dashboard</Title>
       <HomeOptionWrap>
          <HomeOption imageId="1" optionImage="addcustomers-icon" optionTitle="Add Customers" onClick={()=> navigate("/customers/add-customer")}/>
          <HomeOption imageId="2"  optionImage="takeaway-icon" optionTitle="Take Away" />
       </HomeOptionWrap>

       <Title titleSize="true">Today's Report</Title>
       <HomeTodaysReport>       
          <HomeOption imageId="1" optionCount="12" optionTitle="Order Confirmed"/>
          <HomeOption imageId="2" optionCount="10" optionTitle="Preparing"/>
          <HomeOption imageId="2" optionCount="7" optionTitle="Ready to Deliver"/>
          <HomeOption imageId="2" optionCount="5" optionTitle="On the Way"/>
          <HomeOption imageId="2" optionCount="30" optionTitle="Completed"/>
          <HomeOption imageId="2" optionCount="5" optionTitle="Cancelled"/>
       </HomeTodaysReport>
       <Title titleSize="true">Trending Products</Title>
       <HomeProductsSec>
          <ProductsCard productId="1" productTitle="Special Chicken Burger" productPrice="KWD 4.9" productDesc="18 Items Sold"/>
          <ProductsCard productId="2" productTitle="Peri Peri Pizza" productPrice="KWD 4.9" productDesc="10 Items Sold"/>
          <ProductsCard productId="3" productTitle="Loaded Chicken Sandwich" productPrice="KWD 4.9" productDesc="14 Items Sold"/>
       </HomeProductsSec>
       {/* order history component */}
       {/* <OrderHistory /> */}
    </HomeWrapper>
  )
}

export default Home

//Styled Components
const HomeWrapper = styled.div`
    
`
const Title = styled.h3<Pick<Props, "titleSize">>`
  font-size: ${(props) => (props.titleSize ? "20px" : "25px")};
  font-weight: 700;
  color: #3C3C3C;
  text-align: left;
`
const HomeOptionWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0px 30px 0px;
`
const HomeTodaysReport = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px 0px 30px 0px;
`
const HomeProductsSec = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px 0px 30px 0px;
`