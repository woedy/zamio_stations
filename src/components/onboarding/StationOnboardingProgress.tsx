import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowRightIcon,
  RadioIcon,
  UserIcon,
  CreditCardIcon,
  UsersIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface StationOnboardingProgressProps {
  className?: string;
  showActions?: boolean;
}

interface OnboardingStatus {
  profile_completed: boolean;
  staff_completed: boolean;
  payment_info_added: boolean;
  kyc_status: string;
  profile_complete_percentage: number;
  next_recommended_step: string;
  compliance_setup: {
    license_number: string;
    station_class: string;
    station_type: string;
    compliance_complete: boolean;
  };
  stream_links: Array<{
    id: number;
    link: string;
    active: boolean;
  }>;
}

const StationOnboardingProgress: React.FC<StationOnboardingProgressProps> = ({ 
  className = "", 
  showActions = true 
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  const loadOnboardingStatus = async () => {
    try {
      // This would be replaced with actual API call
      // const response = await api.get(`api/accounts/enhanced-station-onboarding-status/${getStationId()}/`);
      // setStatus(response.data.data);
      
      // Mock data for now
      setStatus({
        profile_completed: true,
        staff_completed: false,
        payment_info_added: false,
        kyc_status: 'pending',
        profile_complete_percentage: 33,
        next_recommended_step: 'staff',
        compliance_setup: {
          license_number: 'GH-FM-001',
          station_class: 'class_b',
          station_type: 'commercial',
          compliance_complete: true
        },
        stream_links: [
          { id: 1, link: 'https://stream.example.com/live', active: true }
        ]
      });
    } catch (error) {
      console.error('Failed to load onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (stepKey: string) => {
    const icons = {
      profile: RadioIcon,
      staff: UsersIcon,
      compliance: SignalIcon,
      payment: CreditCardIcon
    };
    return icons[stepKey as keyof typeof icons] || UserIcon;
  };

  const getStepStatus = (stepKey: string) => {
    if (!status) return 'pending';
    
    switch (stepKey) {
      case 'profile':
        return status.profile_completed ? 'completed' : 'pending';
      case 'staff':
        return status.staff_completed ? 'completed' : 'pending';
      case 'compliance':
        return status.compliance_setup.compliance_complete ? 'completed' : 'pending';
      case 'payment':
        return status.payment_info_added ? 'completed' : 'pending';
      default:
        return 'pending';
    }
  };

  const getStatusColor = (stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return '#10B981'; // green
      case 'in_progress':
        return '#F59E0B'; // yellow
      case 'pending':
        return '#6B7280'; // gray
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return CheckCircleIcon;
      case 'in_progress':
        return ExclamationTriangleIcon;
      default:
        return null;
    }
  };

  const steps = [
    {
      key: 'profile',
      title: 'Station Profile',
      description: 'Complete your station profile and basic information',
      isRequired: true
    },
    {
      key: 'compliance',
      title: 'Compliance Setup',
      description: 'Configure licensing and regulatory information',
      isRequired: true
    },
    {
      key: 'staff',
      title: 'Staff Management',
      description: 'Add staff members and assign roles',
      isRequired: false
    },
    {
      key: 'payment',
      title: 'Payment Setup',
      description: 'Add payment details for transactions',
      isRequired: false
    }
  ];

  const handleContinueOnboarding = () => {
    navigate('/onboarding');
  };

  const handleCompleteStep = (stepKey: string) => {
    navigate(`/onboarding?step=${stepKey}`);
  };

  if (loading) {
    return (
      <div className={`p-6 rounded-lg border bg-white ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  const completedSteps = steps.filter(step => getStepStatus(step.key) === 'completed').length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className={`p-6 rounded-lg border bg-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Station Setup
          </h3>
          <p className="text-sm text-gray-600">
            {completedSteps}/{steps.length} steps completed ({Math.round(progressPercentage)}%)
          </p>
        </div>
        
        {showActions && progressPercentage < 100 && (
          <button
            onClick={handleContinueOnboarding}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Continue Setup</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const stepStatus = getStepStatus(step.key);
          const StepIcon = getStepIcon(step.key);
          const StatusIcon = getStatusIcon(stepStatus);
          const statusColor = getStatusColor(stepStatus);

          return (
            <div key={step.key} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: stepStatus === 'completed' ? statusColor : 'transparent',
                    border: stepStatus !== 'completed' ? `2px solid ${statusColor}` : 'none'
                  }}
                >
                  {StatusIcon ? (
                    <StatusIcon className="w-5 h-5 text-white" />
                  ) : (
                    <StepIcon 
                      className="w-4 h-4" 
                      style={{ color: stepStatus === 'completed' ? 'white' : statusColor }} 
                    />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p
                    className={`text-sm font-medium ${
                      stepStatus === 'completed' ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.isRequired && stepStatus !== 'completed' && (
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {step.description}
                </p>
              </div>

              {showActions && stepStatus !== 'completed' && (
                <button
                  onClick={() => handleCompleteStep(step.key)}
                  className="text-xs px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  Complete
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Stream Links Status */}
      {status.stream_links.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
          <div className="flex items-start space-x-3">
            <SignalIcon className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800">
                Stream Links Configured
              </p>
              <p className="text-sm text-blue-700">
                {status.stream_links.filter(link => link.active).length} of {status.stream_links.length} stream links are active
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Status */}
      {status.compliance_setup.compliance_complete && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">
                Compliance Setup Complete
              </p>
              <p className="text-sm text-green-700">
                License: {status.compliance_setup.license_number} | 
                Class: {status.compliance_setup.station_class} | 
                Type: {status.compliance_setup.station_type}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {progressPercentage === 100 && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            <div>
              <p className="font-medium text-green-800">
                Station Setup Complete!
              </p>
              <p className="text-sm text-green-700">
                Your station is ready to start monitoring and reporting airplay.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationOnboardingProgress;