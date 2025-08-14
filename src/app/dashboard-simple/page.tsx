'use client';

import { useEffect, useState } from 'react';

interface QualityReport {
  metadata: {
    reportType: string;
    version: string;
    timestamp: string;
    totalComponents: number;
    passingComponents: number;
    overallScore: number;
    grade: string;
  };
  systemHealth: {
    build: { status: string; passed: boolean };
    typescript: { status: string; passed: boolean };
    linting: { status: string; passed: boolean };
    tests: { passed: number; failed: number; total: number; passRate: number };
  };
  components: Record<
    string,
    {
      score: number;
      status: string;
      context: string;
      issues: string[] | string;
      passing: boolean;
      lastUpdated: string;
    }
  >;
  commonIssues: Array<{
    type: string;
    description: string;
    count: number;
    affectedComponents: string[];
  }>;
  history: Array<{
    version: string;
    timestamp: string;
    overallScore: number;
    passingComponents: number;
    totalComponents: number;
  }>;
}

export default function QualityDashboard() {
  const [qualityData, setQualityData] = useState<QualityReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load quality report data
    const loadQualityData = async () => {
      try {
        const response = await fetch('/quality-report.json');
        const data = await response.json();
        setQualityData(data);
      } catch (error) {
        console.error('Failed to load quality data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQualityData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div
          style={{
            width: '300px',
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            margin: '0 auto 1rem auto',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '33%',
              height: '100%',
              backgroundColor: '#4CAF50',
              borderRadius: '10px',
            }}
          />
        </div>
        <p style={{ color: '#666' }}>Loading quality dashboard...</p>
      </div>
    );
  }

  if (!qualityData) {
    return (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          margin: '2rem',
        }}
      >
        <h3 style={{ color: '#c33' }}>Unable to load quality data</h3>
        <p>
          The quality report JSON file could not be loaded. Please ensure the audit has been run.
        </p>
      </div>
    );
  }

  const getGradeColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 80) return '#2196F3';
    if (score >= 70) return '#FF9800';
    return '#f44336';
  };

  const getStatusColor = (status: string) => {
    return status === 'PASS' ? '#4CAF50' : '#f44336';
  };

  const componentEntries = Object.entries(qualityData.components);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            margin: '0 0 1rem 0',
            fontWeight: 'bold',
          }}
        >
          TriggerKings Quality Dashboard
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, margin: '0 0 2rem 0' }}>
          Real-time component quality monitoring and system health
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}
          >
            Version: {qualityData.metadata.version}
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}
          >
            Grade: {qualityData.metadata.grade}
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}
          >
            Updated: {new Date(qualityData.metadata.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Overall Score Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Overall Quality Score</h2>
          <p style={{ color: '#666', margin: '0 0 2rem 0' }}>
            Deductive scoring system - start at 100, lose points for issues
          </p>

          <div
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: getGradeColor(qualityData.metadata.overallScore),
              margin: '0 0 1rem 0',
            }}
          >
            {qualityData.metadata.overallScore}/100
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '20px',
              backgroundColor: '#e0e0e0',
              borderRadius: '10px',
              margin: '0 auto 2rem auto',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${qualityData.metadata.overallScore}%`,
                height: '100%',
                backgroundColor: getGradeColor(qualityData.metadata.overallScore),
                borderRadius: '10px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3' }}>
                {qualityData.metadata.passingComponents}
              </div>
              <div style={{ color: '#666' }}>Components Passing</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9C27B0' }}>
                {qualityData.metadata.totalComponents}
              </div>
              <div style={{ color: '#666' }}>Total Components</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>
                {qualityData.systemHealth.tests.passRate}%
              </div>
              <div style={{ color: '#666' }}>Test Pass Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800' }}>
                {qualityData.commonIssues.length}
              </div>
              <div style={{ color: '#666' }}>Issue Types</div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ margin: '0 0 1rem 0' }}>System Health Status</h2>
          <p style={{ color: '#666', margin: '0 0 2rem 0' }}>
            Build, TypeScript, Linting, and Test validation
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              {
                label: 'Build',
                status: qualityData.systemHealth.build.status,
                passed: qualityData.systemHealth.build.passed,
              },
              {
                label: 'TypeScript',
                status: qualityData.systemHealth.typescript.status,
                passed: qualityData.systemHealth.typescript.passed,
              },
              {
                label: 'Linting',
                status: qualityData.systemHealth.linting.status,
                passed: qualityData.systemHealth.linting.passed,
              },
              {
                label: 'Tests',
                status: `${qualityData.systemHealth.tests.passed}/${qualityData.systemHealth.tests.total}`,
                passed: qualityData.systemHealth.tests.failed === 0,
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: item.passed ? '#4CAF50' : '#f44336',
                  }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.label}</div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: 'white',
              padding: '0.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {[
              { id: 'overview', label: 'Component Overview' },
              { id: 'issues', label: 'Common Issues' },
              { id: 'history', label: 'Quality History' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: activeTab === tab.id ? '#667eea' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#666',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ margin: '0 0 2rem 0' }}>Component Quality Analysis</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {componentEntries.map(([name, data]) => (
                <div
                  key={name}
                  style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: '0 0 0.5rem 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: getGradeColor(data.score),
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                          }}
                        >
                          {name[0]}
                        </div>
                        {name}
                      </h3>
                      <p style={{ margin: '0', color: '#666' }}>{data.context}</p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <div
                          style={{
                            width: '100px',
                            height: '8px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${data.score}%`,
                              height: '100%',
                              backgroundColor: getGradeColor(data.score),
                              borderRadius: '4px',
                            }}
                          />
                        </div>
                        <span style={{ fontWeight: 'bold', minWidth: '60px' }}>
                          {data.score}/100
                        </span>
                      </div>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: data.status === 'PASS' ? '#e8f5e8' : '#fee',
                          color: getStatusColor(data.status),
                        }}
                      >
                        {data.status}
                      </span>
                    </div>
                  </div>

                  {data.issues &&
                    (Array.isArray(data.issues) ? data.issues.length > 0 : data.issues !== '') && (
                      <div
                        style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid #f0f0f0',
                        }}
                      >
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                          Issues to Address:
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {(Array.isArray(data.issues) ? data.issues : [data.issues]).map(
                            (issue, index) => (
                              <div
                                key={index}
                                style={{
                                  padding: '0.5rem 0.75rem',
                                  backgroundColor: '#fff3cd',
                                  border: '1px solid #ffeaa7',
                                  borderRadius: '4px',
                                  fontSize: '0.9rem',
                                  color: '#856404',
                                }}
                              >
                                • {issue}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {qualityData.commonIssues.map((issue, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: '0 0 0.5rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor:
                            issue.type === 'NEEDS_CVA'
                              ? '#fee'
                              : issue.type === 'MISSING_TESTS'
                                ? '#e3f2fd'
                                : '#f3e5f5',
                          color:
                            issue.type === 'NEEDS_CVA'
                              ? '#c33'
                              : issue.type === 'MISSING_TESTS'
                                ? '#1976d2'
                                : '#7b1fa2',
                        }}
                      >
                        {issue.type}
                      </span>
                      {issue.description}
                    </h3>
                    <p style={{ margin: '0', color: '#666' }}>
                      Affects {issue.count} component{issue.count > 1 ? 's' : ''}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                    }}
                  >
                    {issue.count}x
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {issue.affectedComponents.map(comp => (
                    <span
                      key={comp}
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        backgroundColor: '#e8f5e8',
                        color: '#2e7d32',
                      }}
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ margin: '0 0 2rem 0' }}>Quality Score History</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {qualityData.history
                .slice(-10)
                .reverse()
                .map((entry, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          backgroundColor: '#f5f5f5',
                          color: '#333',
                        }}
                      >
                        v{entry.version}
                      </span>
                      <span style={{ color: '#666', fontSize: '0.9rem' }}>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold' }}>{entry.overallScore}/100</div>
                        <div style={{ color: '#666', fontSize: '0.8rem' }}>
                          {entry.passingComponents}/{entry.totalComponents} passing
                        </div>
                      </div>
                      <div
                        style={{
                          width: '100px',
                          height: '8px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${entry.overallScore}%`,
                            height: '100%',
                            backgroundColor: getGradeColor(entry.overallScore),
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Raw JSON Viewer */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ margin: '0 0 1rem 0' }}>Raw JSON Data</h2>
          <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
            Complete audit data for development and integration
          </p>
          <pre
            style={{
              backgroundColor: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              overflow: 'auto',
              maxHeight: '300px',
              fontSize: '0.8rem',
              lineHeight: '1.4',
            }}
          >
            {JSON.stringify(qualityData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
