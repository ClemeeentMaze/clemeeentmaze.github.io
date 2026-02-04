# AI Prototyping Boilerplate

**A rapid prototyping environment for Product Designers, powered by React + Vite + Ariane Design System**

This boilerplate helps you quickly create, organize, and test multiple UI prototypes in a single workspace. It's designed for Product Designers working with AI to explore ideas, test interactions, and iterate on designs—all without affecting your main product codebase.

---

## 🎯 What is this for?

- **AI-Assisted Design Exploration:** Create prototypes through conversation with AI assistants (like Cursor)
- **Multi-Variant Testing:** Build multiple versions of the same feature to compare approaches side-by-side
- **Design System Integration:** Uses the Ariane Design System for production-ready components
- **Collaboration:** Share prototypes with stakeholders for feedback in a clean, preview-ready format
- **Handoff Annotations:** Document your designs with annotations for developer handoff

---

## ✨ Key Features

### 🧩 Ariane Design System
All prototypes use the Ariane Design System—a comprehensive component library built on Tailwind CSS and Radix UI. This ensures consistency with production and speeds up development.

### 📦 Auto-Discovery
Add a new folder to `src/prototypes/`, and it automatically appears in the prototype selector. No configuration needed.

### 🏷️ Prototype Organization
Group related prototypes together (e.g., "Checkout Exploration") for easier navigation.

### 🎨 State Playground (Optional)
Add visual controls to switch between prototype states without editing code—perfect for reviewing different scenarios.

### 📝 Annotation System
Add developer handoff annotations directly to your prototypes, documenting interaction patterns, responsive behavior, and implementation notes.

### 🔍 Full Preview Mode
Share clean, distraction-free previews by adding `?full-preview` to any prototype URL.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and Yarn installed

### Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   yarn dev
   ```

3. **Open your app:**
   Visit `http://localhost:5173` (or the URL shown in terminal)

> **Note:** This project uses **Yarn** as the package manager. Always use `yarn` commands instead of `npm` to avoid lockfile conflicts.

---

## 📂 Project Structure

```
src/
  _framework/              # Core infrastructure (updatable)
    components/
      ariane/              # Ariane Design System components
      MainContent.jsx      # Prototype shell
      PrototypeSelector.jsx # Prototype navigation
      StatePlayground.jsx  # State controls (optional)
    context/               # React contexts
    hooks/                 # Custom hooks
    core/                  # Utilities
    styles/                # Shared styles
  
  prototypes/              # Your prototypes go here
    hello-designer/        # Example prototype
    ariane/                # Ariane component showcase
    [your-prototype]/      # Your new prototypes
  
  components/              # Shared components (use sparingly)
  
.cursor/
  rules/                   # AI assistant guidelines
    01-code-style.mdc
    02-prototype-creation.mdc
    11-prototype-isolation.mdc
    ariane-design-system.mdc
    ... (see full list below)
```

---

## 🎨 Creating a New Prototype

### Quick Start

1. **Duplicate the example:**
   ```bash
   cp -r src/prototypes/hello-designer src/prototypes/my-new-idea
   ```

2. **Edit the main file** (`src/prototypes/my-new-idea/index.jsx`):
   ```jsx
   function MyNewIdea() {
     return (
       <div className="p-8">
         <h1>My New Idea</h1>
       </div>
     );
   }

   // Required: Set the title shown in the selector
   MyNewIdea.Title = "My New Idea";

   // Optional: Control sort order (lower = appears first)
   MyNewIdea.Order = 10;

   // Optional: Group related prototypes
   MyNewIdea.Group = "Exploration";

   export default MyNewIdea;
   ```

3. **Restart the dev server** for the new prototype to appear:
   ```bash
   # Press Ctrl+C to stop the server, then:
   yarn dev
   ```
   
   > **Why?** Prototype discovery happens at build time. Once restarted, all future edits will hot-reload instantly.

4. **Your prototype now appears** in the prototype selector.

### Prototype Properties

| Property | Required | Description |
|----------|----------|-------------|
| `Title` | ✅ Yes | Display name in the prototype selector |
| `Order` | ⬜ Optional | Sort order (lower numbers appear first) |
| `Group` | ⬜ Optional | Organize related prototypes together |
| `StateControls` | ⬜ Optional | Add visual state controls (see State Playground) |

### Using Design System Components

**Always use Ariane components first:**

```jsx
import { 
  CTAButton, 
  TextInputControl, 
  Field,
  Flex, 
  Box, 
  Heading, 
  Text 
} from '@framework/components/ariane';

function MyPrototype() {
  return (
    <Box className="p-8">
      <Heading level={1}>Welcome</Heading>
      <Text>Get started with Ariane components</Text>
      
      <Flex direction="column" gap="MD">
        <Field label="Email" htmlFor="email">
          <TextInputControl id="email" placeholder="you@example.com" />
        </Field>
        <CTAButton emphasis="primary">Submit</CTAButton>
      </Flex>
    </Box>
  );
}
```

See `.cursor/rules/ariane-design-system.mdc` for the complete component library.

---

## 🔧 Available Libraries

This project comes pre-configured with:

### UI Components
- **Ariane Design System** - Primary component library (`@framework/components/ariane`)
- **Tailwind CSS** - Utility classes for custom styling
- **Radix UI Primitives** - Accessible component primitives

### Animation & Icons
- **Framer Motion** (`framer-motion`) - Animations and gestures
- **React Icons** (`react-icons`) - Multiple icon sets
- **Lucide React** (`lucide-react`) - Modern icon library

### Utilities
- **React Router DOM** - Routing (pre-configured)
- **clsx** / **tailwind-merge** - Class name utilities
- **class-variance-authority** - Component variant styling

---

## 🎯 Special Features

### 1. Full Preview Mode

Hide the prototype selector for clean presentations:

```
# Normal view
http://localhost:5173/my-prototype

# Full preview (no selector)
http://localhost:5173/my-prototype?full-preview
```

Perfect for:
- Sharing with stakeholders
- Recording demos
- Presenting to teams

### 2. Archiving Prototypes

Prefix a prototype folder with `.` to move it to the "Archived" section:

```bash
# Active prototype
src/prototypes/checkout-v1/

# Archived (appears in collapsible section)
src/prototypes/.checkout-v1/
```

Useful for:
- Work-in-progress prototypes
- Completed explorations
- Reference implementations
- Experimental features

### 3. Prototype Grouping

Organize related prototypes together:

```jsx
// src/prototypes/checkout-wizard/index.jsx
CheckoutWizard.Title = "Checkout - Wizard";
CheckoutWizard.Group = "Checkout Exploration";
CheckoutWizard.Order = 1;

// src/prototypes/checkout-single-page/index.jsx
CheckoutSinglePage.Title = "Checkout - Single Page";
CheckoutSinglePage.Group = "Checkout Exploration";
CheckoutSinglePage.Order = 2;
```

Both prototypes will appear under a "Checkout Exploration" section in the selector.

### 4. State Playground (Experimental)

Add visual controls to switch between prototype states:

```jsx
function Dashboard() {
  const state = useStatePlayground();
  const viewMode = state.viewState || 'default';
  const itemCount = state.itemCount || 5;

  return (
    <div>
      {/* Your prototype using viewMode and itemCount */}
    </div>
  );
}

Dashboard.Title = "Dashboard";
Dashboard.StateControls = {
  viewState: {
    type: 'select',
    options: ['default', 'loading', 'error', 'empty'],
    default: 'default',
    label: 'View State'
  },
  itemCount: {
    type: 'range',
    min: 0,
    max: 20,
    default: 5,
    label: 'Number of Items'
  }
};
```

See `.cursor/rules/16-state-playground.mdc` for full documentation.

### 5. Annotation System

Document designs for developer handoff:

```jsx
import { useAnnotations, Annotation } from '@framework/context/AnnotationContext';

function MyPrototype() {
  const { annotationsEnabled } = useAnnotations();
  const buttonRef = useRef(null);

  return (
    <div>
      <button ref={buttonRef}>Submit</button>
      
      {annotationsEnabled && (
        <Annotation
          targetRef={buttonRef}
          scope="interaction"
          title="Primary Action"
          description="Submits form with validation"
        />
      )}
    </div>
  );
}
```

Annotations appear when the annotation toggle is enabled in the UI. See `.cursor/rules/12-annotations.mdc` for details.

---

## 📚 Working with AI (Cursor Rules)

This boilerplate is optimized for AI-assisted development. The `.cursor/rules/` directory contains comprehensive guidelines for AI assistants to help you build prototypes effectively.

### Key Rules for Reference

| Rule File | Purpose |
|-----------|---------|
| `02-prototype-creation.mdc` | How to create new prototypes |
| `05-libraries-and-components.mdc` | Component selection guidelines |
| `11-prototype-isolation.mdc` | **Critical:** Avoiding cross-prototype changes |
| `13-brainstorming.mdc` | AI-assisted ideation strategies |
| `ariane-design-system.mdc` | Complete design system documentation |

