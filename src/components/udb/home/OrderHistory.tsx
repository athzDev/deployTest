import React from 'react'
import styled from "styled-components"
import { PosBtn } from '../commonStyle'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrderHistoryCard from './OrderHistoryCard';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const OrderHistory = () => {
 
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
  return (
    <OrderHistoryWrap>
        <OrderHistoryTop>
            <h4>Order History</h4>
            <PosBtn>View all</PosBtn>
        </OrderHistoryTop>
           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Yesterday" {...a11yProps(0)} />
                <Tab label="Today" {...a11yProps(1)} />
                <Tab label="Week" {...a11yProps(2)} />
                <Tab label="Month" {...a11yProps(2)} />
                <Tab label="Year" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                 <OrderHistoryCard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                 <OrderHistoryCard />
                 <OrderHistoryCard />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderHistoryCard />
                <OrderHistoryCard />
                <OrderHistoryCard />
            </TabPanel>
            <TabPanel value={value} index={3}>
               <OrderHistoryCard />
               <OrderHistoryCard />
               <OrderHistoryCard />
               <OrderHistoryCard />
            </TabPanel>
            <TabPanel value={value} index={4}>
               <OrderHistoryCard />
               <OrderHistoryCard />
               <OrderHistoryCard />
               <OrderHistoryCard />
               <OrderHistoryCard />
            </TabPanel>
    </OrderHistoryWrap>
  )
}

export default OrderHistory

const OrderHistoryWrap = styled.div`
    border: 4px solid var(--unnamed-color-ffffff);
    background: transparent linear-gradient(180deg, #fb00002c 0%, #e6e1e137 100%) 0% 0% no-repeat padding-box;    
    box-shadow: 0px 3px 6px #FB000054;
    border: 4px solid #FFFFFF;
    border-radius: 10px;
    opacity: 1;
    width: 60%;
    padding: 10px;

.css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
  color: #17151481;
  font-weight: 600;
  font-size: 0.775rem;
  line-height: 1.25;
  text-transform: capitalize;
  font-family: "Inter";
}

.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #3C3C3C;
    border-bottom: 3px solid #FB2601 !important;
    font-weight: 700;
}

.css-1aquho2-MuiTabs-indicator {
    background-color: none;
    display: none;
}

& h4{
  color: #3C3C3C;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.25;
  text-transform: capitalize;
}
`
const OrderHistoryTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 5px 10px;
`