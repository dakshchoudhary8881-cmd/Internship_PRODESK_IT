export const STORAGE_KEY = 'prodesk_it_onboarding_wizard_data';
export const STORAGE_STEP_KEY = 'prodesk_it_onboarding_wizard_step';

export const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  country: '',
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
};

export const WIZARD_STEPS = [
  { id: 1, title: 'Personal Info', description: 'Your personal details' },
  { id: 2, title: 'Account Details', description: 'Security & role setup' },
  { id: 3, title: 'Review & Submit', description: 'Verify your information' },
];

export const COUNTRY_OPTIONS = [
  { value: 'United States', label: '🇺🇸 United States' },
  { value: 'United Kingdom', label: '🇬🇧 United Kingdom' },
  { value: 'Canada', label: '🇨🇦 Canada' },
  { value: 'Australia', label: '🇦🇺 Australia' },
  { value: 'Germany', label: '🇩🇪 Germany' },
  { value: 'France', label: '🇫🇷 France' },
  { value: 'Japan', label: '🇯🇵 Japan' },
  { value: 'India', label: '🇮🇳 India' },
  { value: 'Singapore', label: '🇸🇬 Singapore' },
  { value: 'Brazil', label: '🇧🇷 Brazil' },
];

export const ROLE_OPTIONS = [
  { value: 'Student', label: '🎓 Student' },
  { value: 'Developer', label: '💻 Developer' },
  { value: 'Designer', label: '🎨 Designer' },
  { value: 'Manager', label: '📊 Manager' },
];
