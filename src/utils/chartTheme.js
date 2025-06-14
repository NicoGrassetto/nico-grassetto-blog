/**
 * Chart theme utilities for consistent dark/light mode support
 */

// Color palettes optimized for accessibility in both themes
export const CHART_COLORS = {
  light: {
    primary: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'],
    secondary: ['#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#22d3ee'],
    background: '#ffffff',
    text: '#1a202c',
    grid: 'rgba(0, 0, 0, 0.1)',
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  dark: {
    primary: ['#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#22d3ee'],
    secondary: ['#93c5fd', '#fca5a5', '#6ee7b7', '#fcd34d', '#c4b5fd', '#f9a8d4', '#67e8f9'],
    background: '#2d3748',
    text: '#e2e8f0',
    grid: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.3)'
  }
};

/**
 * Get current theme colors based on document attribute
 */
export function getThemeColors() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  return CHART_COLORS[theme] || CHART_COLORS.dark;
}

/**
 * Apply theme colors to a dataset
 */
export function applyThemeToDataset(dataset, colorIndex = 0, theme = null) {
  const colors = theme || getThemeColors();
  const color = colors.primary[colorIndex % colors.primary.length];
  
  return {
    ...dataset,
    borderColor: dataset.borderColor || color,
    backgroundColor: dataset.backgroundColor || (color + '20'), // 20% opacity
    pointBackgroundColor: dataset.pointBackgroundColor || color,
    pointBorderColor: dataset.pointBorderColor || color,
  };
}

/**
 * Update chart options for current theme
 */
export function updateChartOptionsForTheme(options, theme = null) {
  const colors = theme || getThemeColors();
  
  const updatedOptions = JSON.parse(JSON.stringify(options)); // Deep clone
  
  // Update title color
  if (updatedOptions.plugins?.title) {
    updatedOptions.plugins.title.color = colors.text;
  }
  
  // Update legend color
  if (updatedOptions.plugins?.legend?.labels) {
    updatedOptions.plugins.legend.labels.color = colors.text;
  }
  
  // Update scales colors
  if (updatedOptions.scales) {
    Object.keys(updatedOptions.scales).forEach(scaleKey => {
      const scale = updatedOptions.scales[scaleKey];
      if (scale.ticks) {
        scale.ticks.color = colors.text;
      }
      if (scale.grid) {
        scale.grid.color = colors.grid;
      }
      if (scale.title) {
        scale.title.color = colors.text;
      }
    });
  }
  
  return updatedOptions;
}

/**
 * Create a theme-aware chart configuration
 */
export function createThemeAwareChartConfig(type, data, options = {}) {
  const colors = getThemeColors();
  
  // Apply theme to datasets
  const themedData = {
    ...data,
    datasets: data.datasets?.map((dataset, index) => 
      applyThemeToDataset(dataset, index, colors)
    ) || []
  };
  
  // Apply theme to options
  const themedOptions = updateChartOptionsForTheme({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: colors.text
        }
      },
      ...options.plugins
    },
    scales: type !== 'pie' && type !== 'doughnut' && type !== 'polarArea' ? {
      x: {
        ticks: { color: colors.text },
        grid: { color: colors.grid }
      },
      y: {
        ticks: { color: colors.text },
        grid: { color: colors.grid }
      },
      ...options.scales
    } : options.scales,
    ...options
  }, colors);
  
  return {
    type,
    data: themedData,
    options: themedOptions
  };
}
