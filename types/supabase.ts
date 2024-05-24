// pnpm supabase gen types typescript --project-id "gfnmfivzfjzcirqpacvr" --schema public > types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          id: string;
          payload: Json | null;
          user_id: string | null;
        };
        Insert: {
          id: string;
          payload?: Json | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          payload?: Json | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      diagram_versions: {
        Row: {
          created_at: string;
          diagram_code: string | null;
          diagram_config: string | null;
          diagram_id: string | null;
          diagram_language: string | null;
          diagram_notes: string | null;
          diagram_theme: string | null;
          version_id: string;
          version_name: string | null;
        };
        Insert: {
          created_at?: string;
          diagram_code?: string | null;
          diagram_config?: string | null;
          diagram_id?: string | null;
          diagram_language?: string | null;
          diagram_notes?: string | null;
          diagram_theme?: string | null;
          version_id?: string;
          version_name?: string | null;
        };
        Update: {
          created_at?: string;
          diagram_code?: string | null;
          diagram_config?: string | null;
          diagram_id?: string | null;
          diagram_language?: string | null;
          diagram_notes?: string | null;
          diagram_theme?: string | null;
          version_id?: string;
          version_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "diagram_versions_diagram_id_fkey";
            columns: ["diagram_id"];
            isOneToOne: false;
            referencedRelation: "diagrams";
            referencedColumns: ["id"];
          }
        ];
      };
      diagrams: {
        Row: {
          code: string | null;
          config: string | null;
          created_at: string;
          diagram_language: string;
          diagram_name: string | null;
          diagram_notes: string | null;
          diagram_theme: string | null;
          id: string;
          is_public: boolean | null;
          last_updated_at: string | null;
          user_id: string;
        };
        Insert: {
          code?: string | null;
          config?: string | null;
          created_at?: string;
          diagram_language?: string;
          diagram_name?: string | null;
          diagram_notes?: string | null;
          diagram_theme?: string | null;
          id: string;
          is_public?: boolean | null;
          last_updated_at?: string | null;
          user_id: string;
        };
        Update: {
          code?: string | null;
          config?: string | null;
          created_at?: string;
          diagram_language?: string;
          diagram_name?: string | null;
          diagram_notes?: string | null;
          diagram_theme?: string | null;
          id?: string;
          is_public?: boolean | null;
          last_updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          content: string;
          createdAt: string;
          diagramId: string;
          id: string;
          role: string;
        };
        Insert: {
          content: string;
          createdAt: string;
          diagramId: string;
          id: string;
          role: string;
        };
        Update: {
          content?: string;
          createdAt?: string;
          diagramId?: string;
          id?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_messages_diagram_id_fkey";
            columns: ["diagramId"];
            isOneToOne: false;
            referencedRelation: "diagrams";
            referencedColumns: ["id"];
          }
        ];
      };
      payment_history: {
        Row: {
          amount: number | null;
          amount_tax: number | null;
          attempt_number: number | null;
          created_at: string | null;
          currency: string | null;
          customername: string | null;
          id: number;
          next_retry_date: string | null;
          paddle_fee: number | null;
          payment_method: string | null;
          receipt_url: string | null;
          refund_reason: string | null;
          refundtype: string | null;
          status: string | null;
          subscription_id: number | null;
          subscription_payment_id: number | null;
          subscription_plan_id: number | null;
          user_email: string | null;
          user_id: number | null;
          usercountry: string | null;
        };
        Insert: {
          amount?: number | null;
          amount_tax?: number | null;
          attempt_number?: number | null;
          created_at?: string | null;
          currency?: string | null;
          customername?: string | null;
          id?: never;
          next_retry_date?: string | null;
          paddle_fee?: number | null;
          payment_method?: string | null;
          receipt_url?: string | null;
          refund_reason?: string | null;
          refundtype?: string | null;
          status?: string | null;
          subscription_id?: number | null;
          subscription_payment_id?: number | null;
          subscription_plan_id?: number | null;
          user_email?: string | null;
          user_id?: number | null;
          usercountry?: string | null;
        };
        Update: {
          amount?: number | null;
          amount_tax?: number | null;
          attempt_number?: number | null;
          created_at?: string | null;
          currency?: string | null;
          customername?: string | null;
          id?: never;
          next_retry_date?: string | null;
          paddle_fee?: number | null;
          payment_method?: string | null;
          receipt_url?: string | null;
          refund_reason?: string | null;
          refundtype?: string | null;
          status?: string | null;
          subscription_id?: number | null;
          subscription_payment_id?: number | null;
          subscription_plan_id?: number | null;
          user_email?: string | null;
          user_id?: number | null;
          usercountry?: string | null;
        };
        Relationships: [];
      };
      user_payment_data: {
        Row: {
          subscription_cancel_url: string | null;
          subscription_end_date: string | null;
          subscription_id: string | null;
          subscription_plan_id: string | null;
          subscription_status: string | null;
          subscription_update_url: string | null;
          user_email: string;
          user_id: string;
        };
        Insert: {
          subscription_cancel_url?: string | null;
          subscription_end_date?: string | null;
          subscription_id?: string | null;
          subscription_plan_id?: string | null;
          subscription_status?: string | null;
          subscription_update_url?: string | null;
          user_email: string;
          user_id: string;
        };
        Update: {
          subscription_cancel_url?: string | null;
          subscription_end_date?: string | null;
          subscription_id?: string | null;
          subscription_plan_id?: string | null;
          subscription_status?: string | null;
          subscription_update_url?: string | null;
          user_email?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
