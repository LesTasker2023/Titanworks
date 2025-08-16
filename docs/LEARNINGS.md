# TypeScript Utility: Partial<T>

`Partial<T>` takes any interface or type and makes every property optional.

Example:

```ts
type User = { id: number; name: string; email: string };
type UserDraft = Partial<User>;
// Equivalent to: { id?: number; name?: string; email?: string }
```

Use for update forms, patch APIs, or anywhere you want to allow “some or all” fields to be present.

# Rule: Always add new learnings to this file as soon as you get it.

# High-Leverage Topics to Master Next

1. **Advanced TypeScript**
   - Utility types (`Partial`, `Pick`, `Omit`, `Record`)
   - Conditional types and type inference
   - Discriminated unions and exhaustive checks
   - Type guards and custom type predicates

2. **React Patterns**
   - Compound components
   - Render props and higher-order components (HOCs)
   - Custom hooks for state, effects, and context
   - Context API for scalable state management
   - Error boundaries and suspense

3. **Testing Excellence**
   - Unit, integration, and E2E testing strategies
   - Mocking, spies, and test doubles
   - Accessibility (a11y) testing
   - Test-driven development (TDD) mindset

4. **Performance & Optimization**
   - React memoization (`React.memo`, `useMemo`, `useCallback`)
   - Code splitting and lazy loading
   - Bundle analysis and tree shaking
   - Profiling and fixing performance bottlenecks

5. **Architecture & Clean Code**
   - Folder-per-component and scalable project structure
   - Dependency injection and inversion of control
   - SOLID principles in TypeScript/React
   - Clean, self-documenting code and refactoring

6. **DevOps & Tooling**
   - CI/CD pipelines (GitHub Actions, Vercel, Netlify)
   - Linting, formatting, and code quality automation
   - Yarn workspaces and monorepo management

7. **API & Data**
   - REST, GraphQL, and data fetching patterns
   - SWR/React Query for remote state
   - Caching, optimistic updates, and error handling

8. **Design Systems & Accessibility**
   - Building and documenting reusable component libraries
   - Theming, tokens, and design tokens
   - WCAG and ARIA best practices

9. **Soft Skills for Engineers**
   - Technical communication and documentation
   - Code review mastery
   - Mentoring and knowledge sharing

10. **First-Principles Thinking**
    - Always ask “why?” and challenge assumptions
    - Learn to break down problems to fundamentals

_Pick any of these and go deep. This is your roadmap to 10x engineering._

# React vs. Vue Analogy: Motorcycles vs. Cars

"I like motorcycles, not cars. Both got wheels and engines, but you ride them different."

React is like a motorcycle—functional, direct, and gives you full control. Vue (classic) is like a car—object-oriented, comfortable, but a different experience. Both get you there, but the ride and the connection are totally different.

Use this analogy to explain why you prefer React’s style over Vue’s, especially in interviews or team discussions.

# TypeScript Generics Analogy

**any** is a square, empty box—anything fits, but there’s no safety, no padding, and things can rattle around or break.

A **generic type** is also a square empty box, but when you put something in, the box molds itself with a custom foam insert that fits the part perfectly. TypeScript always knows what’s inside, and you can’t put the wrong thing in or take the wrong thing out.

> Generics = flexible, but always a perfect, safe fit.

---

## TypeScript Utility Types: `Partial<Car>` vs `Pick<Car, ...>` Analogy

If you have a `Car` type with all required properties (`color`, `name`, `doors`, `engineSize`, `wheels`, etc):

- **`Partial<Car>`** lets you create an object with any subset of those properties, all optional. It’s like having a car blueprint where you can fill in only the details you care about, and leave the rest blank.
  - Example:
    ```ts
    { name: "Cybertruck", wheels: 6 } // valid for Partial<Car>
    ```
- **`Pick<Car, "name" | "wheels">`** creates a new type with only those two properties, both required. It’s like cutting out just the “name” and “wheels” sections from the blueprint, and you must provide both.
  - Example:
    ```ts
    { name: "Roadster", wheels: 4 } // valid for Pick<Car, "name" | "wheels">
    ```

**Project Application:**  
Use `Partial<Car>` for update forms or patch APIs, where not all fields are required. Use `Pick<Car, ...>` when you want to enforce a minimal set of required fields.

_This file is for storing key learnings, analogies, and insights from your TypeScript and engineering journey._
