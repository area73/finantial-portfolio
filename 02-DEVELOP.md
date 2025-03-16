# DEVELOPMENT

## REQUIREMENTS

### Input

- User credentials (stored in local storage).
- API endpoints providing:
  - A list of financial assets (GET /assets).
  - Asset prices (GET /prices?assets=...).
  - Portfolio positions (GET /portfolios?asOf=...).
- User interactions:
  - Selecting asset classes or individual assets.
  - Changing time periods in the historical chart.

### Output

- A React-based UI displaying:
  - A Donut Chart showing balance by asset class or specific asset.
  - A Positions Table listing financial assets and their quantities.
  - A Historical Chart showing portfolio performance over time.
- Updated UI in response to user selections (e.g., asset class switch, date range change).

### Scalability

- Performance: Efficient state management to avoid unnecessary re-renders.
- Reusability: Modular, reusable React components.
- Responsiveness: UI adapts to different screen sizes.
- Maintainability: Clean, well-documented TypeScript code.
- Extensibility: API design allows for additional features (e.g., new asset types or analytics).

## CONSTRAINTS

- Tech Stack:

  - React for UI.
  - TypeScript for static typing.
  - Tailwind CSS for styling.
  - Chart.js, D3.js, or Recharts for data visualization.

- Error Handling:

  - Graceful handling of API failures.
  - User-friendly feedback messages.

- Security:

  - No complex authentication required (only local storage).
  - Public login page with minimal security constraints.

- Data Limitations:
  -API provides static/mock data, requiring possible extension for real-time updates.
