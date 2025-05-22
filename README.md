## Form Prefill Configuration UI

This project provides a user interface to visualize a flow graph of forms and configure field prefill mappings.

<img width="1382" alt="Screenshot 2025-05-22 at 6 05 55 PM" src="https://github.com/user-attachments/assets/a01cdcff-5eaa-4a54-bd57-7a8871348585" />

<img width="1348" alt="Screenshot 2025-05-22 at 6 06 07 PM" src="https://github.com/user-attachments/assets/909f45c8-9059-4bca-a17a-84824ee32b91" />

### Features

* **Interactive Flow Graph**: Click form nodes to view details.
* **Prefill Configuration**: Define how form fields are prefilled from dependent forms or global data.
* **Intuitive UI**: Built with React and styled using Tailwind CSS, including a modal for selecting prefill sources.

### Getting Started

#### Prerequisites
* Node.js & npm/Yarn
* A local backend serving graph data at `http://localhost:3000/api/v1/1/actions/blueprints/test/graph/graph`.
*   Link to the repo: `https://github.com/mosaic-avantos/frontendchallengeserver`.

#### Installation
1.  Clone this repository.
2.  `npm install` (or `yarn install`)
3.  Ensure Tailwind CSS is correctly configured in `tailwind.config.js` and included in your main CSS file (e.g., `src/index.css`).

#### Running Locally
1.  Start your backend server.
2.  `npm run dev` (or `yarn dev`)
3.  Open your browser to the local development URL (usually `http://localhost:5173`).

### Code Organization

* **Clear Separation**: Logic is divided into:
    * **`App.jsx`**: Manages main application state and layout.
    * **`components/`**: UI elements (`FlowGraph`, `CustomFormNode`, `PrefillMappingDisplay`, `PrefillConfigurationModal`).
    * **`lib/`**: Data fetching (`WorkspaceData.js`), data processing (`processGraphData.js`), and graph utilities (`graphUtils.js`).
* **Modern React**: Uses functional components, `useState`, `useEffect`, and `useMemo` for efficient state management and performance.
* **Readable Code**: Focus on clear naming conventions and maintainable structure.

### Extensibility

* **New Data Sources**: Easily extend the `availablePrefillSources` in `App.jsx` and add new display sections in `PrefillConfigurationModal.jsx` to support more prefill data types (e.g., User Profile, System Defaults).
* **Reusable Components**: UI components like `PrefillMappingDisplay` are designed to be generic for different forms.
