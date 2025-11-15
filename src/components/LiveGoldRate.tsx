// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, CartesianGrid, Area } from 'recharts';
// import { TrendingUp, Calendar, Clock } from 'lucide-react';
// import { getGoldPrices } from '@/integrations/api';


// const LiveGoldRate = () => {
//   const [goldData, setGoldData] = useState([]);
//   const [currentPrice, setCurrentPrice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [error, setError] = useState(null);
//   const [yAxisDomain, setYAxisDomain] = useState([0, 0]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const now = new Date();
//         const currentHour = now.getHours();

//         // If before 9 AM, get previous day data
//         let targetDate;
//         if (currentHour < 9) {
//           const yesterday = new Date(now);
//           yesterday.setDate(yesterday.getDate() - 1);
//           targetDate = yesterday.toISOString().split('T')[0];
//         } else {
//           targetDate = now.toISOString().split('T')[0];
//         }

//         const data = await getGoldPrices(targetDate);

//         if (data && data.length > 0) {
//           // Create time slots from 9 AM to 8 PM with 15-minute intervals
//           const timeSlots = [];
//           for (let hour = 9; hour <= 20; hour++) {
//             for (let minute = 0; minute < 60; minute += 15) {
//               if (hour === 20 && minute > 0) break; // Stop at 8:00 PM
//               const time = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
//               timeSlots.push({
//                 time,
//                 hour,
//                 minute,
//                 price: null,
//                 hasData: false
//               });
//             }
//           }

//           // Map actual data to time slots
//           data.forEach(item => {
//             const dateTime = new Date(item.currentDateTime);
//             const itemHour = dateTime.getHours();
//             const itemMinute = dateTime.getMinutes();

//             // Find the closest 15-minute slot
//             const roundedMinute = Math.floor(itemMinute / 15) * 15;
//             const slotIndex = timeSlots.findIndex(slot =>
//               slot.hour === itemHour && slot.minute === roundedMinute
//             );

//             if (slotIndex !== -1) {
//               timeSlots[slotIndex].price = item.gold_price; // Use raw value as is
//               timeSlots[slotIndex].hasData = true;
//               timeSlots[slotIndex].fullDate = dateTime;
//               timeSlots[slotIndex].id = item.id;
//             }
//           });

//           // Fill gaps with previous price
//           let lastPrice = null;
//           timeSlots.forEach(slot => {
//             if (slot.hasData && slot.price !== null) {
//               lastPrice = slot.price;
//             } else if (lastPrice !== null) {
//               slot.price = lastPrice;
//             }
//           });

//           // Filter out slots without any price
//           const filledData = timeSlots.filter(slot => slot.price !== null);

//           console.log('Time Slots Data:', filledData);

//           if (filledData.length > 0) {
//             // Calculate dynamic Y-axis range
//             const prices = filledData.map(d => d.price);
//             const minPrice = Math.min(...prices);
//             const maxPrice = Math.max(...prices);
//             const range = maxPrice - minPrice;

//             // Add some padding (5% on each side)
//             const padding = Math.max(range * 0.1, 10);
//             const yMin = Math.floor((minPrice - padding) / 2) * 2; // Round to nearest 2
//             const yMax = Math.ceil((maxPrice + padding) / 2) * 2; // Round to nearest 2

//             setYAxisDomain([yMin, yMax]);
//             setGoldData(filledData);

//             // Set current price as the last data point with actual data
//             const lastActualData = filledData.filter(d => d.hasData).pop();
//             setCurrentPrice(lastActualData || filledData[filledData.length - 1]);
//           }
//         }
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(value);
//   };

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
//           <p className="text-xs text-primary font-semibold mb-1">
//             {payload[0].payload.time}
//           </p>
//           <p className="text-2xl font-bold text-foreground mb-1">
//             {formatCurrency(payload[0].value)}
//           </p>
//           <p className="text-xs text-muted-foreground">per gram</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const CustomDot = (props) => {
//     const { cx, cy, payload } = props;

//     // Only show dot if this time slot has actual data
//     if (payload.hasData) {
//       return (
//         <circle
//           cx={cx}
//           cy={cy}
//           r={5}
//           fill="hsl(35, 64%, 39%)"
//           stroke="hsl(0, 0%, 100%)"
//           strokeWidth={3}
//         />
//       );
//     }
//     return null;
//   };

