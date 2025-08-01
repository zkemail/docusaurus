# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.7.0 documentation website for ZK Email - a zero-knowledge proof system for email verification. The site is deployed at https://docs.zk.email/

## Key Commands

```bash
# Development
yarn start              # Start development server at http://localhost:3000
yarn build              # Build static site to ./build directory
yarn serve              # Serve built site locally
yarn typecheck          # Run TypeScript type checking

# Utilities
yarn clear              # Clear Docusaurus cache (useful when things aren't updating)
yarn swizzle            # Customize Docusaurus components
```

## Architecture & Structure

### Documentation Organization
- `/docs/` - All documentation content in Markdown
  - `architecture/` - System design and core concepts
  - `zk-email-sdk/` - Blueprint SDK documentation
  - `email-wallet/` - Email wallet implementation
  - `account-recovery/` - Recovery system documentation
  - `zk-email-verifier/` - Core verification library docs

### Component Structure
- `/src/components/` - Reusable React components
  - `HomepageFeatures/` - Landing page feature cards
  - Custom components for API documentation and examples
- `/src/theme/` - Docusaurus theme overrides
- `/src/css/` - Global styles and custom theming

### Configuration
- `docusaurus.config.ts` - Main site configuration (title, URL, themes, plugins)
- `sidebars.ts` - Documentation sidebar structure and navigation
- `.env` - Environment variables (PostHog API key)

## Development Guidelines

### Adding Documentation
1. Create Markdown files in appropriate `/docs/` subdirectory
2. Update `sidebars.ts` if adding new sections
3. Use frontmatter for title and custom properties
4. Reference other docs with relative paths

### Working with Components
- Components use TypeScript and React 18
- Follow existing patterns in `/src/components/`
- Use CSS modules for component-specific styles

### Environment Setup
1. Copy `.env.example` to `.env`
2. Add PostHog API key for analytics (optional for development)

### Common Tasks
- **Update navigation**: Edit `sidebars.ts`
- **Change site metadata**: Edit `docusaurus.config.ts`
- **Add new diagrams**: Use Mermaid syntax in Markdown
- **Customize theme**: Use `yarn swizzle` to override components

## Important Notes
- Site uses Algolia for search functionality
- Custom Fustat font loaded from static assets
- Dark/light mode toggle with system preference detection
- All external links should include `rel="noopener noreferrer"`
- Code blocks support Solidity syntax highlighting