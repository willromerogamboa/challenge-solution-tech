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
mocks/                              # Data and handlers for testing
public/                             # Static files
src/
	app/
		chat/
			_components/            # Chat-specific components
			[id]/
				page-container.tsx  # Page container for chat by id
				page.tsx            # Main chat page by id
			page-container.tsx      # Page container for chat
			page.tsx                # Main chat page
		page-container.tsx          # Global page container
		page.tsx                    # Main app page
    components/
        ui/                         # Reusable UI components
    hooks/                          # Custom hooks
    lib/                            # Utilities and helpers
    models/                         # Data models
    services/                       # Business logic and services
```

This organization groups related files by feature, following best practices for modern Next.js and React projects.
