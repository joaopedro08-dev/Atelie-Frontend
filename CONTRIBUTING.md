# Contributing to Atelie-Frontend

Thank you for your interest in contributing to the **Atelie-Frontend** project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive of all contributors
- Provide constructive feedback
- Focus on the code, not the person
- Help create a welcoming environment for everyone

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Detailed description of the bug
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. **Check existing discussions** for similar ideas
2. **Create a new issue** with the `enhancement` label
3. **Describe the feature** clearly:
   - Use case and motivation
   - Proposed implementation (if you have ideas)
   - Expected benefits

### Submitting Code Changes

#### Prerequisites

- Node.js v18+ installed
- Basic understanding of TypeScript and React (or the framework used)
- Git knowledge

#### Steps

1. **Fork the repository**
   ```bash
   git clone https://github.com/joaopedro08-dev/Atelie-Frontend.git
   cd Atelie-Frontend
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear, meaningful commit messages
   - Keep commits focused and atomic

4. **Test your changes**
   ```bash
   pnpm test
   pnpm run build
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference related issues (#issue-number)
   - Ensure CI/CD checks pass
   - Request review from maintainers

## Code Style Guidelines

### TypeScript
- Use strict type checking
- Avoid `any` types when possible
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions

### CSS
- Follow BEM naming convention for classes
- Use CSS variables for theming
- Keep styles modular and maintainable

### General
- Keep functions small and single-purpose
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- Lint your code: `pnpm run lint`
- Format code: `pnpm run format`

## Pull Request Process

1. Update `README.md` if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Request review from at least one maintainer
5. Address feedback promptly
6. Merge after approval

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests
pnpm test

# Build for production
pnpm run build

# Lint code
pnpm run lint
```

## Questions or Need Help?

- Check the [README.md](README.md) for project overview
- Open a discussion for general questions
- Contact maintainers for specific concerns

---

**Thank you for contributing to Atelie-Frontend!** 🚀