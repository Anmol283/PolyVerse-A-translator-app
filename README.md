<h1 align="center">🌐 Polyverse</h1>
<h5 align="center"><i>Breaking language barriers, one word at a time.</i></h5>
<br>
<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJ5ZWlxNnJnNnRqcWJtZnRvZnRqcWJtZnRvZnRqcWJtZnRvZnRqcWJtZg/3oKIPtjElfqwMOTbH2/giphy.gif" width="250"/>
</p>

---

## 📖 Overview

Polyverse is a modern, elegant translation web application built with Next.js, MongoDB, and Tailwind CSS. It offers a seamless translation experience with support for 12+ languages, user authentication, and translation history tracking. The sleek, professional dark theme provides a premium user experience across all devices.

---

## 📸 Sneak Peek

<p align="center">
  <img src="https://github.com/user-attachments/assets/99f3edd4-fa97-4eab-aaf2-333551db52d0" alt="Homepage Screenshot" width="45%" />
  &nbsp; <!-- space between images -->
  <img src="https://github.com/user-attachments/assets/099c450a-8b10-40c5-8809-d4b8ca57204b" alt="Profile Page Screenshot" width="45%" />
</p>

---
## ✨ Features

### 🌍 Translation Engine

- **Multi-language Support**: Translate between 12+ popular languages
- **Real-time Translation**: Fast, responsive translation interface
- **Fallback API System**: Multiple translation services for reliability
- **Language Swapping**: Easily switch source and target languages

---

### 👤 User Management

- **Secure Authentication**: User registration and login with NextAuth.js
- **Profile Management**: View and manage your account details
- **Translation History**: Access all your previous translations
- **Data Privacy**: Secure handling of user information

---

### 🎨 Modern UI/UX

- **Professional Dark Theme**: Sleek navy blue and black gradient design
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Animated Components**: Subtle animations for a premium feel
- **Accessibility**: Built with accessibility in mind

---

### 💾 Data Persistence

- **MongoDB Integration**: Reliable storage for user data and translations
- **Translation History**: Save and retrieve past translations
- **User Preferences**: Store user settings and preferences

---

## 🛠️ Technical Implementation

### Tech Stack

### 🧱 Tech Stack

| Category          | Technologies |
|------------------|--------------|
| **Frontend**      | <img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" /> <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /> |
| **Styling**       | <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/Shadcn_ui-F5F5F5?style=flat-square&logo=react&logoColor=black" alt="Shadcn/ui" /> |
| **Database**      | <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" /> |
| **Authentication**| <img src="https://img.shields.io/badge/NextAuth.js-3B82F6?style=flat-square&logo=vercel&logoColor=white" alt="NextAuth.js" /> |
| **Translation APIs** | <img src="https://img.shields.io/badge/LibreTranslate-4285F4?style=flat-square&logo=googletranslate&logoColor=white" alt="LibreTranslate" /> <img src="https://img.shields.io/badge/MyMemory_API-FABB00?style=flat-square&logo=openai&logoColor=black" alt="MyMemory API" /> |
| **Deployment**    | <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /> |


---

### Directory Structure

```
polyverse/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── translate/      # Translation API
│   │   └── translations/   # User translations management
│   ├── login/              # Login page
│   ├── signup/              # Signup page
│   ├── profile/            # User profile page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── ui/                 # Shadcn/ui components
│   ├── navigation.tsx      # Navigation bar
│   ├── auth-provider.tsx   # Authentication provider
│   └── theme-toggle.tsx    # Dark mode toggle
├── lib/                    # Utility functions
│   ├── mongodb.ts          # MongoDB connection
│   └── auth.ts             # NextAuth configuration
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
│   └── favicon.ico         # Site favicon
├── .env.local              # Environment variables (create from .env.example)
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

### Installation

1. **Clone the repository**

```
git clone https://github.com/yourusername/polyverse.git
cd polyverse
```

2. **Install dependencies**

```
npm install
```

3. **Set up environment variables**

Create a `.env.local` file from `.env.example` and fill in:

```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### 🧪 Testing

Run tests using:

```
npm run test
```

This will execute all unit and integration tests to ensure the application is functioning correctly.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙋‍♀️ Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.dev/)
- [NextAuth.js](https://next-auth.js.org/)
- [LibreTranslate](https://libretranslate.com/)


