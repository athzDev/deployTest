import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from 'src/components/udb';
import LoginPage from '../pages/Auth/Login';
import Home from '../pages/udb/Home';
import PageNotFound from '../pages/PageNotFound';
import CustomerList from 'src/pages/udb/customers/CustomerList';
import ProtectedRoute from './protectedRoute';
import EmployeeList from 'src/pages/udb/employees/EmployeeList';
import AddCustomer from 'src/pages/udb/customers/AddCustomer';
import AddEmployee from 'src/pages/udb/employees/AddEmployee';
import EditCustomer from 'src/pages/udb/customers/EditCustomer';
import EditEmployee from 'src/pages/udb/employees/EditEmployee';


export default function PageRouter() {
    return (
        <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="customers">
                    <Route path="customer-list" element={<CustomerList />} />
                    <Route path="add-customer" element={<AddCustomer />} />
                    <Route path="customer-list/edit-customer/:id" element={<EditCustomer />} />
                </Route>
                <Route path="employees">
                    <Route path="employees-list" element={<EmployeeList />} />
                    <Route path="add-employee" element={<AddEmployee />} />
                    <Route path="employees-list/edit-employee/:id" element={<EditEmployee />} />
                </Route>
            </Route>  
             <Route path="/login" element={<LoginPage />} /> 
             <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}