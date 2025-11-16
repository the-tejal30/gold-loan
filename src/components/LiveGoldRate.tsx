import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Clock, ArrowLeft } from 'lucide-react';
import { getGoldPrices } from '@/integrations/api';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@/icons/ChevronLeftIcon';

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
        const indianTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const currentHour = indianTime.getHours();

        let targetDate;
        if (currentHour < 9) {
          const yesterday = new Date(indianTime);
          yesterday.setDate(yesterday.getDate() - 1);
          targetDate = yesterday.toISOString().split('T')[0];
        } else {
          targetDate = indianTime.toISOString().split('T')[0];
        }

        const data = await getGoldPrices(targetDate);

        if (data && data.length > 0) {
          // Find the most recent update time
          let mostRecentDbTime = null;
          let mostRecentPrice = null;
          
          data.forEach(item => {
            const itemTime = new Date(item.currentDateTime + 'Z');
            if (!mostRecentDbTime || itemTime > mostRecentDbTime) {
              mostRecentDbTime = itemTime;
              mostRecentPrice = item.gold_price;
            }
          });

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
            const dateTime = new Date(item.currentDateTime + 'Z');
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

            // Format the most recent time in IST
            const formattedTime = mostRecentDbTime.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Kolkata'
            });

            setCurrentPrice({
              price: mostRecentPrice,
              time: formattedTime,
              fullDate: mostRecentDbTime
            });

            if (filledData.length > 1) {
              const firstPrice = filledData[0].price;
              const lastPrice = mostRecentPrice;
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
      const now = new Date();
      const indianTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setCurrentTime(indianTime);
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

  const getCurrentIntervalData = () => {
    const now = new Date();
    const indianTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const currentHour = indianTime.getHours();
    const currentMinute = indianTime.getMinutes();
    const currentInterval = Math.floor(currentMinute / 15) * 15;

    return goldData.map(item => {
      const isVisible = item.hour < currentHour || (item.hour === currentHour && item.minute <= currentInterval);
      return {
        ...item,
        price: isVisible ? item.price : null,
        isVisible
      };
    });
  };

  const displayData = getCurrentIntervalData();

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
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex flex justify-center items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 group"
          >
            <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Home</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-white text-xs font-bold uppercase tracking-wider">Live Updates</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                Live <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s ease-in-out infinite' }}>Gold Rates</span>
              </h1>
              <div className="flex items-center gap-3 text-white/80">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base font-medium">
                  {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} • {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-primary via-accent to-primary p-1 rounded-3xl shadow-2xl">
            <div className="bg-secondary/95 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>

              <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-wider mb-3">Current Gold Price</p>
                  {currentPrice && (
                    <>
                      <div className="flex items-baseline gap-2 md:gap-3 mb-4">
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s ease-in-out infinite' }}>
                          {formatCurrency(currentPrice.price).replace('₹', '')}
                        </span>
                      </div>
                      <p className="text-white/70 text-base md:text-lg mb-6">24K Gold • Per Gram</p>

                      <div className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-2xl border-2 ${priceChange.isPositive
                        ? 'bg-green-500/20 border-green-500/50'
                        : 'bg-red-500/20 border-red-500/50'
                        }`}>
                        {priceChange.isPositive ? (
                          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                        )}
                        <div className="flex flex-col">
                          <span className={`font-bold text-base md:text-lg ${priceChange.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {priceChange.isPositive ? '+' : '-'}₹{priceChange.value.toFixed(2)}
                          </span>
                          <span className={`text-xs ${priceChange.isPositive ? 'text-green-300' : 'text-red-300'}`}>
                            {priceChange.percentage.toFixed(2)}% today
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
                    <p className="text-white/60 text-xs font-semibold uppercase mb-2">Market Status</p>
                    <p className="text-white text-xl md:text-2xl font-bold">Open</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
                    <p className="text-white/60 text-xs font-semibold uppercase mb-2">Last Update</p>
                    <p className="text-white text-xl md:text-2xl font-bold">
                      {currentPrice ? currentPrice.time : '--'}
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 col-span-2">
                    <p className="text-white/60 text-xs font-semibold uppercase mb-2">Trading Hours</p>
                    <p className="text-white text-lg md:text-xl font-bold">9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section - Redesigned */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 md:p-6 lg:p-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Today's Price Movement</h3>
                <p className="text-white/60 text-sm md:text-base">15-minute interval tracking • Real-time updates</p>
              </div>
              <div className="inline-flex items-center gap-3 bg-primary/20 backdrop-blur-sm px-4 md:px-5 py-2 md:py-3 rounded-xl border border-primary/30">
                <div className="w-3 h-3 rounded-full bg-red-500" style={{ animation: 'scale 1s ease-in-out infinite', transformOrigin: 'center' }}></div>
                <span className="text-xs md:text-sm font-bold text-white">Live Trading</span>
              </div>
            </div>
          </div>

          <div className="p-2 md:p-4 lg:p-8 bg-gradient-to-b from-transparent to-white/5">
            {displayData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400} className="md:h-[500px]">
                <AreaChart data={displayData} margin={{ top: 10, right: 5, left: -10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                    interval="preserveStartEnd"
                    minTickGap={30}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                    domain={yAxisDomain}
                    ticks={Array.from(
                      { length: Math.floor((yAxisDomain[1] - yAxisDomain[0]) / 2) + 1 },
                      (_, i) => yAxisDomain[0] + i * 2
                    )}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    width={70}
                  />
                  <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '5 5' }} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#colorPrice)"
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (!payload.isVisible) return null;
                      return (
                        <>
                          <circle cx={cx} cy={cy} r={6} fill="hsl(var(--primary))" opacity={0.2} />
                          <circle cx={cx} cy={cy} r={4} fill="hsl(var(--primary))" stroke="white" strokeWidth={1.5} />
                        </>
                      );
                    }}
                    activeDot={{ r: 6, fill: 'hsl(var(--accent))', stroke: 'white', strokeWidth: 2 }}
                    connectNulls={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] md:h-[500px] flex items-center justify-center">
                <p className="text-white/50 text-lg">No data available</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <span className="text-xl md:text-2xl">💡</span>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                Chart updates every 15 minutes showing the latest gold prices. Each dot represents a recorded price point. Graph displays data only up to the current time interval for accurate tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default LiveGoldRate;