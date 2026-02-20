# 📚 LUMINA | Immersive Book Store

![Lumina Header](https://raw.githubusercontent.com/anselmeM/ReadingChairFull/main/public/header.png)

Lumina is a premium, high-end e-commerce platform designed for the modern reader. It bridges the gap between digital convenience and the tactile beauty of reading, offering an immersive experience for discovering and consuming both physical books and audiobooks.

## ✨ Key Features

### 🌍 Immersive Discovery
- **Discovery Engine**: Navigate curated genre "dimensions" with an interactive 3D interface.
- **Narrative DNA**: A dynamic profile system that maps your reading preferences based on your browsing history.
- **Tilt-Card Interaction**: High-performance JS-based 3D tilt effects on product displays.

### 🎧 Adaptive Audiobook Player
- **Complete Controls**: Play, pause, and seek with a real-time progress tracker.
- **Variable Playback**: Toggle between 0.75x and 2.0x speeds.
- **Sleep Timer**: Integrated countdown timer with customizable durations (15m to 90m).
- **Chapter Navigation**: Instant jump to any chapter via a dedicated modal.
- **Animated Waveforms**: Visual pulse that reacts to playback state.

### 🛒 Premium E-Commerce Flow
- **Advanced Shop**: Multi-faceted filtering by category, price, rating, and format.
- **Glassmorphic UI**: A dark-themed, ultra-modern design system with blur effects and vibrant gradients.
- **Cart Drawer**: Seamless, slide-in shopping experience from any page.
- **Consent Conscious**: Integrated privacy and cookie management system.

### 🛡️ Admin Suite
- **Inventory Management**: Full dashboard for adding, editing, and deleting products.
- **Order Tracking**: Overview of customer orders and fulfillment status.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anselmeM/ReadingChairFull.git
   cd ReadingChairFull
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```bash
src/
├── components/     # Reusable UI components (Navbar, CartDrawer, etc.)
├── context/        # Global state (Cart, Products, Wishlist, Orders)
├── pages/          # Main application views
│   └── admin/      # Admin-specific pages and layouts
├── App.jsx         # App root and providers
└── main.jsx        # Entry point
```

## 📜 License

This project is licensed under the ISC License.
