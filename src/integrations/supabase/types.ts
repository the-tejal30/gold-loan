export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      gold_rates: {
        Row: {
          created_at: string
          created_by: string | null
          effective_date: string
          id: string
          rate_18k: number
          rate_22k: number
          rate_24k: number
          silver_rate: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          effective_date?: string
          id?: string
          rate_18k: number
          rate_22k: number
          rate_24k: number
          silver_rate?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          effective_date?: string
          id?: string
          rate_18k?: number
          rate_22k?: number
          rate_24k?: number
          silver_rate?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      hourly_gold_rates: {
        Row: {
          created_at: string
          hour: number
          id: string
          rate_18k: number
          rate_22k: number
          rate_24k: number
          rate_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          hour: number
          id?: string
          rate_18k: number
          rate_22k: number
          rate_24k: number
          rate_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          hour?: number
          id?: string
          rate_18k?: number
          rate_22k?: number
          rate_24k?: number
          rate_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      live_rate_views: {
        Row: {
          id: string
          mobile_number: string
          rate_18k: number | null
          rate_22k: number | null
          rate_24k: number | null
          viewed_at: string
        }
        Insert: {
          id?: string
          mobile_number: string
          rate_18k?: number | null
          rate_22k?: number | null
          rate_24k?: number | null
          viewed_at?: string
        }
        Update: {
          id?: string
          mobile_number?: string
          rate_18k?: number | null
          rate_22k?: number | null
          rate_24k?: number | null
          viewed_at?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          mobile_number: string
          otp: string
          purpose: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          mobile_number: string
          otp: string
          purpose: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          mobile_number?: string
          otp?: string
          purpose?: string
          verified?: boolean
        }
        Relationships: []
      }
      release_pledge_forms: {
        Row: {
          consent_given: boolean
          financier_name: string
          id: string
          loan_amount: number
          location: string
          mobile_number: string
          name: string
          submitted_at: string
          weight_grams: number
        }
        Insert: {
          consent_given?: boolean
          financier_name: string
          id?: string
          loan_amount: number
          location: string
          mobile_number: string
          name: string
          submitted_at?: string
          weight_grams: number
        }
        Update: {
          consent_given?: boolean
          financier_name?: string
          id?: string
          loan_amount?: number
          location?: string
          mobile_number?: string
          name?: string
          submitted_at?: string
          weight_grams?: number
        }
        Relationships: []
      }
      sell_gold_forms: {
        Row: {
          consent_given: boolean
          id: string
          location: string
          mobile_number: string
          name: string
          submitted_at: string
          weight_grams: number
        }
        Insert: {
          consent_given?: boolean
          id?: string
          location: string
          mobile_number: string
          name: string
          submitted_at?: string
          weight_grams: number
        }
        Update: {
          consent_given?: boolean
          id?: string
          location?: string
          mobile_number?: string
          name?: string
          submitted_at?: string
          weight_grams?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
