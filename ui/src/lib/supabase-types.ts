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
          assists: number | null
          blocks: number | null
          college_id: number | null
          created_at: string
          fg_a: number | null
          fg_m: number | null
          fouls: number | null
          ft_a: number | null
          ft_m: number | null
          game_date: string
          game_id: number
          id: number
          minutes: number | null
          nat_stat_player_id: number
          opponent_id: number
          points: number | null
          rebounds: number | null
          rebounds_off: number | null
          started: boolean | null
          steals: number | null
          team_id: number
          three_fg_a: number | null
          three_fg_m: number | null
          turnovers: number | null
        }
        Insert: {
          assists?: number | null
          blocks?: number | null
          college_id?: number | null
          created_at?: string
          fg_a?: number | null
          fg_m?: number | null
          fouls?: number | null
          ft_a?: number | null
          ft_m?: number | null
          game_date?: string
          game_id: number
          id: number
          minutes?: number | null
          nat_stat_player_id: number
          opponent_id: number
          points?: number | null
          rebounds?: number | null
          rebounds_off?: number | null
          started?: boolean | null
          steals?: number | null
          team_id: number
          three_fg_a?: number | null
          three_fg_m?: number | null
          turnovers?: number | null
        }
        Update: {
          assists?: number | null
          blocks?: number | null
          college_id?: number | null
          created_at?: string
          fg_a?: number | null
          fg_m?: number | null
          fouls?: number | null
          ft_a?: number | null
          ft_m?: number | null
          game_date?: string
          game_id?: number
          id?: number
          minutes?: number | null
          nat_stat_player_id?: number
          opponent_id?: number
          points?: number | null
          rebounds?: number | null
          rebounds_off?: number | null
          started?: boolean | null
          steals?: number | null
          team_id?: number
          three_fg_a?: number | null
          three_fg_m?: number | null
          turnovers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_nat_stat_player_id_fkey"
            columns: ["nat_stat_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["nat_stat_id"]
          },
        ]
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
      get_players_by_similar_name: {
        Args: {
          names: string[]
        }
        Returns: {
          college_id: number | null
          created_at: string
          full_name: string
          id: number
          league_id: number | null
          nat_stat_id: number | null
          salary: number | null
          team_id: number | null
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
