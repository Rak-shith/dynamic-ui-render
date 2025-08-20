# Dynamic Render UI - React.js SPA

A powerful React.js Single Page Application that dynamically renders pages, tabs, sections, and form elements based on configuration JSON fetched from a backend API.

## 🚀 Features

- **Dynamic Configuration**: Renders UI components based on JSON configuration
- **Form Components**: TextField, RadioButton, Dropdown, MultiDropdown, TextArea, Image Upload, Location capture
- **Conditional Rendering**: Support for dependent fields based on user selections
- **Validation System**: Config-driven validation with real-time feedback
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Context Management**: Global state management for configuration and form data
- **API Integration**: Axios-based API layer with mock data support

## 🛠 Tech Stack

- **React.js** (v19.1.1) - Latest stable version
- **React Router** (v6.26.0) - Client-side routing
- **Tailwind CSS** (v3.4.6) - Utility-first styling
- **Axios** (v1.7.2) - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **ESLint + Prettier** - Code quality and formatting

## 📁 Project Structure

```
src/
├── components/
│   ├── form/
│   │   ├── ComponentFactory.jsx    # Dynamic component renderer
│   │   ├── TextField.jsx           # Text input component
│   │   ├── RadioButton.jsx         # Radio button component
│   │   ├── Dropdown.jsx            # Single select dropdown
│   │   ├── MultiDropdown.jsx       # Multi-select dropdown
│   │   ├── TextAreaSmall.jsx       # Textarea component
│   │   ├── ImageUploader.jsx       # Single image upload
│   │   ├── DynamicImages.jsx       # Multiple image upload
│   │   └── LocationComponent.jsx   # GPS location capture
│   ├── Navigation.jsx              # Dynamic navigation bar
│   ├── TabPage.jsx                 # Tab page renderer
│   └── Section.jsx                 # Section renderer with save functionality
├── context/
│   ├── ConfigContext.jsx           # Global configuration state
│   └── FormContext.jsx             # Form state management
├── services/
│   └── api.js                      # API layer with mock data
├── utils/
│   └── validation.js               # Validation utilities
├── App.jsx                         # Main application component
└── main.jsx                        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Configuration

The application uses a JSON configuration to define the UI structure. The configuration includes:

- **Pages**: Top-level page configuration
- **Tabs**: Navigation tabs with routing
- **Sections**: Grouped form elements
- **Elements**: Individual form components with validation

### Sample Configuration Structure

```json
{
  "status": "Success",
  "data": {
    "page": {
      "pageName": "Field Investigation",
      "tabs": [
        {
          "rbackey": "applicant",
          "tabName": "Applicant",
          "sections": [
            {
              "rbackey": "kyc_details",
              "sectionName": "KYC Details",
              "elements": [
                {
                  "component": "textfield",
                  "apiKey": "mobileNumber",
                  "label": "Mobile Number",
                  "validation": {
                    "required": true,
                    "maxLength": 10
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## 📝 Form Components

### Available Components

1. **TextField** - Text input with validation and prefix support
2. **RadioButton** - Radio button groups with dependent fields
3. **Dropdown** - Single select dropdown with API-driven options
4. **MultiDropdown** - Multi-select dropdown with tag display
5. **TextAreaSmall** - Multi-line text input
6. **ImageUploader** - Single image upload with preview
7. **DynamicImages** - Multiple image upload with gallery
8. **LocationComponent** - GPS location capture with Google Maps integration

### Component Features

- **Validation**: Required, min/max length, pattern matching
- **Conditional Rendering**: Show/hide fields based on other field values
- **API Integration**: Dynamic options from backend APIs
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsive**: Mobile-optimized layouts

## 🔄 State Management

### ConfigContext
- Manages global configuration state
- Handles API calls for configuration data
- Provides loading and error states

### FormContext
- Manages form data across all components
- Handles validation state and errors
- Provides field-level state management

## 🌐 API Integration

The application includes a comprehensive API layer:

- **Configuration API**: Fetches dynamic UI configuration
- **Dropdown Options**: Loads options for dropdown components
- **File Upload**: Handles image and file uploads
- **Section Save**: Saves form data by section

### Mock Data
Currently uses mock data for development. Replace API calls in `src/services/api.js` with actual endpoints.

## 🎨 Styling

Uses Tailwind CSS with custom component classes:

- `.form-input` - Styled form inputs
- `.form-label` - Form labels
- `.form-error` - Error messages
- `.btn-primary` - Primary buttons
- `.btn-secondary` - Secondary buttons

## 🔍 Validation

Comprehensive validation system supporting:

- Required fields
- String length validation
- Pattern matching (regex)
- Number range validation
- Email and phone validation
- Section-level validation

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation with mobile menu
- Adaptive form layouts
- Touch-friendly interactions

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

## 🔧 Customization

### Adding New Components

1. Create component in `src/components/form/`
2. Add to `ComponentFactory.jsx`
3. Update validation utilities if needed

### Extending Validation

Add new validation rules in `src/utils/validation.js`

### API Configuration

Update endpoints in `src/services/api.js`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please create an issue in the repository.
