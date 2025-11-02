-- Create table for storing daily gold rates
CREATE TABLE IF NOT EXISTS public.gold_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rate_22k DECIMAL(10,2) NOT NULL,
  rate_24k DECIMAL(10,2) NOT NULL,
  rate_18k DECIMAL(10,2) NOT NULL,
  silver_rate DECIMAL(10,2),
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by TEXT,
  UNIQUE(effective_date)
);

-- Create table for sell gold form submissions
CREATE TABLE IF NOT EXISTS public.sell_gold_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  weight_grams DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for release pledge gold form submissions
CREATE TABLE IF NOT EXISTS public.release_pledge_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  weight_grams DECIMAL(10,2) NOT NULL,
  loan_amount DECIMAL(12,2) NOT NULL,
  financier_name TEXT NOT NULL,
  location TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gold_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sell_gold_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_pledge_forms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gold_rates (public read, no auth needed for reading rates)
CREATE POLICY "Anyone can view gold rates"
  ON public.gold_rates
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert gold rates"
  ON public.gold_rates
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update gold rates"
  ON public.gold_rates
  FOR UPDATE
  USING (true);

-- RLS Policies for sell_gold_forms (public insert)
CREATE POLICY "Anyone can submit sell gold forms"
  ON public.sell_gold_forms
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies for release_pledge_forms (public insert)
CREATE POLICY "Anyone can submit release pledge forms"
  ON public.release_pledge_forms
  FOR INSERT
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on gold_rates
CREATE TRIGGER update_gold_rates_updated_at
  BEFORE UPDATE ON public.gold_rates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();