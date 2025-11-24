# Medstudy Quiz - Professional Orientation Platform

A modern, multilingual quiz application designed for professional orientation assessment. Built with Next.js 14 and powered by AI to provide personalized career recommendations for medical studies.

## Features

- **Interactive Quiz System**: Engaging question-and-answer flow with progress tracking
- **AI-Powered Analysis**: Integration with Google Gemini AI for intelligent result analysis
- **Multi-language Support**: Available in English, Russian, and Ukrainian
- **Email Results**: Automated email delivery of quiz results via SendGrid
- **CRM Integration**: Bitrix24 integration for lead management
- **Analytics**: Comprehensive tracking with Google Analytics, Facebook Pixel, and TikTok Pixel
- **Modern UI**: Built with NextUI v2 and Tailwind CSS for a responsive, accessible interface
- **Dark Mode Support**: Theme switching with next-themes

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [NextUI v2](https://nextui.org/) - Modern UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Google Gemini AI](https://ai.google.dev/) - AI-powered analysis
- [SendGrid](https://sendgrid.com/) - Email delivery service
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- SendGrid account and API key
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz_proforientationgit
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with required credentials:
```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_MODEL=gemini-1.5-flash

# SendGrid Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@medstudy.cz
EMAIL_FROM_NAME="Medstudy.cz | Quiz"
EMAIL_REPLY_TO=sales@medstudy.cz
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

The production server runs on port 5050 by default.

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── api/               # API routes
├── components/            # React components
│   └── ui/               # UI components
├── integrations/         # Third-party integrations
│   ├── gemini.ts        # Google Gemini AI
│   ├── email.ts         # SendGrid email
│   ├── fbpixel.ts       # Facebook Pixel
│   └── tiktokpixel.ts   # TikTok Pixel
├── locales/             # Translation files
│   ├── en/             # English
│   ├── ru/             # Russian
│   └── uk/             # Ukrainian
├── public/             # Static assets
├── styles/             # Global styles
└── utils/              # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server (port 5050)
- `npm run lint` - Run ESLint

## API Endpoints

- `/api/session-answer` - Save quiz answers
- `/api/sendEmail` - Send quiz results via email
- `/api/report` - Generate analysis report
- `/api/bitrix` - Bitrix CRM integration

## Internationalization

The application supports three languages:
- English (en)
- Russian (ru)
- Ukrainian (uk)

Language detection is automatic based on browser preferences, with manual switching available.

## Integrations

### Google Gemini AI
Used for analyzing quiz responses and generating personalized career recommendations.

### SendGrid
Handles email delivery for quiz results and reports.

### Bitrix24
CRM integration for lead capture and management.

### Analytics
- Google Analytics - User behavior tracking
- Facebook Pixel - Conversion tracking
- TikTok Pixel - Marketing analytics
- Vercel Analytics - Performance monitoring

## Environment Variables

See `.env.example` for all available configuration options:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `SENDGRID_API_KEY` | SendGrid API key | Yes |
| `EMAIL_FROM` | Sender email address | Yes |
| `EMAIL_FROM_NAME` | Sender display name | Yes |
| `EMAIL_REPLY_TO` | Reply-to email address | Yes |

## License

Licensed under the [MIT license](./LICENSE).

## Support

For issues or questions, please open an issue in the repository.