### Decision Matrix

| I want to... | Relevant Rule |
|--------------|---------------|
| Create a new prototype | `02-prototype-creation.mdc` |
| Choose UI components | `ariane-design-system.mdc` + `05-libraries-and-components.mdc` |
| Group related prototypes | `02-prototype-creation.mdc` (Group property) |
| Brainstorm multiple approaches | `13-brainstorming.mdc` |
| Add developer handoff notes | `12-annotations.mdc` |
| Add state controls | `16-state-playground.mdc` |
| Import from Figma | `17-figma-mcp.mdc` |

---

## 🎨 Import Aliases

Use clean import paths with built-in aliases:

```jsx
// ✅ Framework components (Ariane Design System)
import { CTAButton, Flex, Box } from '@framework/components/ariane';

// ✅ Framework utilities
import { usePrototypes } from '@framework/hooks/usePrototypes';
import { useAnnotations } from '@framework/context/AnnotationContext';

// ✅ Prototype-specific imports
import MyComponent from '@/prototypes/my-prototype/components/MyComponent';
```

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn add <package>` | Add a dependency |
| `yarn add -D <package>` | Add a dev dependency |

---

## 🎯 Best Practices

### Component Selection Priority
1. **Ariane First** - Always check if an Ariane component exists
2. **Tailwind Extend** - Use `className` for minor styling adjustments
3. **Custom Components** - Only create when truly necessary

```jsx
// ❌ DON'T: Create custom styled buttons
<button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>

// ✅ DO: Use Ariane components
<CTAButton emphasis="primary">Submit</CTAButton>
```

### Prototype Isolation
When working on a specific prototype, **never modify files in other prototype directories**. Each prototype should be self-contained.

### Shared Components
Only create shared components in `src/components/` if they are:
- Truly generic and reusable across multiple prototypes
- Stable and unlikely to need prototype-specific variations
- Not already available in Ariane

**When in doubt, keep components at the prototype level.** It's easier to promote them later.

---

## 📖 Target Audience

This boilerplate is designed for **Product Designers** who may have limited front-end coding experience. When working with AI assistants:

- Focus on visual outcomes and user experience
- Use designer-friendly language (avoid deep technical jargon)
- Explore multiple design directions through separate prototypes
- Iterate quickly without worrying about breaking other work

---

## 🤝 Collaboration & Sharing

### Sharing with Stakeholders
1. Build your prototype normally
2. Add `?full-preview` to the URL for a clean view
3. Share the link (deploy to Netlify, Vercel, etc.)

### Developer Handoff
1. Use the annotation system to document interactions
2. Reference Ariane components (they match production)
3. Provide context in annotation descriptions

### Team Review
1. Use prototype grouping to organize related explorations
2. Archive completed work to keep the list clean
3. Use descriptive titles and consistent naming

---

## 🚀 Deployment

This project builds to a static `dist/` folder and can be deployed anywhere.

### GitHub Pages (Recommended)

This boilerplate includes automatic GitHub Pages deployment. When you create a repo from this template:

1. **Enable GitHub Pages:**
   - Go to your repo **Settings → Pages**
   - Under "Build and deployment", set **Source** to **"GitHub Actions"**

2. **Push to main:**
   - Any push to the `main` branch triggers automatic deployment
   - The workflow builds your app and publishes it to GitHub Pages

3. **Access your site:**
   - After deployment completes, your site is live at the URL shown in the Actions tab
   - Typically: `https://<random-name>.pages.github.io/`

**How it works:**
- The `.github/workflows/deploy.yml` file handles everything automatically
- Vite compiles your JSX to plain JavaScript and bundles it into `dist/`
- GitHub Pages serves the compiled files (not raw source code)

**Why automatic deployment?**
- Browsers can't run `.jsx` files directly—they need compiled JavaScript
- Without the build step, GitHub Pages would try to serve raw source files → MIME type errors
- The workflow ensures your app is always properly built before deployment

### Netlify / Vercel (Alternative)

- Connect your Git repository
- Build command: `yarn build`
- Publish directory: `dist`

The `_redirects` file handles client-side routing automatically.

---

## 📄 License

MIT

---

## 🆘 Need Help?

1. **Check the Cursor Rules** - `.cursor/rules/` has comprehensive guides
2. **Review the Ariane Showcase** - The `ariane` prototype demonstrates all available components
3. **Ask the AI** - This project is optimized for AI-assisted development

---

**Happy Prototyping! 🎨**
