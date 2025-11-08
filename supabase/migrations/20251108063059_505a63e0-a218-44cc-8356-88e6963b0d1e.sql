-- Create table for live rate views tracking
CREATE TABLE public.live_rate_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mobile_number TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  rate_22k NUMERIC,
  rate_24k NUMERIC,
  rate_18k NUMERIC
);

-- Enable RLS
ALTER TABLE public.live_rate_views ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert live rate views"
ON public.live_rate_views
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can view live rate views"
ON public.live_rate_views
FOR SELECT
USING (true);

-- Create table for hourly gold rates (9 AM to 8 PM)
CREATE TABLE public.hourly_gold_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rate_22k NUMERIC NOT NULL,
  rate_24k NUMERIC NOT NULL,
  rate_18k NUMERIC NOT NULL,
  hour INTEGER NOT NULL CHECK (hour >= 9 AND hour <= 20),
  rate_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(rate_date, hour)
);

-- Enable RLS
ALTER TABLE public.hourly_gold_rates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view hourly rates"
ON public.hourly_gold_rates
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert hourly rates"
ON public.hourly_gold_rates
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update hourly rates"
ON public.hourly_gold_rates
FOR UPDATE
USING (true);

-- Create trigger for automatic timestamp updates on hourly_gold_rates
CREATE TRIGGER update_hourly_gold_rates_updated_at
BEFORE UPDATE ON public.hourly_gold_rates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for OTP verification
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mobile_number TEXT NOT NULL,
  otp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  purpose TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert OTP"
ON public.otp_verifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can verify OTP"
ON public.otp_verifications
FOR SELECT
USING (true);

CREATE POLICY "Anyone can update OTP"
ON public.otp_verifications
FOR UPDATE
USING (true);