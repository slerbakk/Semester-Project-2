# 🏛️ Auction House

A modern web application for online auctions, built with vanilla JavaScript and Tailwind CSS.

## 🌟 Features

- **User Authentication**
  - Register with @stud.noroff.no email
  - Login/Logout functionality
  - Profile management

- **Auction Management**
  - Create auction listings
  - Browse active auctions
  - Place bids on items
  - Search and filter auctions

- **Profile Features**
  - Customizable profile with avatar and banner
  - Track active bids
  - View auction history
  - Manage credits

## 💻 Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- RESTful API Integration

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone https://github.com/slerbakk/Semester-Project-2.git
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 🔧 Project Structure

```
auction-house/
├── css/
│   ├── input.css
│   └── styles.css
├── img/
│   └── [image assets]
├── js/
│   ├── auth/
│   ├── components/
│   ├── constants/
│   ├── handlers/
│   ├── router.js
│   └── script.js
├── *.html
├── package.json
└── tailwind.config.js
```

## 📝 API Integration

The application integrates with a RESTful API for:
- User authentication
- Auction management
- Bid processing
- Profile updates

## 🎨 Styling

- Custom Tailwind configuration
- Responsive design
- Consistent color scheme:
  - Primary: #AC6230
  - Secondary: #264251
  - Accent colors defined in tailwind.config.js

## 🔐 Authentication

- JWT-based authentication
- Secure token storage
- Protected routes for authenticated users

## 🌐 Pages

- Home (/)
- Auctions (/auctions.html)
- Listing Details (/listing.html)
- Profile (/profile.html)
- Sell (/sell.html)
- Login (/login.html)
- Register (/register.html)

## 🛡️ Security Features

- Input validation
- Secure token handling
- Protected API endpoints

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Stian Lerbakk (@Slerbakk)

## 🙏 Acknowledgments

- Noroff School of Technology
- Design inspiration from modern auction platforms
