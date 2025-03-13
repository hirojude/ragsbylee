# RagsByLee - Premium Durag E-commerce Website

A modern e-commerce website built with Next.js, Firebase, and Stripe for selling premium durags.

## Features

- 🛍️ Product catalog with filtering and search
- 📱 Mobile-responsive design
- 🔐 Phone number authentication
- 🛒 Shopping cart functionality
- 💳 Secure payments with Stripe
- 👤 User profiles and order history
- 📦 Order tracking
- 📱 Mobile Money support
- 🔔 Email & SMS notifications
- 👨‍💼 Admin dashboard for managing products and orders

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Firebase (Firestore, Functions, Auth)
- **Authentication**: Firebase Phone Auth
- **Payments**: Stripe
- **Hosting**: Vercel
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/hirojude/ragsbylee.git
   cd ragsbylee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── lib/                  # Utility functions and configurations
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Hirojude - [@hirojude](https://twitter.com/hirojude)

Project Link: [https://github.com/hirojude/ragsbylee](https://github.com/hirojude/ragsbylee)
