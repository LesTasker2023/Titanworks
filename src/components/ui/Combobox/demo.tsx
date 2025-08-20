'use client';

import { Building, Filter, Globe, MapPin, Search, Star, Tag, Users } from 'lucide-react';
import { useState } from 'react';
import { Combobox } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

// Sample data for different use cases
const countries = [
  { value: 'us', label: 'United States', flag: '🇺🇸', continent: 'North America' },
  { value: 'ca', label: 'Canada', flag: '🇨🇦', continent: 'North America' },
  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
  { value: 'de', label: 'Germany', flag: '🇩🇪', continent: 'Europe' },
  { value: 'fr', label: 'France', flag: '🇫🇷', continent: 'Europe' },
  { value: 'jp', label: 'Japan', flag: '🇯🇵', continent: 'Asia' },
  { value: 'au', label: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
  { value: 'br', label: 'Brazil', flag: '🇧🇷', continent: 'South America' },
];

const companies = [
  { value: 'apple', label: 'Apple Inc.', industry: 'Technology', employees: '161,000' },
  { value: 'microsoft', label: 'Microsoft', industry: 'Technology', employees: '221,000' },
  { value: 'google', label: 'Google (Alphabet)', industry: 'Technology', employees: '174,000' },
  { value: 'amazon', label: 'Amazon', industry: 'E-commerce', employees: '1,541,000' },
  { value: 'tesla', label: 'Tesla', industry: 'Automotive', employees: '127,000' },
  { value: 'meta', label: 'Meta (Facebook)', industry: 'Social Media', employees: '86,000' },
  { value: 'netflix', label: 'Netflix', industry: 'Entertainment', employees: '12,800' },
  { value: 'salesforce', label: 'Salesforce', industry: 'Software', employees: '79,000' },
];

const technologies = [
  { value: 'react', label: 'React', category: 'Frontend Framework', popularity: 'High' },
  { value: 'nextjs', label: 'Next.js', category: 'Full-stack Framework', popularity: 'High' },
  {
    value: 'typescript',
    label: 'TypeScript',
    category: 'Programming Language',
    popularity: 'High',
  },
  { value: 'nodejs', label: 'Node.js', category: 'Runtime Environment', popularity: 'High' },
  { value: 'postgresql', label: 'PostgreSQL', category: 'Database', popularity: 'High' },
  { value: 'docker', label: 'Docker', category: 'Containerization', popularity: 'High' },
  { value: 'aws', label: 'AWS', category: 'Cloud Platform', popularity: 'High' },
  { value: 'graphql', label: 'GraphQL', category: 'Query Language', popularity: 'Medium' },
];

const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-gray-500' },
  { value: 'suspended', label: 'Suspended', color: 'bg-red-500' },
];

