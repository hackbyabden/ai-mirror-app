# AI Mirror: Future You & Deep Secrets

An AI-powered interactive mirror app that reveals your future appearance, analyzes emotions, and provides personality insights with a cyberpunk aesthetic.

## Features

- **Future Face Scanner**: Upload a selfie to see yourself in 20, 40, 60 years or transformed into anime/villain styles
- **Emotion Detector**: AI analyzes your current mood, stress levels, and emotional authenticity
- **Voice Analyzer**: Upload voice recordings for psychic-style personality readings
- **Mind Mirror Quiz**: Answer 5 questions to predict your future life, career, and relationships
- **Daily Secrets**: Receive AI-generated mysterious insights about yourself
- **Premium Features**: Ad-unlock model with unlimited scans and enhanced predictions

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter routing
- **Backend**: Express.js, TypeScript
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: TanStack React Query
- **Storage**: In-memory storage (easily replaceable with database)
- **Styling**: Cyberpunk theme with neon effects and animations

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Deployment to Vercel

1. **Upload to GitHub**:
   - Create a new repository on GitHub
   - Upload all project files

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration
   - Click "Deploy"

3. **Alternative Direct Upload**:
   - Use the Vercel CLI: `vercel --prod`
   - Or drag and drop the project folder to Vercel dashboard

### Deployment to Other Platforms

#### Netlify
```bash
# Build the client
npm run build:client

# Deploy the dist folder to Netlify
```

#### Railway/Render
```bash
# These platforms will automatically detect the Node.js app
# Set NODE_ENV=production in environment variables
```

## Project Structure

```
ai-mirror-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── lib/           # Utilities and data
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Vite development setup
├── shared/               # Shared TypeScript types
│   └── schema.ts         # Database schema and validation
├── package.json          # Dependencies and scripts
├── vercel.json          # Vercel deployment configuration
└── README.md            # This file
```

## API Endpoints

- `POST /api/scan/face` - Upload image for face scanning
- `POST /api/scan/emotion` - Upload image for emotion analysis
- `POST /api/scan/voice` - Upload audio for voice analysis
- `POST /api/quiz/submit` - Submit quiz answers for predictions
- `GET /api/secret/today` - Get daily secret
- `POST /api/watch-ad` - Simulate ad watching for free scans
- `GET /api/history` - Get user's scan history

## Environment Variables

No external API keys are required for the basic functionality. The app uses simulated AI responses for demonstration purposes.

For production with real AI services, you would add:
- `OPENAI_API_KEY` - For advanced text generation
- `AZURE_COGNITIVE_KEY` - For real emotion detection
- `DATABASE_URL` - For persistent data storage

## Customization

### Adding Real AI Integration

The app is designed to easily integrate with real AI services:

1. **Face Analysis**: Replace mock functions in `lib/face-api.ts` with real face detection APIs
2. **Emotion Detection**: Integrate with Azure Cognitive Services or similar
3. **Voice Analysis**: Connect to speech analysis APIs
4. **Text Generation**: Add OpenAI integration for dynamic content

### Database Integration

Replace the in-memory storage in `server/storage.ts` with a real database:

1. Uncomment database-related dependencies
2. Update the storage interface implementation
3. Run database migrations using Drizzle

### Styling Customization

The cyberpunk theme can be customized in:
- `client/src/index.css` - Color variables and animations
- `tailwind.config.ts` - Tailwind theme configuration

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with WebRTC support (for camera/microphone access)

## License

MIT License - feel free to use this project as a starting point for your own AI-powered applications.

## Support

For questions or issues, please check the GitHub repository or create an issue.