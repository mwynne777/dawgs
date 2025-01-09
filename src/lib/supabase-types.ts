/* eslint-disable @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/consistent-indexed-object-style*/
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      colleges: {
        Row: {
          created_at: string
          id: number
          mascot: string
          name: string
          short_name: string
        }
        Insert: {
          created_at?: string
          id: number
          mascot: string
          name: string
          short_name: string
        }
        Update: {
          created_at?: string
          id?: number
          mascot?: string
          name?: string
          short_name?: string
        }
        Relationships: []
      }
      leagues: {
        Row: {
          abbreviation: string
          created_at: string | null
          display_name: string
          id: number
        }
        Insert: {
          abbreviation: string
          created_at?: string | null
          display_name: string
          id: number
        }
        Update: {
          abbreviation?: string
          created_at?: string | null
          display_name?: string
          id?: number
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          final: boolean
          game_date: string | null
          game_id: number
          opposing_team_id: number | null
          player_id: number
          stat_line: string[]
        }
        Insert: {
          final?: boolean
          game_date?: string | null
          game_id: number
          opposing_team_id: number
          player_id: number
          stat_line: string[]
        }
        Update: {
          final?: boolean
          game_date?: string | null
          game_id?: number
          opposing_team_id: number
          player_id?: number
          stat_line?: string[]
        }
        Relationships: []
      }
      players: {
        Row: {
          college_id: number | null
          created_at: string
          full_name: string
          id: number
          league_id: number | null
          nat_stat_id: number | null
          salary: number | null
          team_id: number | null
        }
        Insert: {
          college_id?: number | null
          created_at?: string
          full_name: string
          id: number
          league_id?: number | null
          nat_stat_id?: number | null
          salary?: number | null
          team_id?: number | null
        }
        Update: {
          college_id?: number | null
          created_at?: string
          full_name?: string
          id?: number
          league_id?: number | null
          nat_stat_id?: number | null
          salary?: number | null
          team_id?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_most_recent_games: {
        Args: {
          collegeid: number
        }
        Returns: {
          id: number
          full_name: string
          salary: number
          league_id: number
          team_id: number
          college_id: number
          created_at: string
          player_id: number
          game_id: number
          game_date: string
          stat_line: string[]
          final: boolean
          opposing_team_id: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
