## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Second, run the development server:

```bash
pnpm dev
```

Third, run the mock API server:

```bash
pnpm run dev:mock
```

## Folder Architecture

The project uses a modular architecture based on feature folders, making it scalable and maintainable. Here is a simplified visual structure:

```text
src/
	app/
		chat/
			_components/        # Chat-specific components
			[id]/               # Dynamic routes for chats
			page-container.tsx  # Page container
			page.tsx            # Main chat page
		components/
			ui/                 # Reusable UI components
		hooks/                # Custom hooks
		lib/                  # Utilities and helpers
		models/               # Data models
		services/             # Business logic and services
mocks/                    # Data and handlers for testing
public/                   # Static files
```

This organization groups related files by feature, following best practices for modern Next.js and React projects.
