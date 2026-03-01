export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
            ❤️ LIFELINE
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.95 }}>
            Blood Donor Web Application - MERN Stack
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            A complete production-ready blood donation management system built with React, Node.js, Express, and MongoDB.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '60px'
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '30px', 
            borderRadius: '8px',
            color: '#333'
          }}>
            <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>📋 Project Overview</h3>
            <p>Complete MERN stack application with Google OAuth integration, admin panel, donor registration, and blood search functionality.</p>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '30px', 
            borderRadius: '8px',
            color: '#333'
          }}>
            <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>🏗️ Tech Stack</h3>
            <p><strong>Frontend:</strong> React + Vite + Bootstrap<br/>
            <strong>Backend:</strong> Node.js + Express.js<br/>
            <strong>Database:</strong> MongoDB Atlas</p>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '30px', 
            borderRadius: '8px',
            color: '#333'
          }}>
            <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>✨ Key Features</h3>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Google OAuth Login for Donors</li>
              <li>Admin Dashboard with Statistics</li>
              <li>Blood Search by Group & Location</li>
              <li>Donor Management System</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '40px', 
          borderRadius: '8px',
          marginBottom: '40px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>📁 Project Structure</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div>
              <h4 style={{ marginBottom: '15px' }}>🔧 Backend Files</h4>
              <code style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '4px', display: 'block' }}>
                /LIFELINE/server/<br/>
                ├── config/db.js<br/>
                ├── models/ (Admin.js, Donor.js)<br/>
                ├── controllers/<br/>
                ├── routes/<br/>
                ├── server.js<br/>
                ├── seed.js<br/>
                └── package.json
              </code>
            </div>

            <div>
              <h4 style={{ marginBottom: '15px' }}>⚛️ Frontend Files</h4>
              <code style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '4px', display: 'block' }}>
                /LIFELINE/client/<br/>
                ├── src/pages/<br/>
                ├── src/components/<br/>
                ├── src/App.jsx<br/>
                ├── src/App.css<br/>
                ├── index.html<br/>
                └── package.json
              </code>
            </div>

            <div>
              <h4 style={{ marginBottom: '15px' }}>📚 Documentation</h4>
              <code style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '4px', display: 'block' }}>
                install_guide.md<br/>
                <br/>Complete setup guide with:<br/>
                • MongoDB Atlas setup<br/>
                • Google OAuth config<br/>
                • Installation steps
              </code>
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.95)', 
          padding: '40px', 
          borderRadius: '8px',
          color: '#333'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>🚀 Quick Start</h2>
          
          <ol style={{ lineHeight: '1.8', fontSize: '1rem' }}>
            <li><strong>Setup MongoDB Atlas</strong> - Create free account and cluster</li>
            <li><strong>Configure Google OAuth</strong> - Get credentials from Google Console</li>
            <li><strong>Backend Setup</strong>
              <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', overflow: 'auto', marginTop: '10px' }}>
cd LIFELINE/server<br/>
npm install<br/>
Create .env file with MongoDB URI<br/>
npm run seed<br/>
npm start
              </pre>
            </li>
            <li><strong>Frontend Setup</strong>
              <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', overflow: 'auto', marginTop: '10px' }}>
cd ../client<br/>
npm install<br/>
Create .env.local with Google Client ID<br/>
npm run dev
              </pre>
            </li>
          </ol>

          <div style={{ marginTop: '30px', padding: '20px', background: '#fff3cd', borderLeft: '4px solid #ffc107', borderRadius: '4px' }}>
            <strong>Default Admin Credentials:</strong><br/>
            Email: admin@lifeline.com<br/>
            Password: admin123
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>📖 Read Full Documentation</h3>
          <p style={{ fontSize: '1rem', marginBottom: '20px' }}>
            Check the <code style={{ background: 'rgba(0,0,0,0.3)', padding: '5px 10px', borderRadius: '3px' }}>install_guide.md</code> file in the LIFELINE folder for:
          </p>
          <ul style={{ textAlign: 'left', display: 'inline-block', fontSize: '0.95rem' }}>
            <li>Detailed setup instructions</li>
            <li>Environment variable configuration</li>
            <li>API endpoint documentation</li>
            <li>Project structure explanation</li>
            <li>Troubleshooting guide</li>
          </ul>
        </div>

        <div style={{ 
          marginTop: '60px', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(255,255,255,0.3)',
          textAlign: 'center',
          opacity: 0.9
        }}>
          <p>All code is production-ready, fully documented, and copy-paste runnable.</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            Built with ❤️ | LIFELINE © 2024
          </p>
        </div>
      </div>
    </main>
  );
}
