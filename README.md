# PromptWar – AI‑Driven Project Blueprint Generator

**PromptWar** is a lightweight Next.js 16 application that helps students and developers quickly generate project ideas and detailed execution blueprints for final‑year capstone projects. It combines a clean UI, preset skill profiles, and server‑side AI endpoints to produce:

- **Project ideas** tailored to your skill set, domain, and difficulty level.
- **Step‑by‑step blueprints** that outline tasks, milestones, and required technologies.
- **Instant previews** of generated blueprints with download options.

The app runs entirely in light‑mode (the dark‑mode toggle and related Tailwind classes have been removed for a simpler UI).

---

## 🚀 Getting Started

1. **Clone the repository** (already done) and install dependencies:
   ```bash
   npm install   # or yarn install / pnpm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   npm start   # serves the built app
   ```

---

## 🛠️ Core Features

| Feature | Description |
|---------|-------------|
| **Preset profiles** | Quickly load predefined skill sets (e.g., Healthcare AI, Smart Campus IoT) via the header buttons.
| **Custom skill selector** | Add/remove technologies, choose a target domain, and set difficulty (Beginner, Intermediate, Advanced).
| **AI‑generated ideas** | Click *Generate Ideas* – the backend calls a Gemini‑based API to produce a list of project concepts.
| **Blueprint generation** | Selecting an idea triggers the *Generate Blueprint* endpoint, which returns a step‑by‑step execution plan.
| **Downloadable assets** | Blueprint view includes icons to download the plan as PNG or PDF.
| **Responsive UI** | Tailwind CSS ensures the layout works on mobile, tablet, and desktop screens.
| **Light‑mode only** | Simplified styling – all components use a clean white background with dark‑grey text.

---

## 📂 Project Structure

```
src/
 ├─ app/                # Next.js App Router entry points (layout, page, API routes)
 ├─ components/         # Re‑usable UI components (Header, ProfileForm, IdeaCard, BlueprintView, …)
 ├─ lib/                # Helper libraries (Gemini AI wrapper, mock data, Firebase config – now unused)
 └─ types/              # TypeScript type definitions for profiles, ideas, and blueprints
```

---

## 📦 Deploy

The easiest way to deploy is on **Vercel** (the platform created by the Next.js team):

1. Sign in to Vercel and import the repository.
2. Vercel automatically detects the Next.js framework and runs `npm install && npm run build`.
3. Your app will be live at a Vercel‑provided domain (or a custom domain you configure).

---

## 🙌 Contributing

Feel free to open issues or submit pull requests. Typical contributions include:
- Adding new preset profiles.
- Improving the AI prompt logic.
- Enhancing UI/UX or accessibility.

---

## 📄 License

This project is licensed under the MIT License.

---

Happy building! 🎉

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
