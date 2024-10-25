import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, Copy, PlayCircle, RotateCcw } from 'lucide-react';
import styles from './api-tester.module.css';
import CodeBlock from '@theme/CodeBlock';

export type RequestParameter = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  default?: any;
};

export type ApiTesterProps = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  parameters: RequestParameter[];
  defaultValues?: Record<string, any>;
  exampleResponse: any;
  title?: string;
  hideEditor?: boolean;
  testMode?: 'live' | 'mock';
  mockDelay?: number;
  onTest?: (requestData: any) => Promise<any>;
};

const ApiTester = ({
  endpoint,
  method = 'POST',
  headers = { 'Content-Type': 'application/json' },
  parameters = [],
  defaultValues = {},
  exampleResponse,
  title = 'Request',
  hideEditor = false,
  testMode = 'mock',
  mockDelay = 1000,
  onTest,
}: ApiTesterProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(exampleResponse);
  const [hasBeenTested, setHasBeenTested] = useState(false);
  const [error, setError] = useState(null);
  const [curlCommand, setCurlCommand] = useState('');

  const initialFormData = parameters.reduce((acc, param) => ({
    ...acc,
    [param.name]: defaultValues[param.name] ?? param.default
  }), {});
  
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setCurlCommand(generateCurlCommand());
  }, [formData]);

  const handleInputChange = (key: string, value: any) => {
    try {
      const parameter = parameters.find(p => p.name === key);
      let parsedValue = value;
      
      if (parameter) {
        switch (parameter.type) {
          case 'number':
            parsedValue = value === '' ? '' : Number(value);
            break;
          case 'boolean':
            parsedValue = Boolean(value);
            break;
          case 'object':
          case 'array':
            parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
            break;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [key]: parsedValue
      }));
    } catch (err) {
      console.error(`Error parsing value for ${key}:`, err);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let testResponse;
      
      if (testMode === 'live' && onTest) {
        testResponse = await onTest(formData);
      } else {
        await new Promise(resolve => setTimeout(resolve, mockDelay));
        testResponse = {
          ...exampleResponse,
          requestTime: new Date().toISOString(),
          requestData: formData
        };
      }
      
      setResponse(testResponse);
      setHasBeenTested(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(exampleResponse);
    setHasBeenTested(false);
    setError(null);
  };

  const generateCurlCommand = () => {
    const curlParts = [
      `curl -X ${method} '${endpoint}' ${Object.entries(headers).map(([key, value]) => `-H '${key}: ${value}'`).join(' ')} \\`
    ];
    
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      curlParts.push(`  --data-raw '{\n${Object.entries(formData).map(([key, value]) => `    "${key}": ${JSON.stringify(value)}`).join(',\n')}\n  }'`);
    }
    
    return curlParts.join('\n');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderInput = (param: RequestParameter) => {
    switch (param.type) {
      case 'boolean':
        return (
          <ToggleSwitch
            checked={formData[param.name]}
            onChange={(checked) => handleInputChange(param.name, checked)}
          />
        );
      case 'object':
      case 'array':
        return (
          <textarea
            className={styles.textarea}
            value={JSON.stringify(formData[param.name], null, 2)}
            onChange={(e) => handleInputChange(param.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTest();
              }
            }}
            rows={3}
          />
        );
      default:
        return (
          <input
            className={styles.input}
            value={formData[param.name]}
            onChange={(e) => handleInputChange(param.name, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTest();
              }
            }}
            type={param.type === 'number' ? 'number' : 'text'}
          />
        );
    }
  };

  const formatResponse = (response: any) => {
    return `{
${Object.entries(response).map(([key, value]) => `  "${key}": ${JSON.stringify(value)}`).join(',\n')}
}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.header}>
          <div>
            <h3>{title}</h3>
          </div>
          {!hideEditor && (
            <div className={styles.editorToggle}>
              <ToggleSwitch
                checked={isEditable}
                onChange={setIsEditable}
              />
              <span className={styles.toggleLabel}>
                Edit Request
              </span>
            </div>
          )}
        </div>
        {isEditable ? (
          <div className={styles.formContainer}>
            {parameters.map((param) => (
              <div key={param.name} className={styles.formRow}>
                <label className={styles.label}>
                  {param.name}
                  {param.required && <span className={styles.required}>*</span>}:
                </label>
                {renderInput(param)}
              </div>
            ))}
          </div>
        ) : (
          <CodeBlock language="bash">
            {curlCommand}
          </CodeBlock>
        )}
        <div className={styles.actions}>
          <button
            className={styles.buttonOutline}
            onClick={() => copyToClipboard(curlCommand)}
          >
            <Copy className={styles.icon} />
            Copy
          </button>
          <button
            className={styles.buttonPrimary}
            onClick={handleTest}
            disabled={loading}
          >
            <PlayCircle className={styles.icon} />
            Test Request
          </button>
        </div>
      </div>

      <div className={styles.responseSection}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h3>Response</h3>
            {hasBeenTested ? (
              <span className={styles.responseLabel}>(Test Result)</span>
            ) : (
              <span className={styles.responseLabel}>(Example)</span>
            )}
          </div>
          {hasBeenTested && (
            <button
              className={styles.buttonGhost}
              onClick={handleReset}
            >
              <RotateCcw className={styles.icon} />
              Reset
            </button>
          )}
        </div>

        {error && (
          <div className={styles.alertError}>
            <AlertCircle className={styles.icon} />
            <span>{error}</span>
          </div>
        )}

        <div>
          <CodeBlock language="json">
            {formatResponse(response)}
          </CodeBlock>
          {response?.status === 'success' && hasBeenTested && (
            <div className={styles.alertSuccess}>
              <Check className={styles.icon} />
              <span>Request successful!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTester;

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};
