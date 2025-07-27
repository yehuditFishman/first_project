import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import TicketSearch from "./components/TicketSearch";
import AvailableTickets from "./components/AvailableTickets";
import PurchaseTicket from "./components/PurchaseTicket";
import Payment from "./components/Payment";
import Register from "./components/Register";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShowUserDetailes from './components/ShowUserDetailes'
import Finish from "./components/Finish";
import PersonalAreaLogin from "./components/PersonalAreaLogin";
import ManagerPanel from "./components/ManagerPanel";
import FlightsList from "./components/FlightsList";
import AddFlight from "./components/AddFlight";
import FlightAddedSuccess from "./components/FlightAddedSuccess";
import ManagerBookings from "./components/ManagerBookings";
import UpdateFlight from "./components/UpdateFlight";
import MyTickets from "./components/MyTickets";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<TicketSearch />} />
        <Route path="/flight/:id" element={<AvailableTickets />} />
        <Route path="/purchase/:id" element={<PurchaseTicket />} />
          <Route path="/payment" element={<Payment />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/personal-area-login" element={<PersonalAreaLogin />} />
        <Route path="/manager-panel" element={<ManagerPanel />} />
        <Route path="/flights-list" element={<FlightsList />} />
        <Route path="/add-flight" element={<AddFlight />} />
        <Route path="/add-flight-success" element={<FlightAddedSuccess />} />
        <Route path="/manager-bookings/:id" element={<ManagerBookings />} />
        <Route path="/update-flight/:id" element={<UpdateFlight />} />
        <Route path="/my-tickets/:id" element={<MyTickets />} />
      </Routes>
    </Router>
  );
}

export default App;
