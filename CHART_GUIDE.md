# Chart Implementation Guide for Astro Blog

## Overview

I've implemented multiple approaches for adding charts to your Astro blog. The white rectangles you're seeing indicate that Chart.js isn't rendering properly. Here are the solutions and troubleshooting steps:

## What We've Implemented

### 1. Chart Components Created

- `Chart.astro` - Generic chart component for all chart types
- `LineChart.astro` - Specialized line chart component  
- `ScatterChart.astro` - Specialized scatter plot component
- `SimpleChart.astro` - Simplified chart with inline scripts
- `ModularChart.astro` - Chart using ES6 module imports

### 2. Two Usage Methods

#### Method 1: MDX Files (Recommended)
Create `.mdx` files instead of `.md` files and import components directly:

```mdx
---
title: "My Chart Post"
date: "2025-06-14"
image: "/nico-grassetto-blog/images/blog-icon.png"
description: "A post with charts"
---

import Chart from '../../components/Chart.astro';

# My Post

<Chart 
  type="bar"
  data={{
    labels: ['A', 'B', 'C'],
    datasets: [{
      label: 'Data',
      data: [10, 20, 30],
      backgroundColor: '#3b82f6'
    }]
  }}
/>
```

#### Method 2: Regular Markdown with Frontmatter
(This approach had YAML parsing issues, so stick with MDX for now)

## Troubleshooting the White Rectangle Issue

### Problem Diagnosis
The white rectangles appear when:
1. Chart.js library doesn't load
2. JavaScript errors prevent chart rendering
3. Canvas element isn't found
4. Chart data is malformed

### Solution Steps

#### Step 1: Check Browser Console
1. Open your blog in the browser
2. Press F12 to open Developer Tools
3. Go to the Console tab
4. Look for JavaScript errors

#### Step 2: Verify Chart.js Loading
In the browser console, type:
```javascript
typeof Chart
```
It should return `"function"`. If it returns `"undefined"`, Chart.js isn't loading.

#### Step 3: Test Basic Chart.js
I created a test file at `/nico-grassetto-blog/chart-test.html`. Visit:
```
http://localhost:4321/nico-grassetto-blog/chart-test.html
```

If this works, the issue is in our Astro integration.

### Quick Fix Attempts

#### Option 1: Use CDN in Layout
The layout already includes Chart.js via CDN. Try changing to a different CDN:

```html
<!-- Instead of current CDN, try: -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js"></script>
```

#### Option 2: Use the SimpleChart Component
Try the `SimpleChart.astro` component which has more debugging:

```mdx
import SimpleChart from '../../components/SimpleChart.astro';

<SimpleChart 
  type="bar"
  data={{
    labels: ['Test'],
    datasets: [{
      label: 'Test',
      data: [100],
      backgroundColor: '#ff0000'
    }]
  }}
/>
```

#### Option 3: Client-Side Only Approach
Create a component that only renders on the client:

```astro
---
// ClientChart.astro
const { type, data, options = {} } = Astro.props;
const id = 'chart-' + Math.random().toString(36).substr(2, 9);
---

<div id={`container-${id}`}>
  <canvas id={id}></canvas>
</div>

<script type="module">
  import { Chart, registerables } from 'https://cdn.skypack.dev/chart.js';
  Chart.register(...registerables);
  
  const canvas = document.getElementById('{id}');
  new Chart(canvas, {
    type: '{type}',
    data: {data},
    options: {options}
  });
</script>
```

## Working Examples

Test these pages to see which approach works:

1. `/blog/chart-demo/` - Original MDX with multiple chart types
2. `/blog/simple-chart-test/` - Simple chart test
3. `/blog/modular-chart-test/` - Modular import approach
4. `/chart-test.html` - Basic HTML test

## Debugging Commands

Run these in the browser console on your chart pages:

```javascript
// Check if Chart.js is loaded
console.log('Chart.js loaded:', typeof Chart !== 'undefined');

// List all canvas elements
console.log('Canvas elements:', document.querySelectorAll('canvas'));

// Check for chart instances
document.querySelectorAll('canvas').forEach(canvas => {
  console.log('Canvas ID:', canvas.id, 'Has chart:', !!canvas.chart);
});
```

## Common Chart.js Data Formats

### Bar Chart
```javascript
{
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
}
```

### Line Chart
```javascript
{
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'My Line Dataset',
    data: [65, 59, 80],
    borderColor: '#36A2EB',
    backgroundColor: '#36A2EB20'
  }]
}
```

### Pie Chart
```javascript
{
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
}
```

## Next Steps

1. **Check the basic HTML test first** - This will confirm Chart.js works
2. **Check browser console** for any JavaScript errors
3. **Try the SimpleChart component** which has more debugging output
4. **If still failing**, we may need to use a different charting library like D3.js or Plotly

## Alternative Libraries

If Chart.js continues to have issues, consider:

- **Plotly.js** - More scientific charts, good for data analysis
- **D3.js** - Maximum flexibility, steeper learning curve  
- **Observable Plot** - Modern, simple syntax
- **Recharts** - If you want to use React components

Let me know what you see in the browser console and which test pages work!
