import React from 'react';

const Contact1 = ({ onScrollToContact2, bgColor, textColor }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [content, setContent] = React.useState({
    header: ' ',
    subHeader: '',
    buttonText: '',
    buttonLink: '',
    email: '',
    phone: '',
    bgColor: '', // Example background color
    textColor: '', // Example text color
    locations: [],
  });

  React.useEffect(() => {
    // Simulate fetching data from an API
    fetch(`${apiUrl}/contact/contact1`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setContent(data);
      });
  }, [apiUrl]);

  if (!content) {
    return <div style={{ textAlign: 'center', padding: '6rem 0' }}>Loading...</div>;
  }

  const handleClick = () => {
    console.log("Button clicked, scrolling to Contact2...");
    onScrollToContact2();  // Trigger scroll action
  };

  return (
    <div>
      <section style={{ padding: '6rem 0', backgroundColor: content.bgColor, color: content.textColor }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }} >
          <div style={{ display: 'flex', gap: '6rem', marginBottom: '4rem', clear: 'left' }} className='flex flex-col md:flex-row'>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                {content.header}
              </h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '1.75rem' }}>
                {content.subHeader}
              </p>
              <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <button 
                  className='btn rounded-full border-none' 
                  onClick={handleClick} // Trigger scroll action on click
                  style={{backgroundColor: content.textColor, color: content.bgColor }}>
                  {content.buttonText}
                </button>
              </div>
            </div>
            <div style={{ borderLeft: `2px solid white`, padding: '1.5rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h6 style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  Email Address
                </h6>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {content.email}
                </h3>
              </div>
              <div>
                <h6 style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  Phone Number:
                </h6>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {content.phone}
                </h3>
              </div>
            </div>
          </div>
          {content.locations && content.locations.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
              {content.locations.map((location, index) => (
                <div key={index} style={{ position: 'relative', height: '24rem', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(45, 55, 72, 0.5)' }}></div>
                  <img 
                    src={`data:image/jpeg;base64,${location.imgSrc}`} 
                    alt={`${location.country} image`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', bottom: '1.5rem', textAlign: 'center', padding: '0 1.5rem' }} className='text-white'>
                    <h5 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {location.country}
                    </h5>
                    <p style={{ fontSize: '1rem', fontWeight: '500' }}>
                      {location.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>No locations available.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact1;