//   const CustomActiveDot = (props) => {
//     const { cx, cy } = props;
//     return (
//       <circle
//         cx={cx}
//         cy={cy}
//         r={7}
//         fill="hsl(35, 64%, 39%)"
//         stroke="hsl(0, 0%, 100%)"
//         strokeWidth={3}
//       />
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
//           <p className="text-foreground mt-6 text-lg font-medium">Loading Live Gold Rates...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center px-4">
//         <div className="bg-card border border-destructive/30 rounded-2xl p-8 text-center max-w-md shadow-lg">
//           <p className="text-destructive text-lg mb-4">Unable to load gold rates</p>
//           <p className="text-muted-foreground text-sm mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="relative overflow-hidden">
//         {/* Background effects matching Services component */}
//         <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

//         <div className="relative container mx-auto px-4 py-12">
//           {/* Header */}
//           <div className="max-w-6xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
//               <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
//               <span className="text-primary text-sm font-bold tracking-wide">LIVE</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//               White Gold
//             </h1>
//             <p className="text-2xl md:text-3xl font-bold text-primary mb-6">
//               Live Gold Rate
//             </p>
//             <div className="flex items-center gap-3">
//               <Clock className="w-5 h-5 text-muted-foreground" />
//               <span className="text-lg text-muted-foreground font-medium">
//                 {currentTime.toLocaleDateString('en-IN', {
//                   day: 'numeric',
//                   month: 'long',
//                   year: 'numeric'
//                 })} • {currentTime.toLocaleTimeString('en-IN', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                   hour12: true
//                 })} IST
//               </span>
//             </div>
//           </div>

//           {/* Main Card */}
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-card rounded-3xl shadow-[var(--shadow-card)] border border-border overflow-hidden">
//               <div className="grid lg:grid-cols-5 gap-0">
//                 {/* Left Panel - Price Display */}
//                 <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-10">
//                   <div className="space-y-8">
//                     {/* Current Price Card */}
//                     <div className="relative group">
//                       <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                       <div className="relative bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-8">
//                         <div className="flex items-center gap-3 mb-4">
//                           <TrendingUp className="w-5 h-5 text-primary" />
//                           <span className="text-foreground text-sm font-bold tracking-wider uppercase">24 Karat Gold</span>
//                         </div>
//                         {currentPrice && (
//                           <>
//                             <div className="text-5xl lg:text-6xl font-bold text-primary mb-2 tracking-tight leading-none">
//                               {formatCurrency(currentPrice.price)}
//                             </div>
//                             <p className="text-muted-foreground text-base font-medium">per gram</p>
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stats Grid */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-md transition-all">
//                         <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase tracking-wide">High</p>
//                         {goldData.length > 0 && (
//                           <p className="text-foreground text-xl font-bold">
//                             {formatCurrency(Math.max(...goldData.map(d => d.price)))}
//                           </p>
//                         )}
//                       </div>

//                       <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-md transition-all">
//                         <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase tracking-wide">Low</p>
//                         {goldData.length > 0 && (
//                           <p className="text-foreground text-xl font-bold">
//                             {formatCurrency(Math.min(...goldData.map(d => d.price)))}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-md transition-all">
//                       <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase tracking-wide">Updates Today</p>
//                       <p className="text-foreground text-2xl font-bold">
//                         {goldData.filter(d => d.hasData).length}
//                       </p>
//                     </div>

//                     {currentPrice && (
//                       <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-md transition-all">
//                         <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase tracking-wide">Last Updated</p>
//                         <p className="text-foreground text-xl font-bold">{currentPrice.time}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Panel - Chart */}
//                 <div className="lg:col-span-3 p-8 md:p-10">
//                   <div className="flex items-center justify-between mb-8">
//                     <div>
//                       <h3 className="text-2xl font-bold text-foreground mb-2">
//                         Price Movement
//                       </h3>
//                       <p className="text-muted-foreground text-sm">
//                         Real-time gold rate tracking
//                       </p>
//                     </div>
//                     <span className="text-sm text-muted-foreground font-medium bg-muted px-4 py-2 rounded-lg border border-border">
//                       9:00 AM - 8:00 PM
//                     </span>
//                   </div>

