Wedding Invite — Next.js (Vercel-ready)
======================================

What's included:
- Next.js pages-based project
- TailwindCSS config (you still need to run npm install)
- framer-motion for animations
- Wedding invite component at pages/index.js
- public/images and public/music folders for your photos and mp3 files

Setup & deploy (recommended):
1. Unzip project, open terminal in project folder.
2. Install dependencies:
   npm install
3. Run locally:
   npm run dev
4. To deploy to Vercel:
   - Sign in to Vercel, import the project from your Git repository or upload.
   - Vercel auto-detects Next.js. Build settings default should work: `npm run build`.

How to customize:
- Replace `public/images/main-photo.jpg` and gallery images.
- Add .mp3 files into `public/music/` and update `playlist` paths/titles in pages/index.js.
- For RSVP persistence, replace the simulated submit in handleRsvpSubmit with your API call.

Notes:
- Browsers may block autoplay until user interacts. The app uses a first-play fade-in which occurs on the first Play action.
- Tailwind is included; if you prefer not to use Tailwind, replace classes with plain CSS.

Happy wedding planning! 🎉
