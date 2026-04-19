import './Terms.css';

const Terms = () => {
  return (
    <div className="terms__wrapper">
      <div className="container">
        <div className="outer__terms">
          <div className="top__">
            <h2>Terms & Conditions</h2>
            <p>Please read our terms and conditions before booking your stay</p>
          </div>
          
          <div className="terms__content">
            <div className="terms__section">
              <h3>Booking Terms</h3>
              <ul>
                <li>A 25% deposit is required to confirm your booking</li>
                <li>The remaining balance is due 8 weeks before your arrival date</li>
                <li>Bookings are confirmed upon receipt of deposit payment</li>
                <li>Change-over days are Friday, except for Christmas and New Year</li>
                <li>Check-in time: 3pm onwards</li>
                <li>Check-out time: 9.30am</li>
              </ul>
            </div>

            <div className="terms__section">
              <h3>Cancellation Policy</h3>
              <ul>
                <li>More than 8 weeks before arrival: Full refund minus £50 administration fee</li>
                <li>4-8 weeks before arrival: 50% refund</li>
                <li>Less than 4 weeks before arrival: No refund</li>
                <li>We recommend taking out travel insurance to cover cancellations</li>
              </ul>
            </div>

            <div className="terms__section">
              <h3>House Rules</h3>
              <ul>
                <li>Maximum occupancy: 4 guests</li>
                <li>No smoking inside the property</li>
                <li>No pets allowed</li>
                <li>Quiet hours: 11pm - 7am</li>
                <li>Please respect the property and its contents</li>
                <li>Report any damage or issues immediately</li>
              </ul>
            </div>

            <div className="terms__section">
              <h3>Parking</h3>
              <p>One car parking space is provided. Additional parking is available in the village car park.</p>
            </div>

            <div className="terms__section">
              <h3>Liability</h3>
              <p>The owners accept no liability for any loss, damage, or injury to guests or their property during their stay. Guests are responsible for their own safety and that of their children.</p>
            </div>

            <div className="terms__section">
              <h3>Contact Information</h3>
              <p>For any questions about these terms and conditions, please contact us:</p>
              <ul>
                <li>Phone: +44 (0)7742042031 or +44 (0)7796 601576</li>
                <li>Email: themooringscottage@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