export default function ComboboxDemo() {
  const [basicValue, setBasicValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [techValue, setTechValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);

  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  const handleMultiSelect = (value: string) => {
    setMultiSelectValues(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const getSelectedCountry = () => countries.find(c => c.value === countryValue);
  const getSelectedCompany = () => companies.find(c => c.value === companyValue);
  const getSelectedTech = () => technologies.find(t => t.value === techValue);
  const getSelectedStatus = () => statusOptions.find(s => s.value === statusValue);

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Combobox Component</h1>
        <p className="text-muted-foreground">
          Powerful searchable select with advanced filtering and enterprise features
        </p>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple searchable select with keyboard navigation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose an Option</label>
              <Combobox
                options={basicOptions}
                value={basicValue}
                onValueChange={setBasicValue}
                placeholder="Select an option..."
                searchPlaceholder="Search options..."
              />
              {basicValue && (
                <p className="text-sm text-muted-foreground">
                  Selected: {basicOptions.find(o => o.value === basicValue)?.label}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status Selection</label>
              <Combobox
                options={statusOptions}
                value={statusValue}
                onValueChange={setStatusValue}
                placeholder="Choose status..."
              />
              {getSelectedStatus() && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getSelectedStatus()?.color}`} />
                  <span className="text-sm">{getSelectedStatus()?.label}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Use Cases */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Enterprise Data Selection</h3>
            <p className="text-sm text-muted-foreground">
              Real-world scenarios with rich data and contextual information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Country Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <h4 className="font-medium">Country Selection</h4>
              </div>

              <Combobox
                options={countries.map(c => ({ value: c.value, label: `${c.flag} ${c.label}` }))}
                value={countryValue}
                onValueChange={setCountryValue}
                placeholder="Search countries..."
                searchPlaceholder="Type to search countries..."
              />

              {getSelectedCountry() && (
                <div className="p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getSelectedCountry()?.flag}</span>
                    <span className="font-medium">{getSelectedCountry()?.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Continent: {getSelectedCountry()?.continent}
                  </p>
                </div>
              )}
            </div>

            {/* Company Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <h4 className="font-medium">Company Database</h4>
              </div>

              <Combobox
                options={companies.map(c => ({ value: c.value, label: c.label }))}
                value={companyValue}
                onValueChange={setCompanyValue}
                placeholder="Search companies..."
                searchPlaceholder="Search by company name..."
              />

              {getSelectedCompany() && (
                <div className="p-3 border rounded-lg bg-muted/50">
                  <h5 className="font-medium mb-1">{getSelectedCompany()?.label}</h5>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3" />
                      <span>Industry: {getSelectedCompany()?.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Employees: {getSelectedCompany()?.employees}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <h4 className="font-medium">Technology Stack Selection</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Combobox
                options={technologies.map(t => ({ value: t.value, label: t.label }))}
                value={techValue}
                onValueChange={setTechValue}
                placeholder="Choose technology..."
                searchPlaceholder="Search technologies..."
              />

              {getSelectedTech() && (
                <div className="p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{getSelectedTech()?.label}</h5>
                    <Badge
                      variant={getSelectedTech()?.popularity === 'High' ? 'default' : 'secondary'}
                    >
                      {getSelectedTech()?.popularity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Category: {getSelectedTech()?.category}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Multi-Select Simulation */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Multi-Selection Pattern</h3>
            <p className="text-sm text-muted-foreground">
              Simulating multi-select behavior with multiple comboboxes
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <h4 className="font-medium">Select Multiple Technologies</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Combobox
                  options={technologies
                    .filter(t => !multiSelectValues.includes(t.value))
                    .map(t => ({ value: t.value, label: t.label }))}
                  value=""
                  onValueChange={handleMultiSelect}
                  placeholder="Add technology..."
                  searchPlaceholder="Search to add..."
                />

                <div className="flex flex-wrap gap-2">
                  {multiSelectValues.map(value => {
                    const tech = technologies.find(t => t.value === value);
                    return tech ? (
                      <Badge key={value} variant="secondary" className="flex items-center gap-1">
                        {tech.label}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleMultiSelect(value)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Selected Stack ({multiSelectValues.length})</h5>
                <div className="p-3 border rounded-lg bg-muted/50 min-h-[100px]">
                  {multiSelectValues.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No technologies selected</p>
                  ) : (
                    <div className="space-y-2">
                      {multiSelectValues.map(value => {
                        const tech = technologies.find(t => t.value === value);
                        return tech ? (
                          <div key={value} className="flex items-center justify-between text-sm">
                            <span>{tech.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {tech.category}
                            </Badge>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Location Services</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• City/region selection</p>
                <p>• Timezone management</p>
                <p>• Shipping destination picker</p>
                <p>• Office location assignment</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Role assignment</p>
                <p>• Team member selection</p>
                <p>• Permission level picker</p>
                <p>• Department assignment</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">Product Catalog</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• SKU selection</p>
                <p>• Category management</p>
                <p>• Supplier assignment</p>
                <p>• Inventory location picker</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Key Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Keyboard navigation</div>
              <div>• Type-ahead search</div>
              <div>• Accessibility support</div>
              <div>• Custom rendering</div>
              <div>• Large dataset handling</div>
              <div>• Async data loading</div>
              <div>• Multi-select patterns</div>
              <div>• Validation integration</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