//                   {goldData.length > 0 ? (
//                     <div className="bg-muted/30 rounded-2xl p-6 border border-border">
//                       <ResponsiveContainer width="100%" height={450}>
//                         <AreaChart data={goldData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
//                           <defs>
//                             <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="0%" stopColor="hsl(35, 64%, 39%)" stopOpacity={0.4} />
//                               <stop offset="50%" stopColor="hsl(35, 64%, 39%)" stopOpacity={0.2} />
//                               <stop offset="100%" stopColor="hsl(35, 64%, 39%)" stopOpacity={0} />
//                             </linearGradient>
//                           </defs>
//                           <CartesianGrid
//                             strokeDasharray="3 3"
//                             stroke="hsl(43, 20%, 88%)"
//                             opacity={0.3}
//                             vertical={false}
//                           />
//                           <XAxis
//                             dataKey="time"
//                             stroke="hsl(215.4, 16.3%, 46.9%)"
//                             tick={{ fill: 'hsl(215.4, 16.3%, 46.9%)', fontSize: 12, fontWeight: 500 }}
//                             tickLine={false}
//                             axisLine={{ stroke: 'hsl(43, 20%, 88%)', strokeWidth: 1.5 }}
//                             interval="preserveStartEnd"
//                             minTickGap={30}
//                           />
//                           <YAxis
//                             stroke="hsl(215.4, 16.3%, 46.9%)"
//                             tick={{ fill: 'hsl(215.4, 16.3%, 46.9%)', fontSize: 12, fontWeight: 500 }}
//                             tickLine={false}
//                             axisLine={{ stroke: 'hsl(43, 20%, 88%)', strokeWidth: 1.5 }}
//                             domain={yAxisDomain}
//                             ticks={Array.from(
//                               { length: Math.floor((yAxisDomain[1] - yAxisDomain[0]) / 2) + 1 },
//                               (_, i) => yAxisDomain[0] + i * 2
//                             )}
//                             tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
//                             width={90}
//                           />
//                           <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(35, 64%, 39%)', strokeWidth: 2, strokeDasharray: '5 5' }} />
//                           <Area
//                             type="monotone"
//                             dataKey="price"
//                             stroke="hsl(35, 64%, 39%)"
//                             strokeWidth={3}
//                             fill="url(#goldGradient)"
//                             dot={<CustomDot />}
//                             activeDot={<CustomActiveDot />}
//                           />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </div>
//                   ) : (
//                     <div className="h-[450px] flex items-center justify-center bg-muted/30 rounded-2xl border border-border">
//                       <p className="text-muted-foreground text-lg">No data available</p>
//                     </div>
//                   )}

//                   <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5">
//                     <div className="flex items-start gap-3">
//                       <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
//                       <div>
//                         <p className="text-primary text-sm font-bold mb-1">Real-Time Updates</p>
//                         <p className="text-muted-foreground text-sm leading-relaxed">
//                           Gold rates are updated throughout the day from 9:00 AM to 8:00 PM. All prices shown are for 24 karat gold per gram in Indian Rupees (INR). Dots indicate actual price updates.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="max-w-6xl mx-auto mt-8 text-center">
//             <p className="text-muted-foreground text-sm">
//               Prices are indicative and may vary • Auto-refreshes every minute
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveGoldRate;

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Clock, ArrowLeft } from 'lucide-react';
import { getGoldPrices } from '@/integrations/api';
import { useNavigate } from 'react-router-dom';

