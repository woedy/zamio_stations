import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface BaseChartProps {
  className?: string;
  height?: number;
  responsive?: boolean;
}

// Theme-aware chart options
const useChartTheme = () => {
  const { theme } = useTheme();
  
  return {
    backgroundColor: theme.colors.background,
    textColor: theme.colors.text,
    gridColor: theme.colors.border,
    tooltipBackgroundColor: theme.colors.surface,
    tooltipTextColor: theme.colors.text,
    tooltipBorderColor: theme.colors.border,
  };
};

// Line Chart Component
export interface LineChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      fill?: boolean;
      tension?: number;
    }>;
  };
  options?: any;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  options = {},
  className,
  height = 300,
  responsive = true,
}) => {
  const chartTheme = useChartTheme();

  const defaultOptions = {
    responsive,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: chartTheme.tooltipBackgroundColor,
        titleColor: chartTheme.tooltipTextColor,
        bodyColor: chartTheme.tooltipTextColor,
        borderColor: chartTheme.tooltipBorderColor,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: chartTheme.gridColor,
        },
        ticks: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
        },
      },
      y: {
        grid: {
          color: chartTheme.gridColor,
        },
        ticks: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
        },
      },
    },
    ...options,
  };

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <Line data={data} options={defaultOptions} />
    </div>
  );
};

// Bar Chart Component
export interface BarChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }>;
  };
  options?: any;
  horizontal?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  options = {},
  className,
  height = 300,
  responsive = true,
  horizontal = false,
}) => {
  const chartTheme = useChartTheme();

  const defaultOptions = {
    responsive,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      legend: {
        labels: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: chartTheme.tooltipBackgroundColor,
        titleColor: chartTheme.tooltipTextColor,
        bodyColor: chartTheme.tooltipTextColor,
        borderColor: chartTheme.tooltipBorderColor,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: chartTheme.gridColor,
        },
        ticks: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
        },
      },
      y: {
        grid: {
          color: chartTheme.gridColor,
        },
        ticks: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
        },
      },
    },
    ...options,
  };

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <Bar data={data} options={defaultOptions} />
    </div>
  );
};

// Pie Chart Component
export interface PieChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }>;
  };
  options?: any;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  options = {},
  className,
  height = 300,
  responsive = true,
}) => {
  const chartTheme = useChartTheme();

  const defaultOptions = {
    responsive,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: chartTheme.tooltipBackgroundColor,
        titleColor: chartTheme.tooltipTextColor,
        bodyColor: chartTheme.tooltipTextColor,
        borderColor: chartTheme.tooltipBorderColor,
        borderWidth: 1,
      },
    },
    ...options,
  };

  return (
    <div className={cn('w-full flex justify-center', className)} style={{ height }}>
      <Pie data={data} options={defaultOptions} />
    </div>
  );
};

// Doughnut Chart Component
export interface DoughnutChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }>;
  };
  options?: any;
  centerText?: string;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  options = {},
  className,
  height = 300,
  responsive = true,
  centerText,
}) => {
  const chartTheme = useChartTheme();

  const defaultOptions = {
    responsive,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: chartTheme.textColor,
          font: {
            family: 'Satoshi, sans-serif',
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: chartTheme.tooltipBackgroundColor,
        titleColor: chartTheme.tooltipTextColor,
        bodyColor: chartTheme.tooltipTextColor,
        borderColor: chartTheme.tooltipBorderColor,
        borderWidth: 1,
      },
    },
    ...options,
  };

  return (
    <div className={cn('w-full flex justify-center relative', className)} style={{ height }}>
      <Doughnut data={data} options={defaultOptions} />
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-text dark:text-text">
              {centerText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Chart color palettes for consistent theming
export const chartColors = {
  primary: [
    '#14002C',
    '#AA00BA',
    '#80CAEE',
    '#259AE6',
    '#219653',
    '#FFA70B',
    '#D34053',
    '#6366F1',
  ],
  success: [
    '#10B981',
    '#059669',
    '#047857',
    '#065F46',
  ],
  warning: [
    '#F59E0B',
    '#D97706',
    '#B45309',
    '#92400E',
  ],
  error: [
    '#EF4444',
    '#DC2626',
    '#B91C1C',
    '#991B1B',
  ],
  info: [
    '#3B82F6',
    '#2563EB',
    '#1D4ED8',
    '#1E40AF',
  ],
  gradient: [
    'rgba(20, 0, 44, 0.8)',
    'rgba(170, 0, 186, 0.8)',
    'rgba(128, 202, 238, 0.8)',
    'rgba(37, 154, 230, 0.8)',
    'rgba(33, 150, 83, 0.8)',
    'rgba(255, 167, 11, 0.8)',
    'rgba(211, 64, 83, 0.8)',
    'rgba(99, 102, 241, 0.8)',
  ],
};

// Utility function to generate chart data with theme colors
export const generateChartData = (
  labels: string[],
  datasets: Array<{
    label: string;
    data: number[];
    colorType?: keyof typeof chartColors;
  }>
) => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.colorType 
        ? chartColors[dataset.colorType][index % chartColors[dataset.colorType].length]
        : chartColors.primary[index % chartColors.primary.length],
      borderColor: dataset.colorType 
        ? chartColors[dataset.colorType][index % chartColors[dataset.colorType].length]
        : chartColors.primary[index % chartColors.primary.length],
      borderWidth: 2,
    })),
  };
};