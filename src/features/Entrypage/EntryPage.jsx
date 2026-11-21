import { Link, useNavigate } from "react-router-dom";
import "./EntryPage.css";

export default function EntryPage() {
    const navigate = useNavigate();
    const navigateToSearchProperty = () => {
        navigate("/login");
    };
    
    return (
        <>
            <div className="entry-container">
                <div className="entry-title">
                    <h2>Your Journey, Your Property, Simplified, & Starts here.</h2>
                    <p>Get started now with a seamless experience.</p>
                </div>
                <div className="entry-body">
                    <div className="entry-card-left">

                        <div className="card-icon-badge blue-badge">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2b7082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <circle cx="12" cy="13" r="3" />
                                <path d="M14.2 15.2L17 18" />
                            </svg>
                        </div>
                        
                        <div className="title-card">
                            <h2>Looking for a Property</h2>
                        </div>
                        <div className="des-card">
                            <p>Streamline your property search with personalized recommendations and easy-to-use tools. Find exactly what you need, faster.</p>
                        </div>
                        <button className="search-property-btn" onClick={navigateToSearchProperty}>
                            Search Properties
                        </button>
                    </div>
                    <div className="entry-card-right">

                        <div className="card-icon-badge teal-badge">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2b7082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <line x1="12" y1="11" x2="12" y2="17" />
                                <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>
                        </div>

                        <div className="title-card">
                            <h2>Post a Property</h2>
                        </div>
                        <div className="des-card">
                            <p>Reach a wide audience of potential tenants instantly. List your property with ease and manage inquiries effortlessly.</p>
                        </div>
                        <button className="search-property-btn" onClick={navigateToSearchProperty}>
                            List Your Property
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}