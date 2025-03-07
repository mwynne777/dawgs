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
          code: string
          created_at: string
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      colleges_deprecated: {
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
      draft_picks: {
        Row: {
          created_at: string
          id: number
          pick_number: number
          player_id: number
          team_abbreviation: string
          traded_to_team_abbreviation: string | null
          year: number
        }
        Insert: {
          created_at?: string
          id?: number
          pick_number: number
          player_id: number
          team_abbreviation: string
          traded_to_team_abbreviation?: string | null
          year?: number
        }
        Update: {
          created_at?: string
          id?: number
          pick_number?: number
          player_id?: number
          team_abbreviation?: string
          traded_to_team_abbreviation?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "draft_picks_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
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
          college_code: string | null
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
          league_id: number
          minutes: number | null
          nat_stat_player_id: number
          opponent_id: number
          player_id: number
          points: number | null
          rebounds: number | null
          rebounds_off: number | null
          season: number
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
          college_code?: string | null
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
          league_id?: number
          minutes?: number | null
          nat_stat_player_id: number
          opponent_id: number
          player_id: number
          points?: number | null
          rebounds?: number | null
          rebounds_off?: number | null
          season?: number
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
          college_code?: string | null
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
          league_id?: number
          minutes?: number | null
          nat_stat_player_id?: number
          opponent_id?: number
          player_id?: number
          points?: number | null
          rebounds?: number | null
          rebounds_off?: number | null
          season?: number
          started?: boolean | null
          steals?: number | null
          team_id?: number
          three_fg_a?: number | null
          three_fg_m?: number | null
          turnovers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_college_code_fkey"
            columns: ["college_code"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          college_code: string | null
          college_id: number | null
          created_at: string
          full_name: string
          gl_nat_stat_id: number | null
          id: number
          league_id: number | null
          nat_stat_id: number | null
          salary: number | null
          team_id: number | null
        }
        Insert: {
          college_code?: string | null
          college_id?: number | null
          created_at?: string
          full_name: string
          gl_nat_stat_id?: number | null
          id?: number
          league_id?: number | null
          nat_stat_id?: number | null
          salary?: number | null
          team_id?: number | null
        }
        Update: {
          college_code?: string | null
          college_id?: number | null
          created_at?: string
          full_name?: string
          gl_nat_stat_id?: number | null
          id?: number
          league_id?: number | null
          nat_stat_id?: number | null
          salary?: number | null
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_college_code_fkey"
            columns: ["college_code"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["code"]
          },
        ]
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
          college_code: string | null
          college_id: number | null
          created_at: string
          full_name: string
          gl_nat_stat_id: number | null
          id: number
          league_id: number | null
          nat_stat_id: number | null
          salary: number | null
          team_id: number | null
        }[]
      }
      getcollegesalarytotals: {
        Args: Record<PropertyKey, never>
        Returns: {
          college_code: string
          total_salary: number
        }[]
      }
      getcollegestattotals: {
        Args: {
          year_param?: number
        }
        Returns: {
          college_code: string
          total_minutes: number
          total_minutes_rank: number
          gl_total_minutes: number
          gl_total_minutes_rank: number
          nba_total_minutes: number
          nba_total_minutes_rank: number
          total_points: number
          total_points_rank: number
          gl_total_points: number
          gl_total_points_rank: number
          nba_total_points: number
          nba_total_points_rank: number
          total_rebounds: number
          total_rebounds_rank: number
          gl_total_rebounds: number
          gl_total_rebounds_rank: number
          nba_total_rebounds: number
          nba_total_rebounds_rank: number
          total_assists: number
          total_assists_rank: number
          gl_total_assists: number
          gl_total_assists_rank: number
          nba_total_assists: number
          nba_total_assists_rank: number
          season: number
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