const LiveGoldRate = () => {
  const navigate = useNavigate();
  const [goldData, setGoldData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0, isPositive: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const currentHour = now.getHours();

        let targetDate;
        if (currentHour < 9) {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          targetDate = yesterday.toISOString().split('T')[0];
        } else {
          targetDate = now.toISOString().split('T')[0];
        }

        const data = await getGoldPrices(targetDate);

        if (data && data.length > 0) {
          const timeSlots = [];
          for (let hour = 9; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
              if (hour === 20 && minute > 0) break;
              const time = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
              timeSlots.push({
                time,
                hour,
                minute,
                price: null,
                hasData: false
              });
            }
          }

          data.forEach(item => {
            const dateTime = new Date(item.currentDateTime);
            const itemHour = dateTime.getHours();
            const itemMinute = dateTime.getMinutes();
            const roundedMinute = Math.floor(itemMinute / 15) * 15;
            const slotIndex = timeSlots.findIndex(slot =>
              slot.hour === itemHour && slot.minute === roundedMinute
            );

            if (slotIndex !== -1) {
              timeSlots[slotIndex].price = item.gold_price;
              timeSlots[slotIndex].hasData = true;
              timeSlots[slotIndex].fullDate = dateTime;
              timeSlots[slotIndex].id = item.id;
            }
          });

          let lastPrice = null;
          timeSlots.forEach(slot => {
            if (slot.hasData && slot.price !== null) {
              lastPrice = slot.price;
            } else if (lastPrice !== null) {
              slot.price = lastPrice;
            }
          });

          const filledData = timeSlots.filter(slot => slot.price !== null);

          if (filledData.length > 0) {
            const prices = filledData.map(d => d.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const range = maxPrice - minPrice;

            const padding = Math.max(range * 0.1, 10);
            const yMin = Math.floor((minPrice - padding) / 2) * 2;
            const yMax = Math.ceil((maxPrice + padding) / 2) * 2;

            setYAxisDomain([yMin, yMax]);
            setGoldData(filledData);

            const lastActualData = filledData.filter(d => d.hasData).pop();
            const currentData = lastActualData || filledData[filledData.length - 1];
            setCurrentPrice(currentData);

            if (filledData.length > 1) {
              const firstPrice = filledData[0].price;
              const lastPrice = currentData.price;
              const change = lastPrice - firstPrice;
              const changePercent = (change / firstPrice) * 100;
              setPriceChange({
                value: Math.abs(change),
                percentage: Math.abs(changePercent),
                isPositive: change >= 0
              });
            }
          }
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-primary/20 rounded-xl p-3 shadow-xl">
          <p className="text-xs text-gray-600 font-medium mb-1">{payload[0].payload.time}</p>
          <p className="text-xl font-bold text-primary">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-gray-500">per gram</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.hasData) {
      return (
        <>
          <circle cx={cx} cy={cy} r={6} fill="hsl(var(--primary))" opacity={0.2} />
          <circle cx={cx} cy={cy} r={3} fill="hsl(var(--primary))" />
        </>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground text-lg font-semibold">Loading Live Gold Rates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl p-8 text-center max-w-md shadow-lg border border-border">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-destructive text-xl font-bold mb-2">Unable to load gold rates</p>
          <p className="text-muted-foreground text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-primary text-xs font-bold uppercase tracking-wide">Live</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Live Gold Rates</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} • {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Price Card */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-3xl shadow-2xl h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

              <div className="relative">
                <p className="text-primary-foreground/80 text-sm font-semibold mb-2 uppercase tracking-wide">24 Karat Gold</p>
                {currentPrice && (
                  <>
                    <div className="text-5xl md:text-6xl font-bold text-primary-foreground mb-2">
                      {formatCurrency(currentPrice.price)}
                    </div>
                    <p className="text-primary-foreground/70 text-base mb-6">per gram</p>

                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${priceChange.isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                      {priceChange.isPositive ? (
                        <TrendingUp className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-primary-foreground" />
                      )}
                      <span className="text-primary-foreground font-bold text-sm">
                        {priceChange.isPositive ? '+' : '-'}₹{priceChange.value.toFixed(2)} ({priceChange.percentage.toFixed(2)}%)
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase">High</p>
              {goldData.length > 0 && (
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(Math.max(...goldData.map(d => d.price)))}
                </p>
              )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase">Low</p>
              {goldData.length > 0 && (
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(Math.min(...goldData.map(d => d.price)))}
                </p>
              )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase">Updates</p>
              <p className="text-3xl font-bold text-foreground">
                {goldData.filter(d => d.hasData).length}
              </p>
            </div>

            {currentPrice && (
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all col-span-2 md:col-span-3">
                <p className="text-muted-foreground text-xs font-semibold mb-2 uppercase">Last Updated</p>
                <p className="text-2xl font-bold text-foreground">{currentPrice.time}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-6 bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 md:p-8 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Today's Price Movement</h3>
                <p className="text-muted-foreground text-sm">Real-time tracking from 9:00 AM to 8:00 PM</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-foreground">Trading Hours: 9 AM - 8 PM</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            {goldData.length > 0 ? (
              <ResponsiveContainer width="100%" height={450}>
                <AreaChart data={goldData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    interval="preserveStartEnd"
                    minTickGap={40}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    domain={yAxisDomain}
                    ticks={Array.from(
                      { length: Math.floor((yAxisDomain[1] - yAxisDomain[0]) / 2) + 1 },
                      (_, i) => yAxisDomain[0] + i * 2
                    )}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    width={90}
                  />
                  <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#colorPrice)"
                    dot={<CustomDot />}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[450px] flex items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>

          <div className="bg-muted/50 p-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              💡 Prices update automatically throughout the day. Dots indicate actual recorded updates. All prices are for 24 karat gold per gram in INR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveGoldRate;