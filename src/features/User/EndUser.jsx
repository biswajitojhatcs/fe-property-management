import React, { useState, useMemo } from "react";
import "./EndUser.css";
import { STATE_CITY_DATA, INITIAL_PROPERTIES } from "../../data/propertyData";


export default function EndUser() {
    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("Odisha");
    const [selectedCity, setSelectedCity] = useState("Bhubaneswar");
    const [propertyType, setPropertyType] = useState("All");
    const [bedsFilter, setBedsFilter] = useState("Any");

    // Available cities based on selected state
    const availableCities = useMemo(() => {
        if (!selectedState || selectedState === "All") {
            return Object.values(STATE_CITY_DATA).flat();
        }
        return STATE_CITY_DATA[selectedState] || [];
    }, [selectedState]);

    // Handle state selection change
    const handleStateChange = (e) => {
        const newState = e.target.value;
        setSelectedState(newState);
        if (newState === "All") {
            setSelectedCity("All");
        } else {
            const cities = STATE_CITY_DATA[newState] || [];
            setSelectedCity(cities[0] || "All");
        }
    };

    // Filter properties based on search and selected options
    const filteredProperties = useMemo(() => {
        return INITIAL_PROPERTIES.filter((prop) => {
            // Search query filter
            const matchesSearch =
                searchTerm === "" ||
                prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prop.type.toLowerCase().includes(searchTerm.toLowerCase());

            // State filter
            const matchesState =
                selectedState === "All" || prop.state === selectedState;

            // City filter
            const matchesCity =
                selectedCity === "All" || prop.city === selectedCity;

            // Property type filter
            const matchesType =
                propertyType === "All" || prop.type === propertyType;

            // Beds filter
            const matchesBeds =
                bedsFilter === "Any" || prop.beds >= parseInt(bedsFilter, 10);

            return matchesSearch && matchesState && matchesCity && matchesType && matchesBeds;
        });
    }, [searchTerm, selectedState, selectedCity, propertyType, bedsFilter]);


    return (
        <div className="enduser-container">
            <header className="enduser-header">
                <div className="header-search-group">
                    <div className="filter-select-wrapper header-select">
                        <select
                            className="filter-select"
                            value={selectedState}
                            onChange={handleStateChange}
                        >
                            <option value="All">All States</option>
                            {Object.keys(STATE_CITY_DATA).map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="filter-select-wrapper header-select">
                        <select
                            className="filter-select"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            <option value="All">All Cities</option>
                            {availableCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* 3. Search Bar */}
                    <div className="search-bar-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for apartments, houses, villas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Right Nav Links & Profile */}
                <div className="header-right">
                    <button className="user-profile-btn" type="button" aria-label="User menu">
                        <div className="profile-avatar">
                            <svg viewBox="0 0 24 24" fill="#64748b" width="18" height="18">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <svg className="profile-chevron" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Filters Bar: Price, Type, Beds & Action Search */}
            <div className="filters-bar">
                <div className="filters-left">

                    {/* 3. Price Range Dropdown */}
                    <div className="filter-select-wrapper">
                        <select className="filter-select" defaultValue="Price Range">
                            <option value="Price Range">Price Range</option>
                            <option value="0-10000">₹0 - ₹10,000</option>
                            <option value="10001-25000">₹10,001 - ₹25,000</option>
                            <option value="25001-50000">₹25,001 - ₹50,000</option>
                        </select>
                        <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* 4. Property Type Dropdown */}
                    <div className="filter-select-wrapper">
                        <select
                            className="filter-select"
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                        >
                            <option value="All">Property Type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="House">House</option>
                        </select>
                        <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* 5. Beds & Baths Dropdown */}
                    <div className="filter-select-wrapper">
                        <select
                            className="filter-select"
                            value={bedsFilter}
                            onChange={(e) => setBedsFilter(e.target.value)}
                        >
                            <option value="Any">Beds & Baths</option>
                            <option value="2">2 Bhk</option>
                            <option value="3">3 Bhk</option>
                            <option value="4">4 Bhk</option>
                        </select>
                        <svg className="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Listings Content */}
            <main className="enduser-content">
                <div className="cards-grid">
                    {filteredProperties.length === 0 ? (
                        <div className="no-results">
                            <h3>No properties found matching your criteria.</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        filteredProperties.map((prop) => (
                            <div className="property-card" key={prop.id}>
                                {/* Image Container with Badges & Save Action */}
                                <div className="card-image-container">
                                    <img src={prop.image} alt={prop.title} className="card-img" />
                                </div>

                                {/* Property Details */}
                                <div className="card-info">
                                    <div className="card-title-row">
                                        <h3 className="card-title" title={prop.title}>{prop.title}</h3>
                                        <span className="card-price-inr">{prop.priceInr}</span>
                                    </div>

                                    <div className="card-location">
                                        <div className="location-text-group">
                                            <svg className="location-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                            </svg>
                                            <span>{prop.location}</span>
                                        </div>
                                        <button className="book-btn" type="button">Book Now</button>
                                    </div>

                                    {/* Specs Row */}
                                    <div className="card-specs">
                                        <div className="spec-item">
                                            <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 7h18M3 17h18M3 7v10M21 7v10M7 7v4M17 7v4" />
                                                <rect x="7" y="11" width="10" height="6" rx="1" />
                                            </svg>
                                            <span>{prop.beds} Beds</span>
                                        </div>

                                        <div className="spec-item">
                                            <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 6h6M7 10h10M4 14h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" />
                                                <path d="M6 14V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v9" />
                                            </svg>
                                            <span>{prop.baths} Baths</span>
                                        </div>

                                        <div className="spec-item">
                                            <svg className="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 21h18M3 7v14M21 7v14M7 21V11M17 21V11M12 21V15" />
                                                <path d="M3 7l9-4 9 4" />
                                            </svg>
                                            <span>{prop.sqft} sqft</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="pagination-wrapper">
                    <button className="btn-pagination" type="button" aria-label="Previous page">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.84 10l3.93 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>Pagination</span>
                    <button className="btn-pagination" type="button" aria-label="Next page">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.16 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    );
}
