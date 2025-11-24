import { useState, useEffect, useMemo, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { getMetalPrices } from '@/integrations/api';

const LiveGoldRate = () => {
  const [activeTab, setActiveTab] = useState('gold');
  const [metalData, setMetalData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0, isPositive: true });

  const processData = useCallback((data, isGold) => {
    if (!data || data.length === 0) return null;

    let mostRecentDbTime = null;
    let mostRecentPrice = null;

    data.forEach(item => {
      const itemTime = new Date(item.currentDateTime + 'Z');
      if (!mostRecentDbTime || itemTime > mostRecentDbTime) {
        mostRecentDbTime = itemTime;
        mostRecentPrice = isGold ? item.gold_price : item.silver_price;
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
        timeSlots[slotIndex].price = isGold ? item.gold_price : item.silver_price;
        timeSlots[slotIndex].hasData = true;
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

      const formattedTime = mostRecentDbTime.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });

      const currentPrice = {
        price: mostRecentPrice,
        time: formattedTime,
        fullDate: mostRecentDbTime
      };

      let priceChange = { value: 0, percentage: 0, isPositive: true };
      if (filledData.length > 1) {
        const firstPrice = filledData[0].price;
        const lastPrice = mostRecentPrice;
        const change = lastPrice - firstPrice;
        const changePercent = (change / firstPrice) * 100;
        priceChange = {
          value: Math.abs(change),
          percentage: Math.abs(changePercent),
          isPositive: change >= 0
        };
      }

      return {
        data: filledData,
        yAxisDomain: [yMin, yMax],
        currentPrice,
        priceChange
      };
    }

    return null;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const isGold = activeTab === 'gold';

      const response = await getMetalPrices(isGold);

      if (response) {
        setData(response);
      }

      const result = processData(response, isGold);

      if (result) {

        console.log(result);
        setMetalData(result.data);
        setYAxisDomain(result.yAxisDomain);
        setCurrentPrice(result.currentPrice);
        setPriceChange(result.priceChange);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [activeTab, processData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const indianTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setCurrentTime(indianTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  const CustomTooltip = useCallback(({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-primary/20 rounded-xl p-3 shadow-xl">
          <p className="text-xs text-gray-600 font-medium mb-1">{payload[0].payload.time}</p>
          <p className="text-xl font-bold text-primary">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-gray-500">{isGold ? 'per gram' : 'per kg'}</p>
        </div>
      );
    }
    return null;
  }, [formatCurrency]);

  const getCurrentIntervalData = useCallback((data) => {
    const now = new Date();
    const indianTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const currentHour = indianTime.getHours();
    const currentMinute = indianTime.getMinutes();
    const currentInterval = Math.floor(currentMinute / 15) * 15;

    return data.map(item => {
      const isVisible = item.hour < currentHour || (item.hour === currentHour && item.minute <= currentInterval);
      return {
        ...item,
        price: isVisible ? item.price : null,
        isVisible
      };
    });
  }, []);

  const isGold = activeTab === 'gold';

  const displayData = useMemo(() => getCurrentIntervalData(metalData), [metalData, getCurrentIntervalData]);

  const yAxisTicks = useMemo(() =>
    Array.from(
      { length: Math.floor((yAxisDomain[1] - yAxisDomain[0]) / 2) + 1 },
      (_, i) => yAxisDomain[0] + i * 2
    ),
    [yAxisDomain]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
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
          <p className="text-destructive text-xl font-bold mb-2">Unable to load rates</p>
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
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/100 to-background relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                <span className="text-white text-xs font-bold uppercase tracking-wider">Live Updates</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                Live <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Precious Metal</span> Rates
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

        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg inline-flex gap-2">
            <button
              onClick={() => setActiveTab('gold')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'gold'
                ? 'bg-gradient-to-r from-primary via-accent to-primary text-white shadow-lg'
                : 'text-white/70 hover:bg-white/5'
                }`}
            >
              Gold
            </button>
            <button
              onClick={() => setActiveTab('silver')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'silver'
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg'
                : 'text-white/70 hover:bg-white/5'
                }`}
            >
              Silver
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className={`bg-gradient-to-br ${isGold ? 'from-primary via-accent to-primary' : 'from-gray-400 via-gray-500 to-gray-600'} p-1 rounded-3xl shadow-2xl`}>
            <div className="bg-secondary/95 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>

              <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                    Current {isGold ? "Gold" : "Silver"} Price
                  </p>

                  {(() => {
                    const displayedPrice =
                      currentPrice?.price ?? (isGold ? data[data.length - 1]?.gold_price : data[data.length - 1]?.silver_price);

                    if (!displayedPrice) return null;

                    return (
                      <>
                        {/* PRICE */}
                        <div className="flex items-baseline gap-2 md:gap-3 mb-4">
                          <span
                            className={`text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${isGold
                              ? "from-primary via-accent to-primary"
                              : "from-gray-400 via-gray-500 to-gray-600"
                              } bg-clip-text text-transparent`}
                          >
                            {formatCurrency(displayedPrice).replace("₹", "")}
                          </span>
                        </div>

                        <p className="text-white/70 text-base md:text-lg mb-6">
                          {isGold ? "24K Gold" : "Pure Silver"} • {isGold ? "Per Gram" : "Per Kg"}
                        </p>

                        {currentPrice && priceChange && (
                          <div
                            className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-2xl border-2 ${priceChange.isPositive
                              ? "bg-green-500/20 border-green-500/50"
                              : "bg-red-500/20 border-red-500/50"
                              }`}
                          >
                            {priceChange.isPositive ? (
                              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                            ) : (
                              <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                            )}

                            <div className="flex flex-col">
                              <span
                                className={`font-bold text-base md:text-lg ${priceChange.isPositive ? "text-green-400" : "text-red-400"
                                  }`}
                              >
                                {priceChange.isPositive ? "+" : "-"}₹
                                {priceChange.value?.toFixed(2)}
                              </span>
                              <span
                                className={`text-xs ${priceChange.isPositive ? "text-green-300" : "text-red-300"
                                  }`}
                              >
                                {priceChange.percentage?.toFixed(2)}% today
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>


                {/* <div className="grid grid-cols-2 gap-3 md:gap-4">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 md:p-6 lg:p-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Today's Price Movement</h3>
                <p className="text-white/60 text-sm md:text-base">15-minute interval tracking • Real-time updates</p>
              </div>
              <div className="inline-flex items-center gap-3 bg-primary/20 backdrop-blur-sm px-4 md:px-5 py-2 md:py-3 rounded-xl border border-primary/30">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-scaleBlink"></div>
                <span className="text-xs md:text-sm font-bold text-white">Live Trading</span>
              </div>
            </div>
          </div>

          <div className="p-2 md:p-4 lg:p-8 bg-gradient-to-b from-transparent to-white/5">
            {displayData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={displayData} margin={{ top: 10, right: 5, left: -10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isGold ? "hsl(var(--primary))" : "#9ca3af"} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={isGold ? "hsl(var(--accent))" : "#d1d5db"} stopOpacity={0.05} />
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
                    ticks={yAxisTicks}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    width={70}
                  />
                  <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} cursor={{ stroke: isGold ? 'hsl(var(--primary))' : '#9ca3af', strokeWidth: 2, strokeDasharray: '5 5' }} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isGold ? 'hsl(var(--primary))' : '#9ca3af'}
                    strokeWidth={3}
                    fill="url(#colorPrice)"
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (!payload.isVisible) return null;
                      const dotColor = isGold ? 'hsl(var(--primary))' : '#9ca3af';
                      return (
                        <>
                          <circle cx={cx} cy={cy} r={6} fill={dotColor} opacity={0.2} />
                          <circle cx={cx} cy={cy} r={4} fill={dotColor} stroke="white" strokeWidth={1.5} />
                        </>
                      );
                    }}
                    activeDot={{ r: 6, fill: isGold ? 'hsl(var(--accent))' : '#d1d5db', stroke: 'white', strokeWidth: 2 }}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-white/50 text-lg">No data available</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <span className="text-xl md:text-2xl">💡</span>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                Chart updates every 15 minutes showing the latest {isGold ? 'gold' : 'silver'} prices. Each dot represents a recorded price point. Graph displays data only up to the current time interval for accurate tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveGoldRate;